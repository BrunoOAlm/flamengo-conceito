"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SoundButton.module.css";

const MAX_VOLUME = 0.8;
const FADE_MS = 800;

export default function SoundButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(
    () => () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      audioRef.current?.pause();
    },
    [],
  );

  function fadeTo(target: number, onDone?: () => void) {
    const audio = audioRef.current;
    if (!audio) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / FADE_MS, 1);
      audio.volume = from + (target - from) * t;
      if (t < 1) frameRef.current = requestAnimationFrame(step);
      else onDone?.();
    };
    frameRef.current = requestAnimationFrame(step);
  }

  async function toggle() {
    // O áudio só é criado (e baixado) no primeiro clique
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.loop = true;
      audio.src = "/torcida.mp3";
      audioRef.current = audio;
    }
    const audio = audioRef.current;

    if (playing) {
      setPlaying(false);
      fadeTo(0, () => audio.pause());
      return;
    }

    setPlaying(true);
    audio.volume = 0;
    try {
      await audio.play();
      fadeTo(MAX_VOLUME);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${playing ? styles.active : ""}`}
      aria-pressed={playing}
      onClick={toggle}
    >
      <span className={styles.icon} aria-hidden="true">
        {playing ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
            <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
          </svg>
        )}
      </span>
      {playing ? "Pausar" : "Ouvir a torcida"}
    </button>
  );
}
