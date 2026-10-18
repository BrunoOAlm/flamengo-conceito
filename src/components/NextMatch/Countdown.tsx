"use client";

import { useEffect, useState } from "react";
import styles from "./NextMatch.module.css";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(target: number): Parts {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

const LABELS: [keyof Parts, string][] = [
  ["days", "dias"],
  ["hours", "horas"],
  ["minutes", "min"],
  ["seconds", "seg"],
];

export default function Countdown({ target }: { target: string }) {
  // null até montar no cliente: evita divergência de horário entre servidor e navegador
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const time = new Date(target).getTime();
    const tick = () => setParts(getParts(time));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className={styles.countdown} role="timer" aria-label="Contagem regressiva para o jogo">
      {LABELS.map(([key, label]) => (
        <div key={key} className={styles.unit}>
          <span className={styles.value}>{parts ? String(parts[key]).padStart(2, "0") : "--"}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
