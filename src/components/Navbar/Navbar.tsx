"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "#jogos", label: "Jogos" },
  { href: "#ingressos", label: "Ingressos" },
  { href: "#socio", label: "Sócio-Torcedor" },
  { href: "#loja", label: "Loja" },
  { href: "#noticias", label: "Notícias" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile aberto: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
      <nav className={`container ${styles.nav}`} aria-label="Principal">
        <a href="#topo" className={styles.brand} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ícone decorativo pequeno */}
          <img src="/escudo-neon.webp" alt="" width={38} height={43} />
          <span>
            Flamengo <small>Conceito</small>
          </span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span className={styles.bars} aria-hidden="true" />
        </button>

        <ul id="menu-principal" className={`${styles.menu} ${open ? styles.open : ""}`}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
