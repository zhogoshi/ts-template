"use client";

import { ThemeToggle } from "@hogoshi/ui";
import { Counter } from "@/features/counter/ui/counter";
import { Gallery } from "./gallery";

export function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 lg:px-8 lg:py-8">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Hello</h1>
          <p className="text-fg-muted mt-1 text-sm">A project cut from the Hogoshi template.</p>
        </div>
        <ThemeToggle />
      </header>
      <Counter />
      <Gallery />
    </div>
  );
}
