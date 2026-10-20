import { NAVIGATION } from "@/data/navigation";
import styles from "./Footer.module.css";

const SOCIALS = [
  {
    label: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    label: "X",
    icon: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />,
  },
  {
    label: "YouTube",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "TikTok",
    icon: (
      <path
        d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.4 2 4 4.5 4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
];

// Quatro colunas a partir do mesmo menu da navbar
const COLUMNS = NAVIGATION.slice(0, 4).map((item) => ({
  title: item.label,
  links: item.colunas.flatMap((coluna) => coluna.links).slice(0, 5),
}));

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.stripes} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <a href="#topo" className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element -- ícone decorativo pequeno */}
            <img src="/escudo-neon.webp" alt="" width={40} height={45} loading="lazy" />
            <span>
              Flamengo <small>Conceito</small>
            </span>
          </a>

          <ul className={styles.socials}>
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href="#" aria-label={`${social.label} (link de exemplo)`}>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.columns} aria-label="Rodapé">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className={styles.columnTitle}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <a href="#topo" className={styles.wordmark} aria-label="Voltar ao topo (Flamengo)">
          <span aria-hidden="true">Flamengo</span>
        </a>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <p>
              <strong>Conceito não oficial</strong> criado para fins de portfólio. Sem vínculo com o Clube de Regatas do
              Flamengo. Marcas pertencem aos seus respectivos donos.
            </p>
            <p>
              Conceito por PilarTech ·{" "}
              <a href="https://instagram.com/pilartechbr" target="_blank" rel="noopener noreferrer" className={styles.credit}>
                @pilartechbr
              </a>
            </p>
          </div>

          <a href="#topo" className={styles.toTop}>
            Voltar ao topo
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
