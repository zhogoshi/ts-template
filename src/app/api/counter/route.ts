let count = 0;

export function GET() {
  return Response.json({ count });
}

export function POST() {
  count += 1;
  return Response.json({ count });
}
