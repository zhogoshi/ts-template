import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        retry: (count, error) => {
          const status = (error as { status?: number } | null)?.status;
          if (status && status >= 400 && status < 500) return false;
          return count < 2;
        },
      },
      mutations: { retry: false },
    },
  });
}
