import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: gera a pasta out/ para hospedar no Cloudflare.
  // (cacheComponents/partialPrefetching não funcionam com export e não eram usados.)
  output: "export",
};

export default nextConfig;
