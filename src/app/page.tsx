import type { Metadata } from "next";
import { OverviewPage } from "@/views/overview/ui/overview-page";

export const metadata: Metadata = { title: "Overview" };

export default function Page() {
  return <OverviewPage />;
}
