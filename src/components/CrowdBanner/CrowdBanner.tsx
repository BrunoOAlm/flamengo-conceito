import styles from "./CrowdBanner.module.css";

const WORDS = ["MENGÃO", "RAÇA", "AMOR", "PAIXÃO", "NAÇÃO RUBRO-NEGRA"];
// Repetições por metade da trilha: precisa cobrir telas largas antes de emendar
const REPEAT = 3;

function Track() {
  const items = Array.from({ length: REPEAT }, () => WORDS).flat();
  return (
    <span className={styles.group}>
      {items.map((word, i) => (
        <span key={i}>
          {word} <span className={styles.dot}>•</span>
        </span>
      ))}
    </span>
  );
}

/** Duas faixas cruzadas de placa de LED rolando em sentidos opostos. */
export default function CrowdBanner() {
  return (
    <section className={styles.section} aria-label="Grito da torcida">
      <p className="visually-hidden">Mengão, raça, amor, paixão, Nação Rubro-Negra.</p>
      <div className={`${styles.band} ${styles.red}`} aria-hidden="true">
        <div className={styles.track}>
          <Track />
          <Track />
        </div>
      </div>
      <div className={`${styles.band} ${styles.black}`} aria-hidden="true">
        <div className={`${styles.track} ${styles.reverse}`}>
          <Track />
          <Track />
        </div>
      </div>
    </section>
  );
}
