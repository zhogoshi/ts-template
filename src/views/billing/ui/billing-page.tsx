"use client";

import { useState } from "react";
import { Button, Card, CardDescription, CardHeader, CardTitle, PageLoader, Progress } from "@hogoshi/ui";
import { UpgradeDialog } from "@/features/billing/ui/upgrade-dialog";
import { usePlanQuery } from "@/features/dashboard/api/dashboard";

export function BillingPage() {
  const plan = usePlanQuery();
  const [upgrade, setUpgrade] = useState(false);
  if (plan.isLoading || !plan.data) return <PageLoader className="min-h-[28rem]" />;
  const rows = [
    { label: "Seats", used: plan.data.seats.used, max: plan.data.seats.max, unit: "" },
    { label: "Storage", used: plan.data.storage.used, max: plan.data.storage.max, unit: " GB" },
    { label: "API calls", used: plan.data.api.used, max: plan.data.api.max, unit: "k" },
  ];
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Card>
        <CardHeader>
          <CardTitle>{plan.data.name}</CardTitle>
          <CardDescription>Current plan and cycle limits</CardDescription>
        </CardHeader>
        <div className="grid gap-4">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1.5">
              <div className="flex justify-between text-sm">
                <span>{row.label}</span>
                <span className="text-fg-muted tabular-nums">
                  {row.used}
                  {row.unit} / {row.max}
                  {row.unit}
                </span>
              </div>
              <Progress value={row.used} max={row.max} />
            </div>
          ))}
          <Button variant="primary" onClick={() => setUpgrade(true)}>
            Upgrade to Team
          </Button>
        </div>
      </Card>
      <UpgradeDialog open={upgrade} onOpenChange={setUpgrade} />
    </div>
  );
}
