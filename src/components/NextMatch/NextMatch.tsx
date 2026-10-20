import GenericCrest from "@/components/ui/GenericCrest";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { CALENDAR, COMPETITIONS, MATCH, MATCH_DATE } from "@/data/match";
import Countdown from "./Countdown";
import styles from "./NextMatch.module.css";

export default function NextMatch() {
  return (
    <section id="jogos" className="section section-glow below-fold" aria-labelledby="jogos-titulo">
      <div className="container">
        <SectionHeader id="jogos-titulo" kicker="Agenda" title="Próximo jogo" />

        <Reveal as="article" className={styles.board}>
          <p className={styles.competition}>
            <span className={styles.tag}>{MATCH.competition}</span>
            <span className={styles.sample}>Exemplo</span>
          </p>

          <h3 className={styles.teams}>
            <span className={styles.team}>
              {/* eslint-disable-next-line @next/next/no-img-element -- escudo pequeno com glow */}
              <img className={styles.crest} src="/escudo-neon.webp" alt="" width={667} height={756} loading="lazy" />
              {MATCH.home}
            </span>
            <span className={styles.versus}>x</span>
            <span className={`${styles.team} ${styles.away}`}>
              {MATCH.away}
              <GenericCrest className={styles.crestAway} />
            </span>
          </h3>

          <Countdown target={MATCH_DATE} />

          <ul className={styles.meta}>
            <li>
              <time dateTime={MATCH_DATE}>
                {MATCH.date} · {MATCH.time}
              </time>
            </li>
            <li>{MATCH.venue}</li>
          </ul>

          <div className={styles.actions}>
            <a id="ingressos" href="#" className="btn">
              Comprar ingresso
            </a>
            <a href="#calendario" className="btn btn-ghost">
              Ver calendário
            </a>
          </div>
        </Reveal>

        <div id="calendario" className={styles.calendar}>
          <h3 className={styles.calendarTitle}>Calendário</h3>
          <Reveal as="ul" stagger className={styles.games}>
            {CALENDAR.map((game) => (
              <li key={game.date} className={styles.game}>
                <span className={`${styles.gameTag} ${styles[game.competition]}`}>{COMPETITIONS[game.competition]}</span>
                <p className={styles.gameTeams}>{game.home ? "Flamengo x Adversário" : "Adversário x Flamengo"}</p>
                <time className={styles.gameDate} dateTime={game.date}>
                  {game.label}
                </time>
                <p className={styles.gameVenue}>{game.venue}</p>
              </li>
            ))}
          </Reveal>
          <p className={styles.note}>Jogos, datas e locais de exemplo.</p>
        </div>
      </div>
    </section>
  );
}
