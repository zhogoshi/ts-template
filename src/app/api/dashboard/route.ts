const traffic = [
  { month: "Jan", visits: 4200, signups: 310, churn: 48 },
  { month: "Feb", visits: 5100, signups: 360, churn: 41 },
  { month: "Mar", visits: 4700, signups: 290, churn: 55 },
  { month: "Apr", visits: 6200, signups: 410, churn: 38 },
  { month: "May", visits: 7100, signups: 470, churn: 33 },
  { month: "Jun", visits: 6800, signups: 450, churn: 36 },
];

const spark = (offset: number) => traffic.map((row, index) => ({ x: index, y: row.visits / 100 + offset * 8 }));

export function GET() {
  return Response.json({
    kpis: [
      { id: "mrr", label: "MRR", value: "$48.2k", delta: "+8.4%", series: spark(0) },
      { id: "visits", label: "Visits", value: "34.1k", delta: "+12%", series: spark(2) },
      { id: "signups", label: "Signups", value: "2,290", delta: "+4.1%", series: spark(4) },
      { id: "churn", label: "Churn", value: "2.8%", delta: "−0.4%", series: spark(1) },
    ],
    traffic,
    plans: [
      { name: "pro", value: 148 },
      { name: "team", value: 72 },
      { name: "free", value: 214 },
    ],
  });
}
