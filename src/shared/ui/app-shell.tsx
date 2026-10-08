"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft01Icon, Logout01Icon, Menu01Icon, Search01Icon, Settings01Icon, StarIcon, UserCircleIcon } from "@hugeicons-pro/core-stroke-rounded";
import {
  ChartHistogramIcon,
  CreditCardIcon,
  Folder01Icon,
  Home01Icon,
  Menu01Icon as Menu01FillIcon,
  StarIcon as StarFillIcon,
  UserGroupIcon,
} from "@hugeicons-pro/core-solid-rounded";
import {
  Home01Icon as HomeStroke,
  ChartHistogramIcon as ChartStroke,
  CreditCardIcon as CardStroke,
  Folder01Icon as FolderStroke,
  Settings01Icon as SettingsStroke,
  UserGroupIcon as GroupStroke,
} from "@hugeicons-pro/core-stroke-rounded";
import {
  Avatar,
  AvatarFallback,
  BottomBar,
  BottomBarItem,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  Kbd,
  Logo,
  Progress,
  TopBar,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  SidebarProvider,
  SidebarTrigger,
  Skeleton,
  ThemeToggle,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  sidebarLabel,
  toast,
  useSidebar,
} from "@hogoshi/ui";
import { UpgradeDialog } from "@/features/billing/ui/upgrade-dialog";
import { useFavoritesQuery, usePlanQuery, useToggleFavorite } from "@/features/dashboard/api/dashboard";
import { PAGES, pageTitle } from "../config/nav";

const SITE = "https://hogoshi.dev";

const ICONS = {
  "/": { stroke: HomeStroke, fill: Home01Icon },
  "/analytics": { stroke: ChartStroke, fill: ChartHistogramIcon },
  "/customers": { stroke: GroupStroke, fill: UserGroupIcon },
  "/projects": { stroke: FolderStroke, fill: Folder01Icon },
  "/billing": { stroke: CardStroke, fill: CreditCardIcon },
  "/team": { stroke: GroupStroke, fill: UserGroupIcon },
  "/settings": { stroke: SettingsStroke, fill: Settings01Icon },
} as const;

const ACCOUNTS = [
  { id: "hogoshi", name: "hogoshi", plan: "Pro" },
  { id: "ada", name: "ada", plan: "Team" },
];

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  const icons = ICONS[href as keyof typeof ICONS];
  return (
    <SidebarItem
      active={active}
      icon={active ? icons.fill : icons.stroke}
      iconVariant={active ? "fill" : "stroke"}
      render={<Link href={href} />}
    >
      {label}
    </SidebarItem>
  );
}

function NavGroups() {
  const favorites = useFavoritesQuery();
  const saved = favorites.data ?? [];
  return (
    <>
      {saved.length > 0 ? (
        <SidebarGroup>
          <SidebarLabel>Favorites</SidebarLabel>
          {saved.map((item) => (
            <SidebarItem key={item.href} icon={StarFillIcon} iconVariant="fill" render={<Link href={item.href} />}>
              {item.label}
            </SidebarItem>
          ))}
        </SidebarGroup>
      ) : null}
      <SidebarGroup>
        <SidebarLabel>Workspace</SidebarLabel>
        {PAGES.filter((item) => item.group === "workspace").map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </SidebarGroup>
      <SidebarGroup>
        <SidebarLabel>Account</SidebarLabel>
        {PAGES.filter((item) => item.group === "account").map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </SidebarGroup>
    </>
  );
}

function PlanCard() {
  const { collapsed } = useSidebar();
  const plan = usePlanQuery();
  const [upgrade, setUpgrade] = useState(false);
  if (collapsed) return null;
  if (plan.isLoading) return <Skeleton className="h-36" />;
  if (!plan.data) return null;
  const rows = [
    { label: "Seats", used: plan.data.seats.used, max: plan.data.seats.max, suffix: "" },
    { label: "Storage", used: plan.data.storage.used, max: plan.data.storage.max, suffix: " GB" },
    { label: "API", used: plan.data.api.used, max: plan.data.api.max, suffix: "k" },
  ];
  return (
    <>
      <Card className="p-3">
        <CardHeader className="mb-2">
          <CardTitle>{plan.data.name} plan</CardTitle>
          <CardDescription>Usage this cycle</CardDescription>
        </CardHeader>
        <div className="grid gap-2.5">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1">
              <div className="text-fg-muted flex justify-between text-[11px]">
                <span>{row.label}</span>
                <span className="tabular-nums">
                  {row.used}
                  {row.suffix} / {row.max}
                  {row.suffix}
                </span>
              </div>
              <Progress value={row.used} max={row.max} />
            </div>
          ))}
          <Button variant="primary" size="sm" className="mt-1 w-full" onClick={() => setUpgrade(true)}>
            Upgrade
          </Button>
        </div>
      </Card>
      <UpgradeDialog open={upgrade} onOpenChange={setUpgrade} />
    </>
  );
}

