import styles from "./CrowdBanner.module.css";

const WORDS = ["MENGÃO", "RAÇA", "AMOR", "PAIXÃO", "NAÇÃO RUBRO-NEGRA"];
// Repetições por metade da trilha: precisa cobrir telas largas antes de emendar
const REPEAT = 3;

// Um único nó de texto por metade da trilha (em vez de um <span> por palavra): DOM bem menor
const TEXT = Array.from({ length: REPEAT }, () => WORDS.map((word) => `${word}  •  `).join("")).join("");

function Track() {
  return <span className={styles.group}>{TEXT}</span>;
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
