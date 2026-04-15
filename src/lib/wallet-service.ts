import { PeraWalletConnect } from "@perawallet/connect";

let peraWallet: PeraWalletConnect | null = null;

function getPeraWallet() {
  if (!peraWallet) {
    peraWallet = new PeraWalletConnect();
  }
  return peraWallet;
}

export async function connectWallet(): Promise<string> {
  const pera = getPeraWallet();
  const accounts = await pera.connect();
  pera.connector?.on("disconnect", () => {
    // handled by caller
  });
  return accounts[0];
}

export async function disconnectWallet(): Promise<void> {
  const pera = getPeraWallet();
  await pera.disconnect();
}

export async function reconnectSession(): Promise<string | null> {
  const pera = getPeraWallet();
  try {
    const accounts = await pera.reconnectSession();
    return accounts.length > 0 ? accounts[0] : null;
  } catch {
    return null;
  }
}

export function shortenAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Mock transaction signing for demo
export async function signMockTransaction(type: "deposit" | "settlement", amount: number): Promise<string> {
  await new Promise((r) => setTimeout(r, 1500));
  return `mock-tx-${type}-${Date.now()}`;
}
