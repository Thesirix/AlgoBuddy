import { create } from "zustand";
import { BuddyWallet, Expense, MOCK_WALLETS } from "@/lib/mock-data";

interface AppState {
  walletAddress: string | null;
  isConnecting: boolean;
  wallets: BuddyWallet[];
  darkMode: boolean;

  setWalletAddress: (address: string | null) => void;
  setIsConnecting: (v: boolean) => void;
  toggleDarkMode: () => void;

  addWallet: (wallet: BuddyWallet) => void;
  addExpense: (walletId: string, expense: Expense) => void;
  deposit: (walletId: string, address: string, amount: number) => void;
}

export const useStore = create<AppState>((set) => ({
  walletAddress: null,
  isConnecting: false,
  wallets: MOCK_WALLETS,
  darkMode: false,

  setWalletAddress: (address) => set({ walletAddress: address }),
  setIsConnecting: (v) => set({ isConnecting: v }),
  toggleDarkMode: () =>
    set((s) => {
      const next = !s.darkMode;
      document.documentElement.classList.toggle("dark", next);
      return { darkMode: next };
    }),

  addWallet: (wallet) => set((s) => ({ wallets: [...s.wallets, wallet] })),
  addExpense: (walletId, expense) =>
    set((s) => ({
      wallets: s.wallets.map((w) =>
        w.id === walletId ? { ...w, expenses: [...w.expenses, expense] } : w
      ),
    })),
  deposit: (walletId, address, amount) =>
    set((s) => ({
      wallets: s.wallets.map((w) =>
        w.id === walletId
          ? {
              ...w,
              balance: w.balance + amount,
              deposits: [...w.deposits, { address, amount, date: new Date().toISOString().split("T")[0] }],
            }
          : w
      ),
    })),
}));
