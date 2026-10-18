import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { MATCH, MATCH_DATE } from "@/data/match";
import Countdown from "./Countdown";
import styles from "./NextMatch.module.css";

export default function NextMatch() {
  return (
    <section id="jogos" className={styles.section} aria-labelledby="jogos-titulo">
      <div className="container">
        <SectionTitle id="jogos-titulo" eyebrow="Agenda" title="Próximo jogo" />

        <article className={styles.card} data-reveal>
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
        </article>
      </div>
    </section>
  );
}
