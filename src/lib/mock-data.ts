export interface Member {
  address: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  category: string;
  date: string;
}

export interface BuddyWallet {
  id: string;
  name: string;
  members: Member[];
  splitType: "equal" | "custom";
  customSplits?: Record<string, number>;
  settlementCycle: "weekly" | "monthly";
  balance: number;
  expenses: Expense[];
  deposits: { address: string; amount: number; date: string }[];
  createdAt: string;
}

export const MOCK_MEMBERS: Member[] = [
  { address: "ALGO1...X7KQ", name: "Alice" },
  { address: "ALGO2...M3PL", name: "Bob" },
  { address: "ALGO3...R9WN", name: "Charlie" },
];

export const MOCK_WALLETS: BuddyWallet[] = [
  {
    id: "bw-1",
    name: "Weekend Trip Fund",
    members: MOCK_MEMBERS.slice(0, 3),
    splitType: "equal",
    settlementCycle: "monthly",
    balance: 450.0,
    expenses: [
      { id: "e1", description: "Hotel booking", amount: 300, paidBy: "ALGO1...X7KQ", splitBetween: ["ALGO1...X7KQ", "ALGO2...M3PL", "ALGO3...R9WN"], category: "Travel", date: "2026-04-10" },
      { id: "e2", description: "Dinner", amount: 85, paidBy: "ALGO2...M3PL", splitBetween: ["ALGO1...X7KQ", "ALGO2...M3PL", "ALGO3...R9WN"], category: "Food", date: "2026-04-11" },
      { id: "e3", description: "Gas", amount: 45, paidBy: "ALGO3...R9WN", splitBetween: ["ALGO1...X7KQ", "ALGO3...R9WN"], category: "Transport", date: "2026-04-12" },
    ],
    deposits: [
      { address: "ALGO1...X7KQ", amount: 200, date: "2026-04-08" },
      { address: "ALGO2...M3PL", amount: 150, date: "2026-04-08" },
      { address: "ALGO3...R9WN", amount: 100, date: "2026-04-09" },
    ],
    createdAt: "2026-04-07",
  },
  {
    id: "bw-2",
    name: "Apartment Expenses",
    members: MOCK_MEMBERS.slice(0, 2),
    splitType: "custom",
    customSplits: { "ALGO1...X7KQ": 60, "ALGO2...M3PL": 40 },
    settlementCycle: "monthly",
    balance: 1200.0,
    expenses: [
      { id: "e4", description: "Rent", amount: 800, paidBy: "ALGO1...X7KQ", splitBetween: ["ALGO1...X7KQ", "ALGO2...M3PL"], category: "Housing", date: "2026-04-01" },
      { id: "e5", description: "Utilities", amount: 120, paidBy: "ALGO2...M3PL", splitBetween: ["ALGO1...X7KQ", "ALGO2...M3PL"], category: "Bills", date: "2026-04-05" },
    ],
    deposits: [
      { address: "ALGO1...X7KQ", amount: 700, date: "2026-04-01" },
      { address: "ALGO2...M3PL", amount: 500, date: "2026-04-01" },
    ],
    createdAt: "2026-03-28",
  },
];

export const CATEGORIES = ["Food", "Travel", "Transport", "Housing", "Bills", "Entertainment", "Shopping", "Other"];
