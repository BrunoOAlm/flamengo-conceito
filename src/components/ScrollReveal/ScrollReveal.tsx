"use client";

import { useEffect } from "react";

/**
 * Anima a entrada dos elementos marcados com [data-reveal] quando entram na tela.
 * Sem JS ou com prefers-reduced-motion, o conteúdo simplesmente aparece.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    // O que já está visível no carregamento não deve sumir e reaparecer
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
    });
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    elements.forEach((el) => !el.classList.contains("is-visible") && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
