"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  as?: ElementType;
  /** Anima os filhos diretos um a um (60ms entre cada). */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
};

/**
 * Fade + subida de 24px quando entra na tela. Só esconde o que está fora da tela na
 * primeira leitura do IntersectionObserver (assíncrona: sem forçar layout na hidratação),
 * e nada com prefers-reduced-motion.
 */
export default function Reveal({ as: Tag = "div", stagger = false, className, children, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let first = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          // Já está na tela: fica como está, sem animar
          if (entry.isIntersecting) return observer.disconnect();
          if (stagger) Array.from(el.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
          el.dataset.reveal = "hidden";
          return;
        }
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <Tag ref={ref} id={id} className={className} data-stagger={stagger || undefined}>
      {children}
    </Tag>
  );
}
