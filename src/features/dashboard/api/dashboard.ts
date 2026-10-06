"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  series: { x: number; y: number }[];
}

export interface Dashboard {
  kpis: Kpi[];
  traffic: { month: string; visits: number; signups: number; churn: number }[];
  plans: { name: string; value: number }[];
}

async function readJson<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load ${url}`);
  return response.json() as Promise<T>;
}

export function useDashboardQuery() {
  return useQuery({ queryKey: ["dashboard"], queryFn: () => readJson<Dashboard>("/api/dashboard") });
}

export function usePlanQuery() {
  return useQuery({
    queryKey: ["plan"],
    queryFn: () =>
      readJson<{
        name: string;
        seats: { used: number; max: number };
        storage: { used: number; max: number };
        api: { used: number; max: number };
      }>("/api/plan"),
  });
}

export function useFavoritesQuery() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => readJson<{ href: string; label: string }[]>("/api/favorites"),
  });
}

export function useCustomersQuery() {
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => readJson<{ id: string; name: string; email: string; plan: string; spend: number; status: string }[]>("/api/customers"),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (page: { href: string; label: string }) => {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(page),
      });
      if (!response.ok) throw new Error("Failed to update favorites");
      return response.json() as Promise<{ href: string; label: string }[]>;
    },
    onSuccess: (data) => queryClient.setQueryData(["favorites"], data),
  });
}
