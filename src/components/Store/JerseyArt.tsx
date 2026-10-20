import { useId } from "react";

export type JerseyVariant = "home" | "away" | "training" | "retro" | "kids";

// Silhueta genérica de camisa (sem marcas nem patrocinadores)
const BODY =
  "M84 22 Q120 42 156 22 L198 36 L234 82 L206 112 L188 100 L188 238 Q120 250 52 238 L52 100 L34 112 L6 82 L42 36 Z";
const COLLAR = "M84 22 Q120 46 156 22";
const VNECK = "M88 23 L120 58 L152 23";

function Fill({ variant, id }: { variant: JerseyVariant; id: string }) {
  switch (variant) {
    case "home":
      return (
        <pattern id={id} width="240" height="44" patternUnits="userSpaceOnUse">
          <rect width="240" height="22" fill="#E10600" />
          <rect y="22" width="240" height="22" fill="#0A0A0A" />
        </pattern>
      );
    case "away":
      return (
        <pattern id={id} width="240" height="260" patternUnits="userSpaceOnUse">
          <rect width="240" height="260" fill="#F2F2F2" />
          <rect y="112" width="240" height="16" fill="#E10600" />
          <rect y="128" width="240" height="16" fill="#0A0A0A" />
        </pattern>
      );
    case "training":
      return (
        <pattern id={id} width="240" height="260" patternUnits="userSpaceOnUse">
          <rect width="240" height="260" fill="#111" />
        </pattern>
      );
    case "retro":
      return (
        <pattern id={id} width="240" height="64" patternUnits="userSpaceOnUse">
          <rect width="240" height="32" fill="#B80500" />
          <rect y="32" width="240" height="32" fill="#141010" />
        </pattern>
      );
    case "kids":
      return (
        <pattern id={id} width="240" height="28" patternUnits="userSpaceOnUse">
          <rect width="240" height="14" fill="#FF1A1A" />
          <rect y="14" width="240" height="14" fill="#0A0A0A" />
        </pattern>
      );
  }
}

/** Linhas de circuito em neon (camisa de treino). */
function Circuit({ glow }: { glow: string }) {
  return (
    <g fill="none" stroke="#FF1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glow})`}>
      <path d="M52 150 H92 L108 166 V210" />
      <path d="M188 128 H150 L134 112 V80" />
      <path d="M70 236 V196 L84 182 H120" />
      <path d="M188 190 H160 L146 204 V240" />
      <path d="M120 60 V96 L132 108" />
      <g fill="#FF1A1A" stroke="none">
        <circle cx="108" cy="210" r="3.5" />
        <circle cx="134" cy="80" r="3.5" />
        <circle cx="120" cy="182" r="3.5" />
        <circle cx="146" cy="240" r="3.5" />
        <circle cx="132" cy="108" r="3.5" />
      </g>
    </g>
  );
}

type Props = { variant: JerseyVariant; label: string; crest?: boolean };

export default function JerseyArt({ variant, label, crest = true }: Props) {
  const id = useId();
  const fill = `${id}-fill`;
  const shade = `${id}-shade`;
  const glow = `${id}-glow`;
  const clip = `${id}-clip`;
  const light = variant === "away";

  return (
    <svg viewBox="0 0 240 260" role="img" aria-label={label}>
      <defs>
        <Fill variant={variant} id={fill} />
        {/* Volume: bordas mais escuras, centro iluminado */}
        <linearGradient id={shade} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".45" />
          <stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".06" />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={clip}>
          <path d={BODY} />
        </clipPath>
      </defs>

      <g transform={variant === "kids" ? "translate(24 30) scale(.8)" : undefined}>
        <path d={BODY} fill={`url(#${fill})`} />
        <g clipPath={`url(#${clip})`}>
          {variant === "training" && <Circuit glow={glow} />}
          {/* Punhos e barra */}
          <path d="M34 112 L6 82 L14 74 L42 104 Z M206 112 L234 82 L226 74 L198 104 Z" fill={light ? "#0A0A0A" : "#000"} opacity=".55" />
          {variant === "kids" && (
            <text x="120" y="190" textAnchor="middle" fill="#fff" fontFamily="Impact, sans-serif" fontSize="64" opacity=".95">
              10
            </text>
          )}
          <path d={BODY} fill={`url(#${shade})`} />
        </g>
        <path d={BODY} fill="none" stroke={light ? "rgba(0,0,0,.25)" : "rgba(255,255,255,.22)"} strokeWidth="2" strokeLinejoin="round" />

        {variant === "retro" ? (
          <>
            {/* Gola polo branca com cordão */}
            <path d="M84 22 L120 62 L156 22 L146 18 L120 48 L94 18 Z" fill="#F2F2F2" />
            <path d="M114 50 L126 56 M114 58 L126 52" stroke="#141010" strokeWidth="2" />
          </>
        ) : variant === "training" ? (
          <path d={VNECK} fill="none" stroke="#FF1A1A" strokeWidth="3" filter={`url(#${glow})`} />
        ) : (
          <path d={COLLAR} fill="none" stroke={light ? "#0A0A0A" : "rgba(255,255,255,.55)"} strokeWidth="4" />
        )}

        {crest && variant !== "kids" && (
          <image href="/escudo-neon.webp" x="134" y="70" width="28" height="32" opacity=".95" />
        )}
      </g>
    </svg>
  );
}
