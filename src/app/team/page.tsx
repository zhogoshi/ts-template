import type { Metadata } from "next";
import { TeamPage } from "@/views/team/ui/team-page";

export const metadata: Metadata = { title: "Team" };

export default function Page() {
  return <TeamPage />;
}
