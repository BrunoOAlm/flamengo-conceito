import Reveal from "./Reveal";
import styles from "./SectionHeader.module.css";

type Props = {
  /** id do <h2>, para o aria-labelledby da seção. */
  id: string;
  kicker: string;
  title: string;
  subtitle?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** Cabeçalho padrão das seções: kicker vermelho, título em Bebas e linha neon. */
export default function SectionHeader({ id, kicker, title, subtitle, align = "start", className }: Props) {
  return (
    <Reveal as="header" stagger className={`${styles.header} ${align === "center" ? styles.center : ""} ${className ?? ""}`}>
      <p className={styles.kicker}>{kicker}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <span className={styles.line} aria-hidden="true" />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </Reveal>
  );
}
