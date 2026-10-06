"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Button, Result, SmoothScroll, ThemeProvider, Toaster, TooltipProvider } from "@hogoshi/ui";
import { useEffect, useState, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createQueryClient } from "@/shared/lib/query-client";

let workerStarted = false;

function MswBoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (workerStarted || process.env.NODE_ENV === "production") return;
    workerStarted = true;
    void import("@/mocks/browser").then(({ worker }) => worker.start({ onUnhandledRequest: "bypass" }));
  }, []);

  return children;
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);

  return (
    <ThemeProvider>
      <TooltipProvider>
      <SmoothScroll>
        <QueryClientProvider client={queryClient}>
          <MswBoot>
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <Result title="This page couldn't load" description={error instanceof Error ? error.message : "Something went wrong."}>
                  <Button onClick={resetErrorBoundary}>Reload</Button>
                  <Button variant="ghost" render={<a href="/" />}>
                    Home
                  </Button>
                </Result>
              )}
            >
              {children}
            </ErrorBoundary>
          </MswBoot>
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SmoothScroll>
      </TooltipProvider>
    </ThemeProvider>
  );
}