const glass = "border-border bg-bg-elevated/70 hover:bg-bg-elevated border backdrop-blur-xl";

function SearchButton({ onOpen }: { onOpen: () => void }) {
  const { collapsed } = useSidebar();
  const fade = `${sidebarLabel} ${collapsed ? "opacity-0" : ""}`;
  const button = (
    <Button
      variant="outline"
      aria-label="Search"
      className={cnGlass("w-full justify-between overflow-hidden px-3 font-normal whitespace-nowrap [&>span]:w-full [&>span>span]:w-full")}
      onClick={onOpen}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2">
          <Icon icon={Search01Icon} variant="stroke" size={16} className="shrink-0" />
          <span className={fade}>Search</span>
        </span>
        <Kbd className={`shrink-0 ${fade}`}>⌘K</Kbd>
      </span>
    </Button>
  );
  return (
    <Tooltip disabled={!collapsed}>
      <TooltipTrigger render={button} />
      <TooltipContent side="right">Search</TooltipContent>
    </Tooltip>
  );
}

function cnGlass(className: string) {
  return `${glass} ${className}`;
}

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter();
  const groups = [
    { heading: "Workspace", items: PAGES.filter((item) => item.group === "workspace") },
    { heading: "Account", items: PAGES.filter((item) => item.group === "account") },
  ];
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder="Go to a page" />
        <CommandList>
          <CommandEmpty>No pages</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.href}
                  onSelect={() => {
                    onOpenChange(false);
                    router.push(item.href);
                  }}
                >
                  <Icon icon={ICONS[item.href].stroke} variant="stroke" size={16} />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}

function SiteBack() {
  return (
    <a
      href={SITE}
      className="text-fg-muted hover:bg-bg-subtle hover:text-fg inline-flex h-[calc(var(--row-h)-0.25rem)] w-full cursor-pointer items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-3 text-sm whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon icon={ArrowLeft01Icon} variant="stroke" size={16} className="shrink-0" />
      <span className={sidebarLabel}>Back</span>
    </a>
  );
}

