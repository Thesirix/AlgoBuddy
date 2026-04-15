import { useState } from "react";
import { useStore } from "@/store/useStore";
import { CATEGORIES } from "@/lib/mock-data";
import type { Expense } from "@/lib/mock-data";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  walletId: string;
  members: { address: string; name: string }[];
  onClose: () => void;
}

export function AddExpenseModal({ walletId, members, onClose }: Props) {
  const { addExpense } = useStore();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState(members[0]?.address ?? "");
  const [splitBetween, setSplitBetween] = useState<string[]>(members.map((m) => m.address));
  const [category, setCategory] = useState("Other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return toast.error("Fill in all fields");

    const expense: Expense = {
      id: `e-${Date.now()}`,
      description,
      amount: parseFloat(amount),
      paidBy,
      splitBetween,
      category,
      date: new Date().toISOString().split("T")[0],
    };

    addExpense(walletId, expense);
    toast.success("Expense added!");
    onClose();
  };

  const toggleMember = (addr: string) => {
    setSplitBetween((prev) =>
      prev.includes(addr) ? prev.filter((a) => a !== addr) : [...prev, addr]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={onClose}>
      <div
        className="gradient-card mx-4 w-full max-w-md animate-scale-in rounded-2xl border border-border p-6 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">Add Expense</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What was it for?"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Amount (USDCa)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Paid by</label>
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {members.map((m) => (
                <option key={m.address} value={m.address}>{m.name} ({m.address})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Split between</label>
            <div className="flex flex-wrap gap-2">
              {members.map((m) => (
                <button
                  key={m.address}
                  type="button"
                  onClick={() => toggleMember(m.address)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    splitBetween.includes(m.address)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input text-muted-foreground"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="gradient-primary w-full rounded-lg py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
