import type { Metadata } from "next";
import CurriculumHub from "../components/CurriculumHub";
import { curricula } from "../data/curriculum";
import { requireTierSession } from "../lib/tier-auth";

export const metadata: Metadata = {
  title: "Hub Pedagógico | TIER Education",
  description: "Planos, materiais e acompanhamento curricular para profissionais TIER.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function HubPage() {
  const user = await requireTierSession("/hub");
  return <CurriculumHub curricula={curricula} userName={user.name} userEmail={user.email} />;
}
