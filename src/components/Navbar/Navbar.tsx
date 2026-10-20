"use client";

import { useEffect, useRef, useState } from "react";
import { MATCH, MATCH_DATE } from "@/data/match";
import { NAVIGATION } from "@/data/navigation";
import styles from "./Navbar.module.css";

// Mesmo breakpoint do CSS: acima dele o menu vira mega menu com hover
const DESKTOP_QUERY = "(min-width: 1080px) and (hover: hover)";
const HOVER_CLOSE_DELAY = 150;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Item de topo aberto: painel do mega menu no desktop, accordion no mobile
  const [active, setActive] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc fecha o painel (e devolve o foco ao botão) ou o menu mobile; clique fora fecha o painel
  useEffect(() => {
    if (!active && !mobileOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (active) {
        document.getElementById(`gatilho-${active}`)?.focus();
        setActive(null);
      } else {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setActive(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [active, mobileOpen]);

  // Menu mobile aberto: trava o scroll da página
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const isDesktop = () => window.matchMedia(DESKTOP_QUERY).matches;

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }

  function openOnHover(id: string) {
    if (!isDesktop()) return;
    cancelClose();
    setActive(id);
  }

  function scheduleClose() {
    if (!isDesktop()) return;
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActive(null), HOVER_CLOSE_DELAY);
  }

  // Tab saindo do header fecha o painel aberto
  function onBlur(e: React.FocusEvent) {
    if (!headerRef.current?.contains(e.relatedTarget as Node)) setActive(null);
  }

  function closeAll() {
    setActive(null);
    setMobileOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled || mobileOpen || active ? styles.solid : ""}`}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onBlur={onBlur}
    >
      <nav className={`container ${styles.nav}`} aria-label="Principal">
        <a href="#topo" className={styles.brand} onClick={closeAll}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ícone decorativo pequeno */}
          <img src="/escudo-neon.webp" alt="" width={38} height={43} fetchPriority="high" />
          <span>
            Flamengo <small>Conceito</small>
          </span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={mobileOpen}
          aria-controls="menu-principal"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="visually-hidden">{mobileOpen ? "Fechar menu" : "Abrir menu"}</span>
          <span className={styles.bars} aria-hidden="true" />
        </button>

        <div id="menu-principal" className={`${styles.menu} ${mobileOpen ? styles.open : ""}`}>
          <ul className={styles.items}>
            {NAVIGATION.map((item) => {
              const isOpen = active === item.id;
              return (
                <li key={item.id} className={styles.item} onMouseEnter={() => openOnHover(item.id)}>
                  <button
                    id={`gatilho-${item.id}`}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={`painel-${item.id}`}
                    onClick={(e) => {
                      // Clique de mouse no desktop só abre (o hover já abriu); teclado e toque alternam
                      if (e.detail > 0 && isDesktop()) setActive(item.id);
                      else setActive(isOpen ? null : item.id);
                    }}
                  >
                    {item.label}
                    <svg className={styles.chevron} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
                      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>

                  <div id={`painel-${item.id}`} className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
                    <div className={styles.panelClip}>
                      <div className={`container ${styles.panelInner}`}>
                        <div className={styles.columns}>
                          {item.colunas.map((coluna) => (
                            <div key={coluna.titulo} className={styles.column}>
                              <p className={styles.columnTitle}>{coluna.titulo}</p>
                              <ul>
                                {coluna.links.map((l) => (
                                  <li key={l.label}>
                                    <a href={l.href} onClick={closeAll}>
                                      {l.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        <aside className={styles.featured} aria-label="Próximo jogo">
                          <p className={styles.featuredEyebrow}>Próximo jogo · exemplo</p>
                          <p className={styles.featuredComp}>{MATCH.competition}</p>
                          <p className={styles.featuredTeams}>
                            {MATCH.home} <span>x</span> {MATCH.away}
                          </p>
                          <p className={styles.featuredMeta}>
                            <time dateTime={MATCH_DATE}>
                              {MATCH.date} · {MATCH.time}
                            </time>
                            <br />
                            {MATCH.venue}
                          </p>
                          <a href="#" className="btn" onClick={closeAll}>
                            Comprar ingresso
                          </a>
                        </aside>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className={styles.actions}>
            <a href="#ingressos" className="btn" onClick={closeAll}>
              Ingressos
            </a>
            <a href="#socio" className="btn btn-ghost" onClick={closeAll}>
              Seja Sócio
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
