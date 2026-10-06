"use client";

import { Badge, Button, Card, Input, Label } from "@hogoshi/ui";

const MEMBERS = [
  { name: "hogoshi", role: "Owner", plan: "Pro" },
  { name: "ada", role: "Admin", plan: "Team" },
  { name: "lee", role: "Member", plan: "Team" },
  { name: "noor", role: "Member", plan: "Free" },
];

export function TeamPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 lg:px-8 lg:py-8">
      <Card className="max-w-lg">
        <div className="grid gap-3">
          <Label htmlFor="invite">Invite to Team</Label>
          <div className="flex gap-2">
            <Input id="invite" type="email" placeholder="name@company.dev" />
            <Button variant="primary">Invite</Button>
          </div>
        </div>
      </Card>
      {MEMBERS.map((member) => (
        <Card key={member.name} className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium">{member.name}</p>
            <p className="text-fg-muted text-xs">{member.role}</p>
          </div>
          <Badge tone={member.plan === "Pro" ? "accent" : member.plan === "Team" ? "success" : "neutral"}>{member.plan}</Badge>
        </Card>
      ))}
    </div>
  );
}
