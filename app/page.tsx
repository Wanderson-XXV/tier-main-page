import type { Metadata } from "next";
import PublicHome from "./components/PublicHome";

export const metadata: Metadata = {
  title: "TIER Education | Tecnologia que vira aprendizagem",
  description: "Robótica, programação e cultura maker conectadas ao currículo do 3º ao 9º ano.",
};

export default function Home() {
  return <PublicHome />;
}
