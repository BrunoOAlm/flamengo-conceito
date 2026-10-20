import styles from "./StripeDivider.module.css";

/** Faixa fina rubro-negra entre seções, com o mesmo padrão de listras do hero. */
export default function StripeDivider() {
  return <div className={styles.divider} aria-hidden="true" />;
}
