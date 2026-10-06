"use client";

import { useEffect, useState } from "react";
import { Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogTitle, Input, Label, toast } from "@hogoshi/ui";

interface Card {
  id: string;
  brand: string;
  last4: string;
}

const STORAGE = "hogoshi-cards";
const PLANS = ["Pro", "Team"] as const;

function readCards() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE) ?? "") as Card[];
  } catch {
    return [{ id: "visa", brand: "Visa", last4: "4242" }];
  }
}

export function UpgradeDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [picked, setPicked] = useState("visa");
  const [plan, setPlan] = useState<(typeof PLANS)[number]>("Team");
  const [number, setNumber] = useState("");
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    if (!open) return;
    const stored = readCards();
    setCards(stored);
    setPicked(stored[0]?.id ?? "");
  }, [open]);

  const save = () => {
    const last4 = number.replace(/\D/g, "").slice(-4);
    if (last4.length < 4) {
      toast("Enter a card number");
      return;
    }
    const next = remember ? [...cards, { id: last4, brand: "Card", last4 }] : cards;
    if (remember) {
      localStorage.setItem(STORAGE, JSON.stringify(next));
      setCards(next);
      setPicked(last4);
    }
    setNumber("");
    toast("Card saved", { description: remember ? `•••• ${last4} stays on this device.` : "Used once." });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Upgrade</DialogTitle>
        <DialogDescription>A preview checkout. Nothing is charged.</DialogDescription>
        <div className="flex gap-2">
          {PLANS.map((item) => (
            <Button key={item} variant={plan === item ? "primary" : "secondary"} size="sm" onClick={() => setPlan(item)}>
              {item}
            </Button>
          ))}
        </div>
        <div className="grid gap-2">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              className="border-border hover:bg-bg-subtle flex items-center justify-between rounded-[var(--radius-md)] border px-3 py-2 text-sm"
              onClick={() => setPicked(card.id)}
            >
              <span>
                {card.brand} •••• {card.last4}
              </span>
              <span className="text-fg-muted text-xs">{picked === card.id ? "Selected" : "Use"}</span>
            </button>
          ))}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="card">New card</Label>
          <Input id="card" inputMode="numeric" placeholder="4242 4242 4242 4242" value={number} onChange={(event) => setNumber(event.target.value)} />
          <label className="text-fg-muted flex items-center gap-2 text-xs">
            <Checkbox checked={remember} onCheckedChange={(value) => setRemember(Boolean(value))} />
            Remember on this device
          </label>
          <Button size="sm" onClick={save}>
            Save card
          </Button>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            toast("Upgraded", { description: `${plan} is ready. No charge was made.` });
            onOpenChange(false);
          }}
        >
          Pay with {plan}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
