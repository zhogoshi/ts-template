let favorites = [
  { href: "/", label: "Overview" },
  { href: "/analytics", label: "Analytics" },
];

export function GET() {
  return Response.json(favorites);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { href?: string; label?: string };
  if (!body.href || !body.label) return Response.json(favorites);
  const exists = favorites.some((item) => item.href === body.href);
  favorites = exists ? favorites.filter((item) => item.href !== body.href) : [...favorites, { href: body.href, label: body.label }];
  return Response.json(favorites);
}
