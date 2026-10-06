import type { Metadata } from "next";
import { AnalyticsPage } from "@/views/analytics/ui/analytics-page";

export const metadata: Metadata = { title: "Analytics" };

export default function Page() {
  return <AnalyticsPage />;
}
