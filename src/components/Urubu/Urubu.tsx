"use client";

import { useRef, useState } from "react";
import CanvasVideo, { type CanvasVideoHandle } from "@/components/CanvasVideo/CanvasVideo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Urubu.module.css";

const TITLE = ["O", "URUBU", "LEVANTOU", "VOO"];
// Momento do vídeo (s) em que o urubu sai do pedestal e o título começa a aparecer
const REVEAL_AT = 6;

export default function Urubu() {
  const videoRef = useRef<CanvasVideoHandle>(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [ended, setEnded] = useState(false);

  const showText = reducedMotion || revealed;

  function handleTime(t: number) {
    if (t >= REVEAL_AT && !revealed) setRevealed(true);
  }

  function handleEnded() {
    setRevealed(true);
    setEnded(true);
  }

  function replay() {
    setEnded(false);
    setRevealed(false);
    videoRef.current?.restart();
  }

  return (
    <section id="ninho" className={styles.section} aria-labelledby="ninho-titulo">
      <CanvasVideo
        ref={videoRef}
        className={styles.video}
        src="/urubu-voo.mp4"
        poster="/urubu-voo.jpg"
        reducedMotionPoster="/urubu-voo-fim.jpg"
        posterAlt="Urubu de metal com circuitos vermelhos pousado num pedestal, entre faíscas e fumaça"
        playWhenVisible={0.6}
        onTime={handleTime}
        onEnded={handleEnded}
      />
      <div className={styles.shade} aria-hidden="true" />

      <div className={`container ${styles.content}`} data-show={showText || undefined}>
        <p className={styles.kicker}>Ninho do Urubu</p>
        <h2 id="ninho-titulo" className={styles.title}>
          {TITLE.map((word, i) => (
            <span key={word} className={styles.word} style={{ "--w": i } as React.CSSProperties}>
              {word}
            </span>
          ))}
        </h2>
        <div className={styles.after}>
          <p className={styles.subtitle}>Raça, amor e paixão. A Nação voa junto.</p>
          <div className={styles.actions}>
            <a href="#socio" className="btn">
              Seja Sócio
            </a>
            {ended && !reducedMotion && (
              <button type="button" className={`btn btn-ghost ${styles.replay}`} onClick={replay}>
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ver o voo de novo
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
