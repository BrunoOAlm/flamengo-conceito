import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import NextMatch from "@/components/NextMatch/NextMatch";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <NextMatch />
      </main>
    </>
  );
}
