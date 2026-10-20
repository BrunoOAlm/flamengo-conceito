"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./News.module.css";

const FILTERS = ["Todas", "Futebol", "Base", "Olímpicos", "Sócio"] as const;
type Filter = (typeof FILTERS)[number];
type Category = Exclude<Filter, "Todas">;

type Item = {
  title: string;
  excerpt?: string;
  category: Category;
  date: string;
  label: string;
  /** Foto em duotone; sem foto, a capa é um padrão de listras. */
  image?: string;
  alt?: string;
  pattern?: 0 | 1 | 2;
};

// Notícias fictícias, apenas para ilustrar o layout
const NEWS: Item[] = [
  {
    title: "Nação lota o Maracanã e empurra o time para virada histórica",
    excerpt:
      "Com mais de 60 mil vozes cantando os 90 minutos, o Rubro-Negro buscou o resultado nos acréscimos e assumiu a liderança.",
    category: "Futebol",
    date: "2026-10-12",
    label: "12 out 2026",
    image: "/hero.jpg",
    alt: "Arquibancada lotada com bandeiras rubro-negras",
  },
  {
    title: "Ninho do Urubu ganha novo centro de recuperação para o elenco",
    category: "Futebol",
    date: "2026-10-11",
    label: "11 out 2026",
    image: "/urubu-voo.jpg",
    alt: "Urubu de metal com circuitos vermelhos sobre um pedestal",
  },
  {
    title: "Garotos do sub-20 sobem para treinar com o profissional",
    excerpt: "Quatro atletas da base foram integrados ao grupo principal nesta semana.",
    category: "Base",
    date: "2026-10-10",
    label: "10 out 2026",
    pattern: 0,
  },
  {
    title: "Novo programa de sócios terá check-in pelo celular",
    excerpt: "Carteirinha digital e check-in por aproximação chegam a todos os planos.",
    category: "Sócio",
    date: "2026-10-08",
    label: "8 out 2026",
    image: "/urubu-asas.jpg",
    alt: "Urubu de asas abertas com detalhes em neon vermelho",
  },
  {
    title: "Remo rubro-negro conquista três ouros na Lagoa",
    category: "Olímpicos",
    date: "2026-10-05",
    label: "5 out 2026",
    pattern: 1,
  },
  {
    title: "Sub-17 vence clássico e garante vaga na final estadual",
    category: "Base",
    date: "2026-10-04",
    label: "4 out 2026",
    image: "/urubu-voo-fim.jpg",
    alt: "Pedestal envolto em fumaça vermelha e faíscas",
  },
  {
    title: "Ginástica: atleta da casa leva prata no Brasileiro",
    excerpt: "Resultado garante a convocação para a seleção permanente.",
    category: "Olímpicos",
    date: "2026-10-02",
    label: "2 out 2026",
    pattern: 2,
  },
  {
    title: "Sócios terão pré-venda exclusiva para a final",
    category: "Sócio",
    date: "2026-10-01",
    label: "1 out 2026",
    pattern: 0,
  },
];

const MAX_ITEMS = 5;

export default function News() {
  const [filter, setFilter] = useState<Filter>("Todas");
  const items = NEWS.filter((item) => filter === "Todas" || item.category === filter).slice(0, MAX_ITEMS);

  return (
    <section id="noticias" className="section section-glow" aria-labelledby="noticias-titulo">
      <div className="container">
        <SectionHeader id="noticias-titulo" kicker="Notícias" title="Últimas da Nação" />

        <div className={styles.toolbar}>
          <div className={styles.chips} role="group" aria-label="Filtrar notícias por categoria">
            {FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                className={styles.chip}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <a href="#" className={styles.all}>
            Ver todas
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className="visually-hidden" aria-live="polite">
          {items.length} {items.length === 1 ? "notícia" : "notícias"} em {filter}
        </p>

        <Reveal as="ul" stagger className={styles.grid}>
          {items.map((item, i) => (
            <li key={item.title} className={`${styles.card} ${i === 0 ? styles.featured : ""}`}>
              <div className={styles.thumb}>
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- export estático: imagens servidas direto do /public
                  <img
                    src={item.image}
                    alt={item.alt ?? ""}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className={`${styles.pattern} ${styles[`pattern${item.pattern ?? 0}`]}`} aria-hidden="true" />
                )}
              </div>
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>
                  <time dateTime={item.date}>{item.label}</time>
                </p>
                <h3 className={styles.title}>
                  <a href="#">
                    <span>{item.title}</span>
                  </a>
                </h3>
                {i === 0 && item.excerpt && <p className={styles.excerpt}>{item.excerpt}</p>}
              </div>
            </li>
          ))}
        </Reveal>

        <p className={styles.note}>Manchetes fictícias, criadas para demonstrar o layout.</p>
      </div>
    </section>
  );
}
