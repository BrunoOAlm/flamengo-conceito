import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Countdown from "./Countdown";
import styles from "./NextMatch.module.css";

// Dados fictícios — jogo de exemplo
export const MATCH_DATE = "2026-11-22T16:00:00-03:00";

const MATCH = {
  competition: "Campeonato Brasileiro · Rodada 35",
  home: "Flamengo",
  away: "Adversário",
  date: "Domingo, 22 de novembro",
  time: "16h00",
  venue: "Maracanã · Rio de Janeiro",
};

export default function NextMatch() {
  return (
    <section id="jogos" className={styles.section} aria-labelledby="jogos-titulo">
      <div className="container">
        <SectionTitle id="jogos-titulo" eyebrow="Agenda" title="Próximo jogo" />

        <article className={styles.card}>
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
            <a id="ingressos" href="#" className={styles.cta}>
              Comprar ingresso
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
