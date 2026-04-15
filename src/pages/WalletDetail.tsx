import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { signMockTransaction } from "@/lib/wallet-service";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import {
  ArrowLeft,
  Plus,
  Download,
  Zap,
  Users,
  Receipt,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function WalletDetail() {
  const { id } = useParams<{ id: string }>();
  const { wallets, walletAddress, deposit } = useStore();
  const navigate = useNavigate();
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [depositLoading, setDepositLoading] = useState(false);
  const [settleLoading, setSettleLoading] = useState(false);
  const [tab, setTab] = useState<"expenses" | "activity">("expenses");

  const wallet = wallets.find((w) => w.id === id);

  const netBalances = useMemo(() => {
    if (!wallet) return {};
    const balances: Record<string, number> = {};
    wallet.members.forEach((m) => (balances[m.address] = 0));
    wallet.expenses.forEach((e) => {
      const share = e.amount / e.splitBetween.length;
      e.splitBetween.forEach((addr) => {
        if (addr === e.paidBy) {
          balances[addr] = (balances[addr] || 0) + (e.amount - share);
        } else {
          balances[addr] = (balances[addr] || 0) - share;
        }
      });
    });
    return balances;
  }, [wallet]);

  const fairnessScore = useMemo(() => {
    const vals = Object.values(netBalances);
    if (vals.length === 0) return 100;
    const maxImbalance = Math.max(...vals.map(Math.abs));
    return Math.max(0, Math.round(100 - maxImbalance * 0.5));
  }, [netBalances]);

  if (!walletAddress) { navigate("/"); return null; }
  if (!wallet) { navigate("/dashboard"); return null; }

  const netBalances = useMemo(() => {
    const balances: Record<string, number> = {};
    wallet.members.forEach((m) => (balances[m.address] = 0));
    wallet.expenses.forEach((e) => {
      const share = e.amount / e.splitBetween.length;
      e.splitBetween.forEach((addr) => {
        if (addr === e.paidBy) {
          balances[addr] = (balances[addr] || 0) + (e.amount - share);
        } else {
          balances[addr] = (balances[addr] || 0) - share;
        }
      });
    });
    return balances;
  }, [wallet]);

  const fairnessScore = useMemo(() => {
    const vals = Object.values(netBalances);
    if (vals.length === 0) return 100;
    const maxImbalance = Math.max(...vals.map(Math.abs));
    return Math.max(0, Math.round(100 - maxImbalance * 0.5));
  }, [netBalances]);

  const handleDeposit = async () => {
    setDepositLoading(true);
    try {
      await signMockTransaction("deposit", 50);
      deposit(wallet.id, walletAddress, 50);
      toast.success("Deposited $50 USDCa!");
    } catch {
      toast.error("Deposit failed");
    }
    setDepositLoading(false);
  };

  const handleSettle = async () => {
    setSettleLoading(true);
    try {
      await signMockTransaction("settlement", 0);
      toast.success("Settlement triggered!");
    } catch {
      toast.error("Settlement failed");
    }
    setSettleLoading(false);
  };

  const allActivity = [
    ...wallet.deposits.map((d) => ({ type: "deposit" as const, date: d.date, desc: `${d.address} deposited $${d.amount}`, amount: d.amount })),
    ...wallet.expenses.map((e) => ({ type: "expense" as const, date: e.date, desc: `${e.description} — paid by ${e.paidBy}`, amount: -e.amount })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Back */}
        <button onClick={() => navigate("/dashboard")} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">{wallet.name}</h1>
            <p className="text-sm text-muted-foreground">{wallet.members.length} members · {wallet.splitType} split · {wallet.settlementCycle}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowExpenseModal(true)} className="gradient-primary flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
              <Plus className="h-4 w-4" /> Add Expense
            </button>
            <button onClick={handleDeposit} disabled={depositLoading} className="flex items-center gap-1.5 rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-60">
              <Download className="h-4 w-4" /> {depositLoading ? "..." : "Deposit"}
            </button>
            <button onClick={handleSettle} disabled={settleLoading} className="flex items-center gap-1.5 rounded-lg border border-accent bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20 disabled:opacity-60">
              <Zap className="h-4 w-4" /> {settleLoading ? "..." : "Settle"}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid gap-4 sm:grid-cols-4">
          <div className="gradient-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="h-4 w-4" /><span className="text-xs">Balance</span></div>
            <p className="mt-1 font-display text-xl font-bold text-foreground">${wallet.balance.toFixed(2)}</p>
          </div>
          <div className="gradient-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground"><Receipt className="h-4 w-4" /><span className="text-xs">Expenses</span></div>
            <p className="mt-1 font-display text-xl font-bold text-foreground">{wallet.expenses.length}</p>
          </div>
          <div className="gradient-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" /><span className="text-xs">Members</span></div>
            <p className="mt-1 font-display text-xl font-bold text-foreground">{wallet.members.length}</p>
          </div>
          <div className="gradient-card rounded-xl border border-border p-4 shadow-card">
            <div className="flex items-center gap-2 text-muted-foreground"><Zap className="h-4 w-4" /><span className="text-xs">Fairness</span></div>
            <div className="mt-1 flex items-center gap-2">
              <p className="font-display text-xl font-bold text-foreground">{fairnessScore}%</p>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div className="h-2 rounded-full gradient-primary transition-all" style={{ width: `${fairnessScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Members & Balances */}
        <div className="mb-6 gradient-card rounded-2xl border border-border p-5 shadow-card">
          <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Members & Net Balances</h3>
          <div className="space-y-2">
            {wallet.members.map((m) => {
              const bal = netBalances[m.address] ?? 0;
              return (
                <div key={m.address} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                      {m.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.address}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${bal >= 0 ? "text-primary" : "text-destructive"}`}>
                    {bal >= 0 ? "+" : ""}${bal.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 rounded-lg bg-muted p-1">
          {(["expenses", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "expenses" && (
          <div className="space-y-2">
            {wallet.expenses.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No expenses yet</p>
            )}
            {wallet.expenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                    {e.category.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{e.description}</p>
                    <p className="text-xs text-muted-foreground">Paid by {wallet.members.find((m) => m.address === e.paidBy)?.name ?? e.paidBy} · {e.date}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground">${e.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "activity" && (
          <div className="space-y-2">
            {allActivity.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No activity yet</p>
            )}
            {allActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.type === "deposit" ? "bg-primary/10" : "bg-destructive/10"}`}>
                    {a.type === "deposit" ? <Download className="h-4 w-4 text-primary" /> : <Receipt className="h-4 w-4 text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.desc}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${a.amount >= 0 ? "text-primary" : "text-destructive"}`}>
                  {a.amount >= 0 ? "+" : ""}${Math.abs(a.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {showExpenseModal && (
        <AddExpenseModal walletId={wallet.id} members={wallet.members} onClose={() => setShowExpenseModal(false)} />
      )}
    </div>
  );
}
