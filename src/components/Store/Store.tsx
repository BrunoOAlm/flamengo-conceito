import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCarousel, { type Product } from "./ProductCarousel";

// Produtos e preços de exemplo
const PRODUCTS: Product[] = [
  { name: "Camisa I · Conceito", description: "Listras rubro-negras clássicas", price: "349,90", variant: "home" },
  { name: "Camisa II · Conceito", description: "Branca com faixa rubro-negra", price: "349,90", variant: "away" },
  { name: "Treino Neon", description: "Preta com linhas de circuito em neon", price: "249,90", variant: "training" },
  { name: "Retrô", description: "Listras largas e gola polo com cordão", price: "299,90", variant: "retro" },
  { name: "Infantil", description: "O manto na medida da nova geração", price: "199,90", variant: "kids" },
];

export default function Store() {
  return (
    <section id="loja" className="section section-glow below-fold" aria-labelledby="loja-titulo">
      <div className="container">
        <SectionHeader
          id="loja-titulo"
          kicker="Loja"
          title="Vista o manto"
          subtitle="Uma vitrine ilustrativa: produtos, imagens e preços são apenas exemplos."
        />
        <Reveal>
          <ProductCarousel products={PRODUCTS} />
        </Reveal>
      </div>
    </section>
  );
}
