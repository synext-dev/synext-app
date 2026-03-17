import { getTrainerSupportData } from "@/lib/services/dashboard.service";
import { SupportPanel } from "@/components/dashboard/support-panel";

export default async function SupportPage() {
  const data = await getTrainerSupportData();
  return <SupportPanel data={data} />;
}
