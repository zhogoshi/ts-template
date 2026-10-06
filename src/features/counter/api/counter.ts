"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const key = ["counter"] as const;

async function readCounter() {
  const response = await fetch("/api/counter");
  if (!response.ok) throw new Error("Failed to load counter");
  return response.json() as Promise<{ count: number }>;
}

export function useCounterQuery() {
  return useQuery({ queryKey: key, queryFn: readCounter });
}

export function useIncrementCounter() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/counter", { method: "POST" });
      if (!response.ok) throw new Error("Failed to increment counter");
      return response.json() as Promise<{ count: number }>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(key, data);
    },
  });
}
