// Dados fictícios do próximo jogo, usados na seção "Próximo jogo" e no mega menu
export const MATCH_DATE = "2026-11-22T16:00:00-03:00";

export const MATCH = {
  competition: "Campeonato Brasileiro · Rodada 35",
  home: "Flamengo",
  away: "Adversário",
  date: "Domingo, 22 de novembro",
  time: "16h00",
  venue: "Maracanã · Rio de Janeiro",
};

export type Competition = "brasileiro" | "libertadores" | "copa";

export const COMPETITIONS: Record<Competition, string> = {
  brasileiro: "Brasileirão",
  libertadores: "Libertadores",
  copa: "Copa do Brasil",
};

// Próximos jogos de exemplo (calendário abaixo do placar)
export const CALENDAR: { competition: Competition; date: string; label: string; venue: string; home: boolean }[] = [
  { competition: "libertadores", date: "2026-11-26T21:30:00-03:00", label: "Qui, 26 nov · 21h30", venue: "Maracanã · Rio de Janeiro", home: true },
  { competition: "brasileiro", date: "2026-11-29T18:30:00-03:00", label: "Dom, 29 nov · 18h30", venue: "Fora de casa", home: false },
  { competition: "copa", date: "2026-12-03T20:00:00-03:00", label: "Qui, 3 dez · 20h00", venue: "Maracanã · Rio de Janeiro", home: true },
];
