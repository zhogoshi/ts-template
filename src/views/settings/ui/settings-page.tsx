"use client";

import { Card, CardDescription, CardHeader, CardTitle, Input, Label, Switch, Tabs, TabsContent, TabsList, TabsTrigger } from "@hogoshi/ui";
import { Counter } from "@/features/counter/ui/counter";

const MEMBERS = [
  { name: "hogoshi", role: "Owner", plan: "Pro" },
  { name: "ada", role: "Admin", plan: "Team" },
  { name: "lee", role: "Member", plan: "Team" },
];

export function SettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Name shown in the sidebar</CardDescription>
            </CardHeader>
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="hogoshi" />
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="hogoshi@hogoshi.dev" />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>People on the Team plan</CardDescription>
            </CardHeader>
            <div className="grid gap-2">
              {MEMBERS.map((member) => (
                <div key={member.name} className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium">{member.name}</span>
                  <span className="text-fg-muted">{member.role}</span>
                </div>
              ))}
              <Label htmlFor="invite">Invite</Label>
              <Input id="invite" type="email" placeholder="name@company.dev" />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="alerts">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>What this workspace sends</CardDescription>
            </CardHeader>
            <div className="grid gap-3">
              <label className="flex items-center justify-between gap-3 text-sm">
                Product emails
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-3 text-sm">
                Billing receipts
                <Switch defaultChecked />
              </label>
              <Counter />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
