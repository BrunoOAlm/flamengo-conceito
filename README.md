# Flamengo · Site Conceito

Site conceito **não oficial** do Flamengo, criado pela PilarTech (@pilartechbr) para portfólio. A proposta é explorar uma identidade escura, futurista e rubro-negra (vídeos em canvas, escudo em neon, listras animadas, letreiros de LED) num site de clube com muito conteúdo: agenda de jogos, sócio-torcedor, loja e notícias.

> **Aviso:** conceito não oficial criado por PilarTech (@pilartechbr) para fins de portfólio. Sem vínculo com o Clube de Regatas do Flamengo. Marcas pertencem aos seus respectivos donos.
>
> - Todos os dados (datas, preços, planos, notícias) são **fictícios** e marcados como exemplo.
> - Não há login, formulários que coletem dados nem checkout: botões de compra apontam para `#`.
> - Sem fotos de jogadores, logos de patrocinadores ou escudos de outros clubes.
> - A página é servida com `robots: noindex, nofollow`.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript
- CSS Modules + variáveis CSS globais (sem framework de UI)
- `next/font` com Bebas Neue (títulos) e Manrope (texto)
- ESLint (`eslint-config-next`)

## Como rodar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build   # export estático na pasta out/
npm run deploy  # build + publica no Cloudflare (wrangler)
npm run lint    # ESLint
```

## Estrutura de pastas

```
public/
├── hero.mp4 / hero.jpg          # vídeo de fundo do hero e poster
├── urubu-voo.mp4 / .jpg         # voo do urubu (seção Ninho do Urubu) e 1º quadro
├── urubu-voo-fim.jpg            # último quadro (poster com movimento reduzido)
├── urubu-asas.mp4 / .jpg        # urubu batendo asas em loop (seção Sócio)
├── escudo-neon.webp             # escudo em vermelho neon, gerado a partir de escudo.svg
├── escudo.svg                   # arquivo original do escudo
└── torcida.mp3                  # áudio da torcida (carregado só no primeiro clique)
src/
├── app/
│   ├── layout.tsx               # fontes, metadata (noindex) e <html lang="pt-BR">
│   ├── page.tsx                 # monta as seções da home
│   └── globals.css              # tokens, reset, .container, .btn, .section, reveal, ruído
├── components/
│   ├── CanvasVideo/             # vídeo decorativo desenhado em <canvas> (ver abaixo)
│   ├── Navbar/                  # barra fixa, mega menu (desktop) e accordion (mobile)
│   ├── Hero/                    # vídeo, faixas, escudo neon, botão de som
│   ├── CrowdBanner/             # letreiro de LED da torcida (duas faixas cruzadas)
│   ├── NextMatch/               # placar com contagem regressiva + calendário
│   ├── Urubu/                   # seção cinematográfica "Ninho do Urubu"
│   ├── Membership/              # carteirinhas de sócio + urubu animado ao fundo
│   ├── Store/                   # carrossel de camisas em SVG (JerseyArt)
│   ├── News/                    # grid editorial com filtros
│   ├── Footer/                  # wordmark, colunas de links e créditos
│   └── ui/                      # SectionHeader, Reveal, StripeDivider, ScrollProgress, GenericCrest
├── hooks/
│   └── useReducedMotion.ts      # prefers-reduced-motion sem erro de hidratação
└── data/
    ├── navigation.ts            # itens do mega menu (também alimenta o rodapé)
    └── match.ts                 # próximo jogo e calendário de exemplo
```

## Seções

1. **Hero:** vídeo da torcida, faixas rubro-negras e escudo neon (aprovado, não mexer).
2. **Letreiro da torcida:** duas faixas de LED cruzadas rolando em sentidos opostos; pausa no hover.
3. **Próximo jogo:** placar com fundo de LEDs, Flamengo x Adversário (escudo genérico "ADV"), contagem regressiva real e três jogos do calendário.
4. **Ninho do Urubu:** o urubu levanta voo uma vez quando a seção fica 60% visível e o vídeo congela no pedestal em chamas; o título aparece palavra por palavra aos 6s.
5. **Nação Rubro-Negra:** carteirinhas de sócio em glass, Paixão com borda neon girando, urubu batendo asas ao fundo.
6. **Vista o manto:** carrossel com scroll-snap, camisas em SVG e tilt 3D no hover.
7. **Últimas da Nação:** filtros por categoria, destaque 2×2 e capas em duotone.
8. **Rodapé:** wordmark gigante em contorno, links, redes e créditos.

## Decisões de design

**Por que o `CanvasVideo`.** Opera e Edge colocam um botão flutuante de pop-out/picture-in-picture sobre qualquer `<video>` grande, e ele aparecia no topo do hero, atrás do menu. O componente mantém o `<video>` só como fonte (2×2 px, quase transparente, com `disablePictureInPicture` e `disableRemotePlayback`) e desenha os quadros num `<canvas>` com a matemática do `object-fit: cover`, usando `requestVideoFrameCallback` (com fallback para `requestAnimationFrame`). O canvas nunca tem mais pixels que o próprio vídeo naquela área, então o quadro é copiado 1:1 e só o navegador amplia, com a mesma nitidez de um `<video>` comum. Ele também mostra o poster até o 1º quadro, pausa fora da tela ou com a aba oculta, só começa a tocar depois do carregamento da página, adia o download dos vídeos fora do hero até chegarem perto da tela e, com movimento reduzido, mostra apenas o poster. Se o navegador não tiver contexto 2D, volta para um `<video>` normal.

**Camadas em CSS no hero.** O vídeo fica cru e todo o tratamento é feito em CSS por cima dele: vinheta radial, faixas que entram com uma máscara varrendo até o escudo e escudo neon com `mix-blend-mode: screen` e `drop-shadow` duplo.

**Identidade visual.** Tokens em `globals.css` (`--bg #0A0A0A`, `--panel`, `--red #E10600`, `--red-neon #FF1A1A`, `--glow`…), Bebas Neue nos títulos e Manrope no texto. Todas as seções usam o mesmo cabeçalho (kicker vermelho, título gigante e linha neon), entram com fade + subida (`<Reveal>`, stagger de 60ms) e são separadas por faixas rubro-negras finas. Por trás de tudo há um ruído sutil em SVG e glows radiais vermelhos.

**Navegação para muito conteúdo.** Os itens de menu vêm de `src/data/navigation.ts`: mega menu no desktop, accordion no mobile e as mesmas colunas no rodapé.

**Acessibilidade.** Botões reais (`aria-expanded`, `aria-pressed` nos filtros e no som), foco visível em vermelho, link "pular para o conteúdo", textos alternativos nos posters, decoração com `aria-hidden` e contraste AA. Com `prefers-reduced-motion` nenhum vídeo é baixado (só os posters), o letreiro e as bordas animadas ficam estáticos e os textos aparecem prontos.

**Desempenho.** Export estático; vídeos fora do hero só carregam perto da tela e pausam fora dela; seções abaixo da dobra usam `content-visibility: auto` (o navegador pula o render e as animações enquanto estão longe); áudio só no primeiro clique; contagem regressiva preenchida por um script inline antes da hidratação, sem "--" e sem erro de hidratação.

## Créditos

Conceito, design e desenvolvimento: **PilarTech** · @pilartechbr
