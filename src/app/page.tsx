import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Membership from "@/components/Membership/Membership";
import Navbar from "@/components/Navbar/Navbar";
import News from "@/components/News/News";
import NextMatch from "@/components/NextMatch/NextMatch";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StripeDivider from "@/components/ui/StripeDivider";
import Store from "@/components/Store/Store";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="conteudo">
        <Hero />
        <NextMatch />
        <StripeDivider />
        <Membership />
        <StripeDivider />
        <Store />
        <StripeDivider />
        <News />
      </main>
      <Footer />
    </>
  );
}
