export function GET() {
  return Response.json([
    { id: "1", name: "Northwind", email: "ada@northwind.dev", plan: "Team", spend: 420, status: "Active" },
    { id: "2", name: "Contoso", email: "lee@contoso.dev", plan: "Pro", spend: 890, status: "Active" },
    { id: "3", name: "Fabrikam", email: "sam@fabrikam.dev", plan: "Free", spend: 0, status: "Trial" },
    { id: "4", name: "Adventure", email: "kai@adventure.dev", plan: "Pro", spend: 640, status: "Past due" },
    { id: "5", name: "Litware", email: "noor@litware.dev", plan: "Team", spend: 310, status: "Active" },
  ]);
}
