import SectionTitle from "@/components/SectionTitle/SectionTitle";
import styles from "./Membership.module.css";

type Plan = {
  name: string;
  price: string;
  tagline: string;
  benefits: string[];
  featured?: boolean;
};

// Planos e preços de exemplo
const PLANS: Plan[] = [
  {
    name: "Raça",
    price: "29,90",
    tagline: "Para quem não perde um jogo pela TV.",
    benefits: ["Prioridade na compra de ingressos", "10% de desconto na loja", "Carteirinha digital"],
  },
  {
    name: "Paixão",
    price: "59,90",
    tagline: "O plano mais escolhido da Nação.",
    benefits: [
      "Check-in garantido em jogos no Maracanã",
      "20% de desconto na loja",
      "Acesso antecipado a pré-vendas",
      "Conteúdos exclusivos dos bastidores",
    ],
    featured: true,
  },
  {
    name: "Manto Sagrado",
    price: "119,90",
    tagline: "A experiência completa no estádio.",
    benefits: [
      "Cadeira cativa no setor Norte",
      "30% de desconto na loja",
      "Kit anual de boas-vindas",
      "Visita guiada ao centro de treinamento",
    ],
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="rgba(225,6,0,.18)" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 10.3l2.6 2.6L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Membership() {
  return (
    <section id="socio" className={styles.section} aria-labelledby="socio-titulo">
      {/* TODO: vídeo futuro do urubu ao fundo da seção.
          Usar <video autoPlay muted loop playsInline> com mix-blend-mode: screen
          sobre o fundo escuro, posicionado em .mascot. */}
      <div className={styles.mascot} aria-hidden="true" />

      <div className="container">
        <SectionTitle id="socio-titulo" eyebrow="Sócio-Torcedor" title="Nação Rubro-Negra">
          Escolha seu plano e fique mais perto do Mais Querido. Planos e valores meramente ilustrativos.
        </SectionTitle>

        <ul className={styles.plans}>
          {PLANS.map((plan) => (
            <li key={plan.name} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
              {plan.featured && <p className={styles.badge}>Mais popular</p>}
              <h3 className={styles.name}>{plan.name}</h3>
              <p className={styles.tagline}>{plan.tagline}</p>
              <p className={styles.price}>
                <span className={styles.currency}>R$</span>
                {plan.price}
                <span className={styles.period}>/mês</span>
              </p>
              <ul className={styles.benefits}>
                {plan.benefits.map((benefit) => (
                  <li key={benefit}>
                    <CheckIcon />
                    {benefit}
                  </li>
                ))}
              </ul>
              <a href="#" className={`btn ${plan.featured ? "" : "btn-ghost"} ${styles.cta}`}>
                Quero ser {plan.name}
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.note}>* Valores de exemplo. Este conceito não realiza cadastros nem cobranças.</p>
      </div>
    </section>
  );
}
