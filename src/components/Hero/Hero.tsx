import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-titulo">
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero.jpg"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id="hero-titulo" className="visually-hidden">
          Flamengo — site conceito não oficial
        </h1>

        <div className={styles.emblem}>
          <span className={`${styles.stripe} ${styles.left}`} aria-hidden="true" />
          <div className={styles.crest}>
            {/* eslint-disable-next-line @next/next/no-img-element -- precisa ser <img> puro para o mix-blend-mode e as animações de neon */}
            <img src="/escudo-neon.webp" alt="Escudo do Flamengo em neon vermelho" width={667} height={756} />
          </div>
          <span className={`${styles.stripe} ${styles.right}`} aria-hidden="true" />
        </div>
      </div>

      <p className={styles.tag}>Conceito · não oficial</p>
    </section>
  );
}
