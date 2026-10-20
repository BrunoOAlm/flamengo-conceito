"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./CanvasVideo.module.css";

export type CanvasVideoHandle = {
  /** Volta ao início e toca de novo (usado no "ver de novo"). */
  restart: () => void;
};

type Props = {
  src: string;
  poster: string;
  /** Poster usado com prefers-reduced-motion (ex.: o último quadro). Padrão: `poster`. */
  reducedMotionPoster?: string;
  /** Texto alternativo do poster; vazio = decorativo. */
  posterAlt?: string;
  loop?: boolean;
  /** Toca sempre que qualquer parte estiver na tela. */
  autoPlay?: boolean;
  /** Toca quando essa fração (0–1) do elemento estiver visível. */
  playWhenVisible?: number;
  onEnded?: () => void;
  /** Chamado a cada quadro desenhado, com o tempo atual do vídeo em segundos. */
  onTime?: (t: number) => void;
  className?: string;
  ref?: Ref<CanvasVideoHandle>;
};

type Mode = "canvas" | "video" | "poster";

const MAX_DPR = 1.5;
// Vídeos sem autoPlay só começam a baixar quando chegam perto da tela
const PRELOAD_MARGIN = "50% 0px";

// Atributos que impedem o navegador de oferecer pop-out, PiP e transmissão
const VIDEO_ATTRS = {
  muted: true,
  playsInline: true,
  preload: "metadata",
  disablePictureInPicture: true,
  disableRemotePlayback: true,
  controlsList: "nodownload noplaybackrate noremoteplayback",
  "aria-hidden": true,
  tabIndex: -1,
} as const;

/**
 * Vídeo decorativo desenhado num <canvas>. O <video> fica no DOM só como fonte,
 * com 2px e quase transparente, então o navegador (Opera, Edge…) não mostra o botão
 * flutuante de pop-out/picture-in-picture sobre ele.
 */
