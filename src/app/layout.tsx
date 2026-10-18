import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flamengo · Conceito não oficial | PilarTech",
  description:
    "Site conceito não oficial do Flamengo, criado pela PilarTech para fins de portfólio. Sem vínculo com o Clube de Regatas do Flamengo.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
