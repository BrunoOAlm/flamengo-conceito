# Flamengo · Site Conceito

Site conceito **não oficial** do Flamengo, criado pela PilarTech (@pilartechbr) para portfólio. A proposta é explorar uma identidade escura, futurista e rubro-negra (vídeo de fundo, escudo em neon, listras animadas) num site de clube com muito conteúdo: agenda de jogos, sócio-torcedor, loja e notícias.

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
├── hero.mp4            # vídeo de fundo do hero
├── hero.jpg            # poster do vídeo (e fundo com movimento reduzido)
├── escudo-neon.webp    # escudo em vermelho neon, gerado a partir de escudo.svg
├── escudo.svg          # arquivo original do escudo
└── torcida.mp3         # áudio da torcida (carregado só no primeiro clique)
src/
├── app/
│   ├── layout.tsx      # fontes, metadata (noindex) e <html lang="pt-BR">
│   ├── page.tsx        # monta as seções da home
│   └── globals.css     # paleta, reset, .container, .btn, animação de entrada
├── components/
│   ├── Navbar/         # barra fixa, mega menu (desktop) e accordion (mobile)
│   ├── Hero/           # vídeo, faixas, escudo neon, botão de som
│   ├── NextMatch/      # card do próximo jogo + contagem regressiva
│   ├── Membership/     # planos de sócio-torcedor
│   ├── Store/          # vitrine com camisas em SVG genérico
│   ├── News/           # grade de notícias
│   ├── Footer/         # rodapé com o aviso de conceito
│   ├── SectionTitle/   # cabeçalho padrão das seções
│   └── ScrollReveal/   # entrada das seções ao rolar
└── data/
    ├── navigation.ts   # itens e colunas do mega menu (tipados)
    └── match.ts        # dados do próximo jogo (seção e mega menu)
```

## Decisões de design

**Vídeo + camadas em CSS no hero.** O vídeo fica cru e todo o tratamento é feito em CSS por cima dele, o que permite ajustar o visual sem reexportar mídia:

1. `<video>` em `object-fit: cover`, com `hero.jpg` como poster;
2. vinheta em `radial-gradient` (centro mais claro, bordas escuras) e degradê na base para emendar com a próxima seção;
3. faixas rubro-negras em `repeating-linear-gradient`, que entram com uma máscara de borda suave varrendo da ponta externa até o escudo; a entrada repete sempre que o hero volta à tela;
4. escudo neon com `mix-blend-mode: screen` (o vermelho "soma luz" ao vídeo), `drop-shadow` duplo para o brilho e uma animação de letreiro de neon ligando, seguida de uma oscilação leve.

**Paleta e tipografia.** Fundo `#0A0A0A`, vermelho `#E10600`, neon `#FF2424`, branco e cinza `#B5B5B5` para texto, definidos como variáveis em `globals.css`. Bebas Neue nos títulos e Manrope no corpo.

**Navegação para muito conteúdo.** Os itens de menu vêm de `src/data/navigation.ts`, então dá para crescer o menu sem mexer no componente. No desktop vira um mega menu em largura total com o card do próximo jogo; no mobile, accordions em tela cheia com Ingressos e Seja Sócio fixos no rodapé.

**Acessibilidade.** Botões reais (`aria-expanded` no menu, `aria-pressed` no som), foco visível, link "pular para o conteúdo", textos alternativos e contraste AA. Com `prefers-reduced-motion` as animações são desligadas e o vídeo dá lugar à imagem estática.

**Desempenho.** O áudio só é baixado no primeiro clique, o vídeo pausa fora da tela, as animações de entrada usam `IntersectionObserver` e a página é gerada estaticamente.

## Créditos

Conceito, design e desenvolvimento: **PilarTech** · @pilartechbr
