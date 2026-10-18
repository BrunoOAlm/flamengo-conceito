import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Jersey, { type JerseyVariant } from "./Jersey";
import styles from "./Store.module.css";

// Produtos e preços de exemplo
const PRODUCTS: { name: string; description: string; price: string; variant: JerseyVariant }[] = [
  { name: "Camisa I · Conceito", description: "Listras rubro-negras clássicas", price: "349,90", variant: "home" },
  { name: "Camisa II · Conceito", description: "Branca com faixa horizontal", price: "349,90", variant: "away" },
  { name: "Camisa Treino Neon", description: "Preta com diagonal em vermelho neon", price: "249,90", variant: "training" },
];

export default function Store() {
  return (
    <section id="loja" className={styles.section} aria-labelledby="loja-titulo">
      <div className="container">
        <SectionTitle id="loja-titulo" eyebrow="Loja" title="Vista o manto">
          Uma vitrine ilustrativa — produtos, imagens e preços são apenas exemplos.
        </SectionTitle>

        <ul className={styles.grid}>
          {PRODUCTS.map((product) => (
            <li key={product.name} className={styles.card}>
              <div className={styles.media}>
                <Jersey variant={product.variant} label={`Ilustração genérica da ${product.name}`} />
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>
                  R$ {product.price} <span>exemplo</span>
                </p>
                <a href="#" className="btn btn-ghost">
                  Ver produto
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
