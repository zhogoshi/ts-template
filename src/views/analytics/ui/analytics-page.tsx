"use client";

import { BarChart, Card, CardDescription, CardHeader, CardTitle, LineChart, PageLoader, type ChartConfig } from "@hogoshi/ui";
import { useDashboardQuery } from "@/features/dashboard/api/dashboard";

const trafficConfig: ChartConfig = {
  visits: { label: "Visits" },
  signups: { label: "Signups" },
  churn: { label: "Churn" },
};

export function AnalyticsPage() {
  const dashboard = useDashboardQuery();
  if (dashboard.isLoading || !dashboard.data) return <PageLoader className="min-h-[28rem]" />;
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
      <Card>
        <CardHeader>
          <CardTitle>Signups</CardTitle>
          <CardDescription>Stacked against visits</CardDescription>
        </CardHeader>
        <BarChart data={dashboard.data.traffic} index="month" config={trafficConfig} stacked legend />
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Trend</CardTitle>
          <CardDescription>Same series as lines</CardDescription>
        </CardHeader>
        <LineChart data={dashboard.data.traffic} index="month" config={trafficConfig} legend />
      </Card>
    </div>
  );
}
