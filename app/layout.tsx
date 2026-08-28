import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  await headers();
  const metadataBase = new URL("https://tier-nexo-ia.arthurcastro03.chatgpt.site");
  const description = "Robótica, programação e cultura maker conectadas ao currículo do 3º ao 9º ano.";

  return {
    metadataBase,
    title: "TIER Education | Tecnologia que vira aprendizagem",
    description,
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "TIER Education | Tecnologia que vira aprendizagem", description, type: "website", images: [{ url: "/og.png", width: 1736, height: 907, alt: "TIER Education" }] },
    twitter: { card: "summary_large_image", title: "TIER Education | Tecnologia que vira aprendizagem", description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={montserrat.variable}>{children}</body></html>;
}
