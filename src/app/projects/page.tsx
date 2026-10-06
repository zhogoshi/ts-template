import type { Metadata } from "next";
import { ProjectsPage } from "@/views/projects/ui/projects-page";

export const metadata: Metadata = { title: "Projects" };

export default function Page() {
  return <ProjectsPage />;
}
