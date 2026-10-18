import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./News.module.css";

type Item = { title: string; excerpt?: string; category: string; date: string; label: string };

// Notícias fictícias, apenas para ilustrar o layout
const NEWS: Item[] = [
  {
    title: "Nação lota o Maracanã e empurra o time para virada histórica",
    excerpt:
      "Com mais de 60 mil vozes cantando os 90 minutos, o Rubro-Negro buscou o resultado nos acréscimos e assumiu a liderança.",
    category: "Futebol",
    date: "2026-10-12",
    label: "12 out 2026",
  },
  { title: "Categorias de base: garotos do sub-20 sobem para treinar com o elenco", category: "Base", date: "2026-10-10", label: "10 out 2026" },
  { title: "Novo programa de sócios terá check-in pelo celular", category: "Sócio-Torcedor", date: "2026-10-08", label: "8 out 2026" },
  { title: "Remo rubro-negro conquista três ouros na Lagoa", category: "Esportes Olímpicos", date: "2026-10-05", label: "5 out 2026" },
  { title: "Bastidores: como funciona a preparação física na semana de clássico", category: "Bastidores", date: "2026-10-03", label: "3 out 2026" },
  { title: "Basquete estreia na temporada com vitória fora de casa", category: "Basquete", date: "2026-10-01", label: "1 out 2026" },
];

export default function News() {
  return (
    <section id="noticias" className={styles.section} aria-labelledby="noticias-titulo">
      <div className="container">
        <SectionTitle id="noticias-titulo" eyebrow="Notícias" title="Últimas da Nação">
          Manchetes fictícias criadas para demonstrar o layout.
        </SectionTitle>

        <ul className={styles.grid}>
          {NEWS.map((item, i) => (
            <li key={item.title} className={`${styles.card} ${i === 0 ? styles.featured : ""}`}>
              <div className={`${styles.thumb} ${styles[`tone${i % 3}`]}`} role="img" aria-label={`Imagem ilustrativa: ${item.category}`} />
              <div className={styles.body}>
                <p className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>
                  <time dateTime={item.date}>{item.label}</time>
                </p>
                <h3 className={styles.title}>
                  <a href="#">{item.title}</a>
                </h3>
                {item.excerpt && <p className={styles.excerpt}>{item.excerpt}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
