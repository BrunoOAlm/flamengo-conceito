export type NavLink = { label: string; href: string };
export type NavColumn = { titulo: string; links: NavLink[] };
export type NavItem = { id: string; label: string; colunas: NavColumn[] };

const link = (label: string): NavLink => ({ label, href: "#" });

export const NAVIGATION: NavItem[] = [
  {
    id: "noticias",
    label: "Notícias",
    colunas: [
      {
        titulo: "Geral",
        links: [link("Últimas notícias"), link("Notas oficiais"), link("Institucional"), link("Diário do Ninho")],
      },
      {
        titulo: "Por modalidade",
        links: [link("Futebol"), link("Vôlei"), link("Basquete"), link("Futebol feminino")],
      },
    ],
  },
  {
    id: "futebol",
    label: "Futebol",
    // TODO: preencher os links reais do menu Futebol
    colunas: [
      { titulo: "Elenco", links: [link("Profissional"), link("Comissão técnica"), link("Categorias de base")] },
      { titulo: "Competições", links: [link("Brasileirão"), link("Libertadores"), link("Copa do Brasil"), link("Carioca")] },
    ],
  },
  {
    id: "olimpicos",
    label: "Olímpicos",
    // TODO: preencher os links reais do menu Olímpicos
    colunas: [
      { titulo: "Modalidades", links: [link("Remo"), link("Natação"), link("Ginástica"), link("Judô")] },
      { titulo: "Quadra", links: [link("Basquete"), link("Vôlei"), link("Futsal")] },
    ],
  },
  {
    id: "clube",
    label: "Clube",
    // TODO: preencher os links reais do menu Clube
    colunas: [
      { titulo: "Institucional", links: [link("História"), link("Títulos"), link("Diretoria"), link("Transparência")] },
      { titulo: "Estrutura", links: [link("Gávea"), link("Ninho do Urubu"), link("Maracanã")] },
    ],
  },
  {
    id: "loja",
    label: "Loja",
    // TODO: preencher os links reais do menu Loja
    colunas: [
      { titulo: "Produtos", links: [link("Camisas"), link("Treino"), link("Casual"), link("Acessórios")] },
      { titulo: "Coleções", links: [link("Lançamentos"), link("Retrô"), link("Infantil")] },
    ],
  },
];
