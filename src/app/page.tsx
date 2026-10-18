import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="conteudo">
        <div id="topo" style={{ height: "200svh" }} />
      </main>
    </>
  );
}
