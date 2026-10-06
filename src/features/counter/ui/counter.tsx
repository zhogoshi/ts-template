"use client";

import { Button, toast } from "@hogoshi/ui";
import { useCounterQuery, useIncrementCounter } from "../api/counter";

export function Counter() {
  const counter = useCounterQuery();
  const increment = useIncrementCounter();
  const count = counter.data?.count ?? 0;

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="primary"
        disabled={increment.isPending}
        onClick={() =>
          increment.mutate(undefined, {
            onSuccess: (data) => toast("Counted", { description: `The counter is now ${data.count}.` }),
          })
        }
      >
        Count
      </Button>
      <p className="text-fg text-sm">{counter.isLoading ? "…" : count}</p>
    </div>
  );
}
