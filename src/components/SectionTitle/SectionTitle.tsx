import styles from "./SectionTitle.module.css";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
};

/** Cabeçalho padrão das seções: sobretítulo com listra, título e texto opcional. */
export default function SectionTitle({ id, eyebrow, title, children }: Props) {
  return (
    <header className={styles.header} data-reveal>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {children && <p className={styles.lead}>{children}</p>}
    </header>
  );
}
