import { useId } from "react";

export type JerseyVariant = "home" | "away" | "training";

// Silhueta genérica de camisa (sem escudo nem marcas)
const SHIRT_PATH =
  "M70 18 L95 10 Q120 26 145 10 L170 18 L222 52 L204 98 L180 88 L180 222 Q120 232 60 222 L60 88 L36 98 L18 52 Z";

function Pattern({ variant, id }: { variant: JerseyVariant; id: string }) {
  if (variant === "home") {
    return (
      <pattern id={id} width="240" height="40" patternUnits="userSpaceOnUse">
        <rect width="240" height="20" fill="#E10600" />
        <rect y="20" width="240" height="20" fill="#0A0A0A" />
      </pattern>
    );
  }
  if (variant === "away") {
    return (
      <pattern id={id} width="240" height="240" patternUnits="userSpaceOnUse">
        <rect width="240" height="240" fill="#F2F2F2" />
        <rect y="104" width="240" height="14" fill="#E10600" />
        <rect y="118" width="240" height="14" fill="#0A0A0A" />
      </pattern>
    );
  }
  return (
    <pattern id={id} width="240" height="240" patternUnits="userSpaceOnUse">
      <rect width="240" height="240" fill="#141414" />
      <path d="M-20 200 L240 40 L240 56 L-20 216 Z" fill="#FF2424" />
    </pattern>
  );
}

export default function Jersey({ variant, label }: { variant: JerseyVariant; label: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label={label}>
      <defs>
        <Pattern variant={variant} id={`${id}-fill`} />
      </defs>
      <path d={SHIRT_PATH} fill={`url(#${id}-fill)`} stroke="rgba(255,255,255,.25)" strokeWidth="2" strokeLinejoin="round" />
      {/* Gola */}
      <path d="M95 10 Q120 34 145 10" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="3" />
    </svg>
  );
}
