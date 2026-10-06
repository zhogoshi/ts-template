"use client";

import {
  AreaChart,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  DonutChart,
  PageLoader,
  Sparkline,
  type ChartConfig,
} from "@hogoshi/ui";
import { useDashboardQuery } from "@/features/dashboard/api/dashboard";

const trafficConfig: ChartConfig = {
  visits: { label: "Visits" },
  signups: { label: "Signups" },
  churn: { label: "Churn" },
};

const planConfig: ChartConfig = {
  pro: { label: "Pro" },
  team: { label: "Team" },
  free: { label: "Free" },
};

export function OverviewPage() {
  const dashboard = useDashboardQuery();
  if (dashboard.isLoading || !dashboard.data) {
    return <PageLoader className="min-h-[28rem]" />;
  }
  const { kpis, traffic, plans } = dashboard.data;
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{kpi.value}</CardTitle>
            </CardHeader>
            <p className="text-fg-muted mb-3 text-xs">{kpi.delta}</p>
            <Sparkline data={kpi.series} dataKey="y" />
          </Card>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic</CardTitle>
            <CardDescription>Visits, signups, and churn</CardDescription>
          </CardHeader>
          <AreaChart data={traffic} index="month" config={trafficConfig} legend />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plans</CardTitle>
            <CardDescription>Active seats</CardDescription>
          </CardHeader>
          <DonutChart data={plans} nameKey="name" valueKey="value" config={planConfig} label="Seats" />
        </Card>
      </div>
    </div>
  );
}
