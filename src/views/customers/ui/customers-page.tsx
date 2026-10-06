"use client";

import { useMemo, useState } from "react";
import { Badge, Card, Input, PageLoader, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type SortDirection } from "@hogoshi/ui";
import { useCustomersQuery } from "@/features/dashboard/api/dashboard";

type Key = "name" | "plan" | "spend" | "status";

const tone = { Active: "success", Trial: "warning", "Past due": "danger" } as const;

export function CustomersPage() {
  const customers = useCustomersQuery();
  const [query, setQuery] = useState("");
  const [key, setKey] = useState<Key | null>(null);
  const [dir, setDir] = useState<SortDirection>("asc");
  const rows = useMemo(() => {
    const list = (customers.data ?? []).filter((row) => `${row.name} ${row.email} ${row.plan}`.toLowerCase().includes(query.toLowerCase()));
    if (!key) return list;
    return [...list].sort((a, b) => {
      const left = a[key];
      const right = b[key];
      const order = left < right ? -1 : left > right ? 1 : 0;
      return dir === "asc" ? order : -order;
    });
  }, [customers.data, dir, key, query]);

  if (customers.isLoading || !customers.data) return <PageLoader className="min-h-[28rem]" />;

  const sort = (next: Key) => {
    if (key !== next) {
      setKey(next);
      setDir("asc");
      return;
    }
    if (dir === "asc") setDir("desc");
    else setKey(null);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 lg:px-8 lg:py-8">
      <Input type="search" value={query} placeholder="Search customers" onChange={(event) => setQuery(event.target.value)} className="max-w-sm" />
      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sort={key === "name" && dir} onSort={() => sort("name")}>
                Customer
              </TableHead>
              <TableHead sort={key === "plan" && dir} onSort={() => sort("plan")}>
                Plan
              </TableHead>
              <TableHead sort={key === "status" && dir} onSort={() => sort("status")}>
                Status
              </TableHead>
              <TableHead sort={key === "spend" && dir} onSort={() => sort("spend")}>
                Spend
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <p className="font-medium">{row.name}</p>
                  <p className="text-fg-muted text-xs">{row.email}</p>
                </TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>
                  <Badge tone={tone[row.status as keyof typeof tone] ?? "neutral"}>{row.status}</Badge>
                </TableCell>
                <TableCell className="tabular-nums">${row.spend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