function AccountMenu() {
  const { collapsed } = useSidebar();
  const router = useRouter();
  const [id, setId] = useState(ACCOUNTS[0].id);
  const current = ACCOUNTS.find((item) => item.id === id) ?? ACCOUNTS[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hover:bg-bg-subtle flex w-full cursor-pointer items-center gap-2 overflow-hidden rounded-[var(--radius-sm)] px-2 py-1.5 text-left"
      >
        <Avatar className="size-8 shrink-0">
          <AvatarFallback>{current.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className={`grid min-w-0 ${sidebarLabel} ${collapsed ? "opacity-0" : ""}`}>
          <span className="truncate text-sm font-medium">{current.name}</span>
          <span className="text-fg-muted truncate text-xs">{current.plan}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Switch account</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {ACCOUNTS.map((item) => (
              <DropdownMenuItem key={item.id} onClick={() => setId(item.id)}>
                <Icon icon={UserCircleIcon} variant="stroke" size={16} />
                {item.name}
                <span className="text-fg-subtle ml-auto text-xs">{item.id === id ? "Current" : item.plan}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <Separator className="my-1" />
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Icon icon={UserCircleIcon} variant="stroke" size={16} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Icon icon={Settings01Icon} variant="stroke" size={16} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast("Signed out", { description: "This preview stays on the device." })}>
          <Icon icon={Logout01Icon} variant="stroke" size={16} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ShellSidebar({ onSearch }: { onSearch: () => void }) {
  const { collapsed } = useSidebar();
  return (
    <Sidebar className="pt-[calc(var(--safe-top)+0.5rem)] pb-2">
      <SidebarHeader className="group/header relative overflow-hidden px-2">
        <a
          href={SITE}
          aria-label="hogoshi"
          className={`flex min-w-0 items-center gap-2 rounded-[var(--radius-sm)] px-1 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-ring ${collapsed ? "group-hover/header:pointer-events-none group-hover/header:opacity-0 [@media(hover:none)]:pointer-events-none [@media(hover:none)]:opacity-0" : ""}`}
        >
          <Logo size="sm" className="shrink-0" />
          <span className={`text-sm font-semibold tracking-tight ${sidebarLabel} ${collapsed ? "opacity-0" : ""}`}>hogoshi</span>
        </a>
        <SidebarTrigger
          className={
            collapsed
              ? "pointer-events-none absolute top-3 left-3 opacity-0 transition-opacity group-hover/header:pointer-events-auto group-hover/header:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100 [@media(hover:none)]:pointer-events-auto [@media(hover:none)]:opacity-100"
              : "shrink-0"
          }
        />
      </SidebarHeader>
      <div className="shrink-0 px-2 pb-2">
        <SearchButton onOpen={onSearch} />
      </div>
      <SidebarNav>
        <NavGroups />
        <div className="hidden px-1 pt-2 [@media(orientation:landscape)_and_(max-height:32rem)]:block">
          <PlanCard />
        </div>
      </SidebarNav>
      <SidebarFooter>
        <div className="[@media(orientation:landscape)_and_(max-height:32rem)]:hidden">
          <PlanCard />
        </div>
        <AccountMenu />
      </SidebarFooter>
    </Sidebar>
  );
}

function Topbar({ onSearch }: { onSearch: () => void }) {
  const pathname = usePathname();
  const title = pageTitle(pathname);
  const favorites = useFavoritesQuery();
  const toggle = useToggleFavorite();
  const saved = favorites.data?.some((item) => item.href === pathname) ?? false;
  useEffect(() => {
    document.title = `${title} · Hogoshi`;
  }, [title]);
  return (
    <TopBar contained>
        <a href={SITE} aria-label="hogoshi" className="shrink-0 rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden">
          <Logo size="sm" />
        </a>
        <p className="pointer-events-none absolute top-1/2 left-1/2 max-w-[70%] -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="absolute top-1/2 left-1/2 -z-10 h-[2.4em] w-[260%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,var(--bg)_0%,color-mix(in_oklch,var(--bg)_82%,transparent)_36%,transparent_70%)]"
          />
          <span className="relative block truncate text-sm font-semibold">{title}</span>
        </p>
        <span className="flex-1" />
        <Button variant="secondary" size="icon" aria-label="Search" className={cnGlass("rounded-full")} onClick={onSearch}>
          <Icon icon={Search01Icon} variant="stroke" size={16} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          aria-label={saved ? "Remove favorite" : "Add favorite"}
          className={cnGlass("rounded-full")}
          onClick={() => toggle.mutate({ href: pathname, label: title })}
        >
          <Icon icon={saved ? StarFillIcon : StarIcon} variant={saved ? "fill" : "stroke"} size={16} />
        </Button>
        <ThemeToggle className={cnGlass("ml-auto rounded-full")} />
    </TopBar>
  );
}

function MobileBar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  const links = PAGES.filter((item) => item.group === "workspace").slice(0, 3);
  return (
    <>
      <BottomBar className="right-[max(0.75rem,var(--safe-right))] bottom-2 left-[max(0.75rem,var(--safe-left))]">
        {links.map((item) => {
          const icons = ICONS[item.href];
          const active = pathname === item.href;
          return (
            <BottomBarItem
              key={item.href}
              active={active}
              icon={active ? icons.fill : icons.stroke}
              iconVariant={active ? "fill" : "stroke"}
              render={<Link href={item.href} />}
            >
              {item.label}
            </BottomBarItem>
          );
        })}
        <BottomBarItem active={menu} icon={menu ? Menu01FillIcon : Menu01Icon} iconVariant={menu ? "fill" : "stroke"} onClick={() => setMenu(true)}>
          Menu
        </BottomBarItem>
      </BottomBar>
      <Sheet side="left" open={menu} onOpenChange={setMenu}>
        <SheetContent className="top-[calc(var(--safe-top)+0.75rem)] right-auto bottom-2 left-[max(0.75rem,var(--safe-left))] px-2">
          <SheetTitle className="px-3 pt-1 text-sm font-semibold">
            <a href={SITE} aria-label="hogoshi" className="flex items-center gap-2 rounded-[var(--radius-sm)] outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Logo size="sm" />
              hogoshi
            </a>
          </SheetTitle>
          <SidebarProvider>
            <div className="flex min-h-0 flex-1 flex-col">
              <SidebarNav className="px-0">
                <NavGroups />
              </SidebarNav>
              <div className="flex shrink-0 flex-col gap-1 pt-2">
                <AccountMenu />
                <SiteBack />
              </div>
            </div>
          </SidebarProvider>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState(false);
  return (
    <SidebarProvider>
      <div className="bg-bg fixed inset-0 flex h-[100lvh] min-h-[100lvh] overflow-hidden">
        <ShellSidebar onSearch={() => setSearch(true)} />
        <SidebarInset className="relative flex min-h-0 min-w-0 flex-1 flex-col">
          <Topbar onSearch={() => setSearch(true)} />
          <div data-scroll-root className="min-h-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-scroll overscroll-y-contain pt-[calc(3.5rem+var(--safe-top)+0.5rem)] pb-16 md:pb-0">
            {children}
          </div>
        </SidebarInset>
      </div>
      <MobileBar />
      <SearchDialog open={search} onOpenChange={setSearch} />
    </SidebarProvider>
  );
}
