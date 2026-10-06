"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Checkbox,
  CodeBlock,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  ContextMenu,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Otp,
  Kbd,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  toast,
} from "@hogoshi/ui";
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border flex flex-col gap-3 border-t pt-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export function Gallery() {
  const [day, setDay] = useState(new Date());
  const [commandOpen, setCommandOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Section title="Button">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button>Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
        </div>
      </Section>
      <Section title="Field">
        <div className="grid max-w-md gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Ada" />
          <Input type="password" placeholder="Password" />
          <Input type="number" defaultValue={3} min={0} max={10} />
          <Input type="search" placeholder="Search" />
          <Textarea placeholder="Note" />
        </div>
      </Section>
      <Section title="Choice">
        <div className="flex items-center gap-4">
          <Checkbox defaultChecked />
          <Switch defaultChecked />
          <div className="w-48">
            <Slider defaultValue={40} />
          </div>
        </div>
      </Section>
      <Section title="Select">
        <Select defaultValue="one">
          <SelectTrigger className="max-w-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one">One</SelectItem>
            <SelectItem value="two">Two</SelectItem>
          </SelectContent>
        </Select>
      </Section>
      <Section title="Display">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Avatar>
            <AvatarFallback>HK</AvatarFallback>
          </Avatar>
          <Kbd>⌘K</Kbd>
          <Spinner />
        </div>
        <Separator />
        <Skeleton className="h-8 w-40" />
      </Section>
      <Section title="Overlays">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger render={<Button variant="secondary" />}>Dialog</DialogTrigger>
            <DialogContent>
              <DialogTitle>Dialog</DialogTitle>
              <DialogDescription>Raised surface.</DialogDescription>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger render={<Button variant="secondary" />}>Sheet</SheetTrigger>
            <SheetContent>
              <SheetTitle>Sheet</SheetTitle>
            </SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger render={<Button variant="secondary" />}>Popover</PopoverTrigger>
            <PopoverContent>Popover</PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger render={<Button variant="ghost" />}>Tooltip</TooltipTrigger>
            <TooltipContent>With an arrow</TooltipContent>
          </Tooltip>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="secondary" />}>Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Copy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="secondary" onClick={() => setCommandOpen(true)}>
            Command
          </Button>
          <Button variant="secondary" onClick={() => toast("Saved")}>
            Toast
          </Button>
        </div>
        <ContextMenu
          items={[
            { id: "copy", label: "Copy", onSelect: () => toast("Copied") },
            { id: "delete", label: "Delete", destructive: true },
          ]}
        >
          <div className="border-border text-fg-muted flex h-20 items-center justify-center rounded-[var(--radius-md)] border border-dashed text-sm">
            Right click
          </div>
        </ContextMenu>
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <Command>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>New file</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </Section>
      <Section title="Calendar">
        <Calendar value={day} onChange={setDay} />
      </Section>
      <Section title="Tabs">
        <Tabs defaultValue="a">
          <TabsList>
            <TabsTrigger value="a">Alpha</TabsTrigger>
            <TabsTrigger value="b">Beta</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Alpha</TabsContent>
          <TabsContent value="b">Beta</TabsContent>
        </Tabs>
      </Section>
      <Section title="Code">
        <CodeBlock code={'export function hello() {\n  return "hogoshi";\n}'} language="ts" />
      </Section>
      <Section title="OTP">
        <Otp />
      </Section>
      <Section title="Scroll">
        <ScrollArea className="border-border h-28 rounded-[var(--radius-md)] border">
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 10 }, (_, index) => (
              <p key={index} className="text-fg-muted text-sm">
                Smooth row {index + 1}
              </p>
            ))}
          </div>
        </ScrollArea>
      </Section>
    </div>
  );
}
