/** Escudo genérico e neutro do "Adversário" (cinza, monograma ADV). */
export default function GenericCrest({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 72" width={size} height={(size * 72) / 64} aria-hidden="true">
      <path d="M32 2 L60 10 V34 C60 52 47 64 32 70 C17 64 4 52 4 34 V10 Z" fill="#2a2a2a" stroke="#6b6b6b" strokeWidth="2" />
      <path d="M32 8 L54 14.5 V34 C54 48.5 44 58.5 32 63.5 C20 58.5 10 48.5 10 34 V14.5 Z" fill="none" stroke="#4a4a4a" strokeWidth="1.2" />
      <text x="32" y="42" textAnchor="middle" fill="#bdbdbd" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" letterSpacing="1">
        ADV
      </text>
    </svg>
  );
}
