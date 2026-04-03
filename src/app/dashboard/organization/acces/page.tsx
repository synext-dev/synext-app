import { getTrainerAccountSettings } from "@/lib/services/dashboard.service";
import { AccesPanel } from "@/components/dashboard/acces-panel";

export default async function OrgAccesPage() {
  const settings = await getTrainerAccountSettings();
  return <AccesPanel settings={settings} />;
}
