import { useStore } from "@/store/useStore";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { shortenAddress } from "@/lib/wallet-service";
import { motion } from "framer-motion";
import { Plus, Wallet, Users, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { walletAddress, wallets } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!walletAddress) navigate("/");
  }, [walletAddress, navigate]);

  if (!walletAddress) return null;

  const totalBalance = wallets.reduce((s, w) => s + w.balance, 0);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          </div>
          <Link
            to="/create"
            className="gradient-primary inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> Create Buddy Wallet
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="gradient-card rounded-2xl border border-border p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Wallet</p>
                <p className="font-mono text-sm font-medium text-foreground">{shortenAddress(walletAddress)}</p>
              </div>
            </div>
          </div>
          <div className="gradient-card rounded-2xl border border-border p-5 shadow-card">
            <p className="text-xs text-muted-foreground">Total Balance</p>
            <p className="font-display text-2xl font-bold text-foreground">${totalBalance.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">USDCa</p>
          </div>
          <div className="gradient-card rounded-2xl border border-border p-5 shadow-card">
            <p className="text-xs text-muted-foreground">Active Wallets</p>
            <p className="font-display text-2xl font-bold text-foreground">{wallets.length}</p>
            <p className="text-xs text-muted-foreground">buddy wallets</p>
          </div>
        </div>

        {/* Wallets List */}
        <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Your Buddy Wallets</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {wallets.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/wallet/${w.id}`}
                className="group gradient-card flex flex-col rounded-2xl border border-border p-5 shadow-card transition-shadow hover:shadow-soft"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{w.name}</h3>
                    <p className="text-sm text-muted-foreground">{w.members.length} members · {w.splitType} split</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="font-display text-xl font-bold text-foreground">${w.balance.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    View <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
