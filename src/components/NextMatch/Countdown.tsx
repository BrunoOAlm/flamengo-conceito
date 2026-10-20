"use client";

import { Fragment, useSyncExternalStore } from "react";
import styles from "./NextMatch.module.css";

type Unit = "days" | "hours" | "minutes" | "seconds";

const UNITS: [Unit, string][] = [
  ["days", "Dias"],
  ["hours", "Horas"],
  ["minutes", "Min"],
  ["seconds", "Seg"],
];

function getParts(target: number, now: number): Record<Unit, number> {
  const diff = Math.max(target - now, 0);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

// Relógio compartilhado: um "tique" por segundo
function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

/**
 * Preenche os dígitos já no parse do HTML (antes do React hidratar), para não
 * aparecer "--" nem números do momento do build. Mesma conta do getParts.
 */
function inlineScript(target: number) {
  return `(function(){var d=Math.max(${target}-Date.now(),0),v={days:Math.floor(d/864e5),hours:Math.floor(d/36e5)%24,minutes:Math.floor(d/6e4)%60,seconds:Math.floor(d/1e3)%60};document.querySelectorAll("[data-countdown]").forEach(function(e){e.textContent=String(v[e.getAttribute("data-countdown")]).padStart(2,"0")})})()`;
}

export default function Countdown({ target }: { target: string }) {
  const time = new Date(target).getTime();
  // null no servidor e na hidratação; o script inline já colocou os valores certos no DOM
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const parts = now === null ? null : getParts(time, now * 1000);

  return (
    <>
      <div className={styles.countdown} role="timer" aria-label="Contagem regressiva para o jogo">
        {UNITS.map(([key, label], i) => (
          <Fragment key={key}>
            {i > 0 && (
              <span className={styles.colon} aria-hidden="true">
                :
              </span>
            )}
            <div className={styles.unit}>
              <span className={styles.value} data-countdown={key} suppressHydrationWarning>
                {parts ? pad(parts[key]) : "00"}
              </span>
              <span className={styles.label}>{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
      <script dangerouslySetInnerHTML={{ __html: inlineScript(time) }} />
    </>
  );
}
