"use client";

import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@hogoshi/ui";

const PROJECTS = [
  { name: "Storybook", status: "Live", note: "Component playground" },
  { name: "Obfuscator", status: "Draft", note: "Build transform" },
];

export function ProjectsPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 lg:py-8">
      {PROJECTS.map((project) => (
        <Card key={project.name}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.note}</CardDescription>
          </CardHeader>
          <Badge tone={project.status === "Live" ? "success" : "neutral"}>{project.status}</Badge>
        </Card>
      ))}
    </div>
  );
}
