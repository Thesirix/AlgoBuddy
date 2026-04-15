import { useStore } from "@/store/useStore";
import { connectWallet, disconnectWallet, shortenAddress } from "@/lib/wallet-service";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function ConnectWalletButton({ variant = "default" }: { variant?: "default" | "hero" }) {
  const { walletAddress, isConnecting, setWalletAddress, setIsConnecting } = useStore();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      toast.success("Wallet connected!");
    } catch (e: any) {
      if (e?.message?.includes("cancelled")) {
        toast.info("Connection cancelled");
      } else {
        toast.error("Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    setWalletAddress(null);
    toast.success("Wallet disconnected");
  };

  if (walletAddress) {
    return (
      <button
        onClick={handleDisconnect}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-card-foreground transition-all hover:bg-muted"
      >
        <Wallet className="h-4 w-4 text-primary" />
        {shortenAddress(walletAddress)}
        <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    );
  }

  const isHero = variant === "hero";

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all disabled:opacity-60 ${
        isHero
          ? "gradient-primary text-primary-foreground shadow-soft text-base hover:opacity-90"
          : "gradient-primary text-primary-foreground shadow-soft text-sm hover:opacity-90"
      }`}
    >
      {isConnecting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wallet className="h-4 w-4" />
      )}
      {isConnecting ? "Connecting..." : "Connect Pera Wallet"}
    </button>
  );
}
