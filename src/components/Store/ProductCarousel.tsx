"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import JerseyArt, { type JerseyVariant } from "./JerseyArt";
import styles from "./Store.module.css";

export type Product = { name: string; description: string; price: string; variant: JerseyVariant };

const MAX_TILT = 6;

// Tilt 3D seguindo o ponteiro: só com mouse e sem movimento reduzido
function tilt(e: PointerEvent<HTMLLIElement>) {
  if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.setProperty("--ry", `${(x * MAX_TILT * 2).toFixed(2)}deg`);
  card.style.setProperty("--rx", `${(-y * MAX_TILT * 2).toFixed(2)}deg`);
}

function resetTilt(e: PointerEvent<HTMLLIElement>) {
  e.currentTarget.style.removeProperty("--rx");
  e.currentTarget.style.removeProperty("--ry");
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.arrows}>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Produtos anteriores"
          aria-controls="vitrine"
          disabled={edges.start}
          onClick={() => scrollByCard(-1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.arrow}
          aria-label="Próximos produtos"
          aria-controls="vitrine"
          disabled={edges.end}
          onClick={() => scrollByCard(1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <ul id="vitrine" ref={trackRef} className={styles.track} aria-label="Produtos de exemplo">
        {products.map((product) => (
          <li key={product.name} className={styles.card} onPointerMove={tilt} onPointerLeave={resetTilt}>
            <div className={styles.media}>
              <JerseyArt variant={product.variant} label={`Ilustração genérica: ${product.name}`} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>
                R$ {product.price} <span>exemplo</span>
              </p>
              <a href="#" className="btn btn-ghost btn-sm">
                Ver produto
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
