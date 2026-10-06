export const PAGES = [
  { href: "/", label: "Overview", group: "workspace" },
  { href: "/analytics", label: "Analytics", group: "workspace" },
  { href: "/customers", label: "Customers", group: "workspace" },
  { href: "/projects", label: "Projects", group: "workspace" },
  { href: "/billing", label: "Billing", group: "account" },
  { href: "/team", label: "Team", group: "account" },
  { href: "/settings", label: "Settings", group: "account" },
] as const;

export type PageHref = (typeof PAGES)[number]["href"];

export function pageTitle(pathname: string) {
  return PAGES.find((item) => item.href === pathname)?.label ?? "Page not found";
}

export function crumbs(pathname: string) {
  const label = pageTitle(pathname);
  if (pathname === "/") return [{ label }];
  return [{ href: "/", label: "Home" }, { label }];
}
