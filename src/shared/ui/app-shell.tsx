"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft01Icon, Logout01Icon, Menu01Icon, Search01Icon, Settings01Icon, StarIcon, UserCircleIcon } from "@hugeicons-pro/core-stroke-rounded";
import {
  ChartHistogramIcon,
  CreditCardIcon,
  Folder01Icon,
  GithubIcon,
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
  AppShell as Shell,
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
  Progress,
  Separator,
  ShellAction,
  ShellBrand,
  ShellLogo,
  ShellMenu,
  ShellSearch,
  ShellTitle,
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarNav,
  Skeleton,
  ThemeToggle,
  TopBar,
  shellGlass,
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
    <SidebarItem icon={ArrowLeft01Icon} render={<a href={SITE} />}>
      Back
    </SidebarItem>
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
  return (
    <Sidebar>
      <ShellBrand href={SITE} label="hogoshi" />
      <ShellSearch onOpen={onSearch} />
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
        <ShellLogo href={SITE} label="hogoshi" className="md:hidden" />
        <ShellTitle>{title}</ShellTitle>
        <span className="flex-1" />
        <ShellAction aria-label="Search" onClick={onSearch}>
          <Icon icon={Search01Icon} variant="stroke" size={16} />
        </ShellAction>
        <ShellAction aria-label={saved ? "Remove favorite" : "Add favorite"} onClick={() => toggle.mutate({ href: pathname, label: title })}>
          <Icon icon={saved ? StarFillIcon : StarIcon} variant={saved ? "fill" : "stroke"} size={16} />
        </ShellAction>
        <ShellAction aria-label="GitHub" render={<a href="https://github.com/zhogoshi/ts-template" target="_blank" rel="noreferrer" />}>
          <Icon icon={GithubIcon} size={16} />
        </ShellAction>
        <ThemeToggle className={`${shellGlass} ml-auto rounded-full`} />
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
      <BottomBar>
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
      <ShellMenu
        open={menu}
        onOpenChange={setMenu}
        brand={
          <ShellLogo href={SITE} label="hogoshi">
            hogoshi
          </ShellLogo>
        }
      >
        <SidebarNav className="px-0">
          <NavGroups />
        </SidebarNav>
        <div className="flex shrink-0 flex-col gap-1 pt-2">
          <AccountMenu />
          <SiteBack />
        </div>
      </ShellMenu>
    </>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState(false);
  return (
    <Shell sidebar={<ShellSidebar onSearch={() => setSearch(true)} />} topBar={<Topbar onSearch={() => setSearch(true)} />} bottomBar={<MobileBar />}>
      {children}
      <SearchDialog open={search} onOpenChange={setSearch} />
    </Shell>
  );
}
