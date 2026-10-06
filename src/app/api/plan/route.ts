export function GET() {
  return Response.json({
    name: "Pro",
    seats: { used: 8, max: 12 },
    storage: { used: 34, max: 50 },
    api: { used: 720, max: 1000 },
  });
}
