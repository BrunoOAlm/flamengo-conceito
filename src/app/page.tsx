import Hero from "@/components/Hero/Hero";
import Membership from "@/components/Membership/Membership";
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
        <Membership />
      </main>
    </>
  );
}
