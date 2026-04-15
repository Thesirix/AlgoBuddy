import { useState } from "react";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import type { BuddyWallet } from "@/lib/mock-data";

export default function CreateWallet() {
  const { walletAddress, addWallet } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<string[]>([""]);
  const [splitType, setSplitType] = useState<"equal" | "custom">("equal");
  const [cycle, setCycle] = useState<"weekly" | "monthly">("monthly");
  const [loading, setLoading] = useState(false);

  if (!walletAddress) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Enter a wallet name");
    const validParticipants = participants.filter((p) => p.trim());
    if (validParticipants.length === 0) return toast.error("Add at least one participant");

    setLoading(true);
    // Simulate contract creation
    await new Promise((r) => setTimeout(r, 1500));

    const wallet: BuddyWallet = {
      id: `bw-${Date.now()}`,
      name: name.trim(),
      members: [
        { address: walletAddress, name: "You" },
        ...validParticipants.map((a) => ({ address: a, name: a.slice(0, 8) })),
      ],
      splitType,
      settlementCycle: cycle,
      balance: 0,
      expenses: [],
      deposits: [],
      createdAt: new Date().toISOString().split("T")[0],
    };

    addWallet(wallet);
    toast.success("Buddy Wallet created!");
    navigate(`/wallet/${wallet.id}`);
    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="mb-2 font-display text-3xl font-bold text-foreground">Create Buddy Wallet</h1>
        <p className="mb-8 text-sm text-muted-foreground">Set up a new shared wallet for your group</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Wallet Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weekend Trip Fund"
              className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Participants */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Participants</label>
            <div className="space-y-2">
              {participants.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={p}
                    onChange={(e) => {
                      const next = [...participants];
                      next[i] = e.target.value;
                      setParticipants(next);
                    }}
                    placeholder="Algorand wallet address"
                    className="flex-1 rounded-lg border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {participants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setParticipants(participants.filter((_, j) => j !== i))}
                      className="rounded-lg p-2.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setParticipants([...participants, ""])}
              className="mt-2 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Plus className="h-3.5 w-3.5" /> Add participant
            </button>
          </div>

          {/* Split Type */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Split Type</label>
            <div className="flex gap-3">
              {(["equal", "custom"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSplitType(t)}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    splitType === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Settlement Cycle */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Settlement Cycle</label>
            <div className="flex gap-3">
              {(["weekly", "monthly"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCycle(c)}
                  className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                    cycle === c
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-input bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="gradient-primary w-full rounded-lg py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating Smart Contract..." : "Create Buddy Wallet"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
