"use client";

import { useEffect } from "react";

/**
 * Faz a entrada das faixas do hero tocar de novo sempre que o hero volta à tela:
 * ao sair totalmente, marca data-replay="off" (zera a animação); ao voltar, remove.
 */
export default function StripesReplay({ targetId }: { targetId: string }) {
  useEffect(() => {
    const hero = document.getElementById(targetId);
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) hero.removeAttribute("data-replay");
      else hero.setAttribute("data-replay", "off");
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [targetId]);

  return null;
}
