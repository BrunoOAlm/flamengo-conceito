import Hero from "@/components/Hero/Hero";
import Membership from "@/components/Membership/Membership";
import Navbar from "@/components/Navbar/Navbar";
import News from "@/components/News/News";
import NextMatch from "@/components/NextMatch/NextMatch";
import Store from "@/components/Store/Store";

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
        <Store />
        <News />
      </main>
    </>
  );
}
