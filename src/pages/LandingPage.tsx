import { motion } from "framer-motion";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Zap, TrendingUp, Users, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Group Wallets",
    description: "Create shared wallets with friends, roommates, or travel buddies in seconds.",
  },
  {
    icon: Shield,
    title: "Fair Splitting",
    description: "Equal or custom splits with transparent tracking. Everyone sees what they owe.",
  },
  {
    icon: Zap,
    title: "Auto Settlement",
    description: "Smart contracts handle settlements automatically on your chosen cycle.",
  },
  {
    icon: TrendingUp,
    title: "Yield on Idle Funds",
    description: "Pooled funds earn yield while waiting. Your money works even when idle.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
  const { walletAddress } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (walletAddress) navigate("/dashboard");
  }, [walletAddress, navigate]);

  return (
    <div className="gradient-hero min-h-screen">
      {/* Hero */}
      <section className="container mx-auto flex flex-col items-center px-4 pb-20 pt-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Built on Algorand
          </div>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Smart shared wallet
            <br />
            <span className="text-gradient">for groups</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Split expenses, pool funds, and settle up automatically.
            AlgoBuddy makes managing group money simple, fair, and transparent.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ConnectWalletButton variant="hero" />
            <a
              href="#features"
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Floating visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="gradient-card rounded-2xl border border-border p-8 shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-sm text-muted-foreground">Weekend Trip Fund</p>
                <p className="font-display text-3xl font-bold text-foreground">$450.00</p>
              </div>
              <div className="gradient-primary rounded-xl p-3">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {["Alice", "Bob", "Charlie"].map((name, i) => (
                <div key={name} className="rounded-lg bg-muted/50 p-3 text-center">
                  <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                    {name[0]}
                  </div>
                  <p className="text-xs font-medium text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">${[200, 150, 100][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              className="gradient-card rounded-2xl border border-border p-6 shadow-card transition-shadow hover:shadow-soft"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
