import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { MATCH, MATCH_DATE } from "@/data/match";
import Countdown from "./Countdown";
import styles from "./NextMatch.module.css";

export default function NextMatch() {
  return (
    <section id="jogos" className="section section-glow" aria-labelledby="jogos-titulo">
      <div className="container">
        <SectionHeader id="jogos-titulo" kicker="Agenda" title="Próximo jogo" />

        <Reveal as="article" className={styles.card}>
          <div className={styles.info}>
            <p className={styles.competition}>
              {MATCH.competition}
              <span className={styles.sample}>Exemplo</span>
            </p>
            <h3 className={styles.teams}>
              {MATCH.home} <span>x</span> {MATCH.away}
            </h3>
            <ul className={styles.meta}>
              <li>
                <time dateTime={MATCH_DATE}>
                  {MATCH.date} · {MATCH.time}
                </time>
              </li>
              <li>{MATCH.venue}</li>
            </ul>
          </div>

          <div className={styles.side}>
            <Countdown target={MATCH_DATE} />
            <a id="ingressos" href="#" className={`btn ${styles.cta}`}>
              Comprar ingresso
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
