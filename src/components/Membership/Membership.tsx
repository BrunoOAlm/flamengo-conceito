import CanvasVideo from "@/components/CanvasVideo/CanvasVideo";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
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

const icon = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
);

const PERKS = [
  {
    title: "Prioridade em ingressos",
    icon: icon(
      <>
        <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4z" />
        <path d="M14 6v12" strokeDasharray="2 2" />
      </>,
    ),
  },
  {
    title: "Descontos na loja",
    icon: icon(
      <>
        <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>,
    ),
  },
  {
    title: "Eventos exclusivos",
    icon: icon(<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />),
  },
  {
    title: "Conteúdo de bastidores",
    icon: icon(
      <>
        <rect x="3" y="6" width="13" height="12" rx="2" />
        <path d="M16 10.5l5-3v9l-5-3z" />
      </>,
    ),
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="rgba(225,6,0,.2)" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 10.3l2.6 2.6L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Membership() {
  return (
    <section id="socio" className={`section below-fold ${styles.section}`} aria-labelledby="socio-titulo">
      <div className="container">
        <SectionHeader
          id="socio-titulo"
          kicker="Sócio-Torcedor"
          title="Nação Rubro-Negra"
          subtitle="Escolha sua carteirinha e fique mais perto do Mais Querido. Planos e valores meramente ilustrativos."
          className={styles.header}
        />

        <CanvasVideo className={styles.art} src="/urubu-asas.mp4" poster="/urubu-asas.jpg" loop playWhenVisible={0.1} />

        <Reveal as="ul" stagger className={styles.plans}>
          {PLANS.map((plan) => (
            <li key={plan.name} className={`${styles.plan} ${plan.featured ? styles.featured : ""}`}>
              {plan.featured && <p className={styles.badge}>Mais popular</p>}
              <div className={styles.cardTop} aria-hidden="true">
                <span>Sócio · Nação</span>
                <span className={styles.chip} />
              </div>
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
        </Reveal>

        <Reveal as="ul" stagger className={styles.perks}>
          {PERKS.map((perk) => (
            <li key={perk.title}>
              <span className={styles.perkIcon}>{perk.icon}</span>
              {perk.title}
            </li>
          ))}
        </Reveal>

        <p className={styles.note}>* Valores de exemplo. Este conceito não realiza cadastros nem cobranças.</p>
      </div>
    </section>
  );
}