export default function CanvasVideo({
  src,
  poster,
  reducedMotionPoster,
  posterAlt = "",
  loop = false,
  autoPlay = false,
  playWhenVisible,
  onEnded,
  onTime,
  className,
  ref,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const reducedMotion = useReducedMotion();
  const [renderMode, setRenderMode] = useState<Exclude<Mode, "poster">>("canvas");
  // Movimento reduzido: só o poster
  const mode: Mode = reducedMotion ? "poster" : renderMode;
  const [load, setLoad] = useState(autoPlay);
  const [ready, setReady] = useState(false);

  // Callbacks em ref: o loop de desenho não precisa ser recriado quando eles mudam
  const onTimeRef = useRef(onTime);
  const onEndedRef = useRef(onEnded);
  useEffect(() => {
    onTimeRef.current = onTime;
    onEndedRef.current = onEnded;
  });

  // Estado de reprodução compartilhado entre os observers
  const visibleRef = useRef(false);
  const endedRef = useRef(false);
  // Só começa a tocar depois do load + ocioso: o carregamento inicial fica livre para o resto da página
  const armedRef = useRef(false);

  const threshold = playWhenVisible ?? (autoPlay ? 0 : null);

  function sync() {
    const video = videoRef.current;
    if (!video || threshold === null || !armedRef.current) return;
    const shouldPlay = visibleRef.current && !document.hidden && !endedRef.current;
    if (shouldPlay && video.paused) video.play().catch(() => {});
    else if (!shouldPlay && !video.paused) video.pause();
  }

  useImperativeHandle(ref, () => ({
    restart() {
      const video = videoRef.current;
      if (!video) return;
      endedRef.current = false;
      video.currentTime = 0;
      video.play().catch(() => {});
    },
  }));

  // Sem contexto 2D: cai para um <video> comum
  const attachCanvas = (canvas: HTMLCanvasElement | null) => {
    canvasRef.current = canvas;
    if (canvas && !canvas.getContext("2d", { alpha: false })) setRenderMode("video");
  };

  // Visibilidade: carrega perto da tela e toca/pausa conforme o limiar
  useEffect(() => {
    const root = rootRef.current;
    if (!root || mode === "poster") return;

    const preload = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLoad(true);
      preload.disconnect();
    }, { rootMargin: PRELOAD_MARGIN });
    preload.observe(root);

    const t = threshold ?? 0;
    const play = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting && entry.intersectionRatio >= t - 0.001;
        sync();
      },
      { threshold: [0, t] },
    );
    play.observe(root);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);

    let idleId = 0;
    const arm = () => {
      armedRef.current = true;
      sync();
    };
    const armWhenIdle = () => {
      if (typeof requestIdleCallback === "function") idleId = requestIdleCallback(arm, { timeout: 1500 });
      else idleId = setTimeout(arm, 200) as unknown as number;
    };
    if (document.readyState === "complete") armWhenIdle();
    else window.addEventListener("load", armWhenIdle, { once: true });

    return () => {
      preload.disconnect();
      play.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("load", armWhenIdle);
      if (typeof cancelIdleCallback === "function") cancelIdleCallback(idleId);
      clearTimeout(idleId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync só lê refs
  }, [mode, threshold]);

  // Loop de desenho no canvas
  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (mode !== "canvas" || !load || !root || !canvas || !video) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let frameId = 0;
    let pending = false;
    let firstFrame = false;
    const hasVFC = "requestVideoFrameCallback" in video;

    // Matemática do object-fit: cover
    const draw = () => {
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (!vw || !vh || video.readyState < 2) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / vw, ch / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      // Mudar o tamanho do canvas zera o estado do contexto: reaplica a cada quadro
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      if (!firstFrame) {
        firstFrame = true;
        setReady(true);
      }
      onTimeRef.current?.(video.currentTime);
    };

    const tick = () => {
      pending = false;
      draw();
      schedule();
    };

    const schedule = () => {
      if (pending || video.paused || video.ended) return;
      pending = true;
      if (hasVFC) frameId = video.requestVideoFrameCallback(tick);
      else frameId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const cssWidth = root.clientWidth;
      const cssHeight = root.clientHeight;
      let density = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      // O canvas nunca tem mais pixels que o vídeo cobrindo a área: assim o quadro é
      // copiado 1:1 e quem amplia é o navegador, uma vez só (mesma nitidez do <video>)
      if (video.videoWidth && video.videoHeight) {
        const cover = Math.max(cssWidth / video.videoWidth, cssHeight / video.videoHeight);
        density = Math.min(density, 1 / cover);
      }
      const width = Math.max(1, Math.round(cssWidth * density));
      const height = Math.max(1, Math.round(cssHeight * density));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      draw();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(root);

    const onPlay = () => schedule();
    const onEnd = () => {
      draw();
      if (video.loop) return;
      endedRef.current = true;
      onEndedRef.current?.();
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("loadedmetadata", resize);
    video.addEventListener("loadeddata", draw);
    video.addEventListener("seeked", draw);
    video.addEventListener("ended", onEnd);
    video.muted = true;
    sync();
    if (!video.paused) schedule();

    return () => {
      resizeObserver.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("loadedmetadata", resize);
      video.removeEventListener("loadeddata", draw);
      video.removeEventListener("seeked", draw);
      video.removeEventListener("ended", onEnd);
      if (hasVFC) video.cancelVideoFrameCallback(frameId);
      else cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync só lê refs
  }, [mode, load]);

  // Fallback com <video> comum: mesmo controle de reprodução, sem canvas
  useEffect(() => {
    const video = videoRef.current;
    if (mode !== "video" || !load || !video) return;
    const onEnd = () => {
      if (video.loop) return;
      endedRef.current = true;
      onEndedRef.current?.();
    };
    const onTimeUpdate = () => onTimeRef.current?.(video.currentTime);
    video.addEventListener("ended", onEnd);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.muted = true;
    sync();
    return () => {
      video.removeEventListener("ended", onEnd);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync só lê refs
  }, [mode, load]);

  const posterSrc = mode === "poster" ? (reducedMotionPoster ?? poster) : poster;

  return (
    <div ref={rootRef} className={`${styles.root} ${className ?? ""}`} data-ready={ready || undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element -- poster fica por baixo do canvas até o 1º quadro */}
      <img
        className={styles.poster}
        src={posterSrc}
        alt={posterAlt}
        aria-hidden={posterAlt ? undefined : true}
        decoding="async"
        loading={autoPlay ? "eager" : "lazy"}
      />
      {mode === "canvas" && <canvas ref={attachCanvas} className={styles.canvas} aria-hidden="true" />}
      {mode === "canvas" && load && <video ref={videoRef} className={styles.source} src={src} loop={loop} {...VIDEO_ATTRS} />}
      {mode === "video" && load && (
        <video ref={videoRef} className={styles.fallback} src={src} poster={poster} loop={loop} {...VIDEO_ATTRS} />
      )}
    </div>
  );
}
