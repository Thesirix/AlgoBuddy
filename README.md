<div align="center">

<img src="public/favicon.ico" alt="AlgoBuddy Logo" width="64" height="64" />

# AlgoBuddy

**Smart shared wallets for groups, built on Algorand**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Algorand](https://img.shields.io/badge/Algorand-algosdk%20v3-00B4AB?style=flat-square&logo=algorand&logoColor=white)](https://algorand.com)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-MVP-F59E0B?style=flat-square)]()

---

*Split expenses. Pool funds. Settle automatically.*  
AlgoBuddy makes managing group money simple, fair, and transparent, powered by the Algorand blockchain.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Data Model](#data-model)
- [Pages & Components](#pages--components)
- [State Management](#state-management)
- [Blockchain Integration](#blockchain-integration)
- [Design System](#design-system)
- [Testing](#testing)
- [Roadmap](#roadmap)

---

## Overview

AlgoBuddy is a **web3 expense-sharing application** that lets groups create shared wallets on the Algorand blockchain. Whether you're splitting rent with roommates, tracking trip costs with friends, or managing club finances, AlgoBuddy handles the math, the tracking, and the settlement automatically.

> **MVP Note:** The current version uses mock transaction signing and in-memory state. On-chain smart contract integration is planned for the next milestone.

---

## Features

| Feature | Status |
|---|---|
| Connect Pera Wallet (Algorand) | ✅ Live |
| Create group "Buddy Wallets" | ✅ Live |
| Add & track expenses by category | ✅ Live |
| Equal or custom percentage splits | ✅ Live |
| Weekly / monthly settlement cycles | ✅ Live |
| Per-member net balance calculation | ✅ Live |
| Fairness score (0–100) | ✅ Live |
| Deposit USDCa tokens | ✅ Live (mock tx) |
| Manual settlement trigger | ✅ Live (mock tx) |
| Dark mode | ✅ Live |
| Activity feed | ✅ Live |
| On-chain smart contracts | 🔜 Planned |
| Real USDCa deposits & settlement | 🔜 Planned |
| Push notifications | 🔜 Planned |

---

## Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5.8 | Type safety |
| [Vite](https://vitejs.dev) | 5.4 | Build tool & dev server |
| [React Router](https://reactrouter.com) | 6.30 | Client-side routing |
| [Framer Motion](https://www.framer.com/motion) | 12.x | Animations & transitions |

### Styling
| Package | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com) | latest | Component primitives |
| [Radix UI](https://radix-ui.com) | various | Headless accessible components |
| [Lucide React](https://lucide.dev) | 1.8 | Icon library |

### State & Data
| Package | Version | Purpose |
|---|---|---|
| [Zustand](https://zustand-demo.pmnd.rs) | 5.0 | Global state management |
| [TanStack Query](https://tanstack.com/query) | 5.83 | Async data fetching & caching |
| [React Hook Form](https://react-hook-form.com) | 7.x | Form state management |
| [Zod](https://zod.dev) | 3.x | Schema validation |

### Blockchain
| Package | Version | Purpose |
|---|---|---|
| [algosdk](https://github.com/algorand/js-algorand-sdk) | 3.5 | Algorand SDK |
| [@perawallet/connect](https://github.com/perawallet/connect) | 1.5 | Pera Wallet integration |

### Dev & Testing
| Package | Version | Purpose |
|---|---|---|
| [Vitest](https://vitest.dev) | 3.x | Unit & integration tests |
| [Testing Library](https://testing-library.com) | 16.x | Component testing |
| [ESLint](https://eslint.org) | 9.x | Linting |

---

## Project Structure

```
AlgoBuddy/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── AddExpenseModal.tsx  # Expense creation modal
│   │   ├── ConnectWalletButton.tsx  # Pera Wallet connect/disconnect
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   ├── NavLink.tsx         # Active-aware nav link
│   │   └── ui/                 # ~40 shadcn/ui primitives
│   ├── hooks/
│   │   ├── use-mobile.tsx      # Responsive breakpoint hook
│   │   └── use-toast.ts        # Toast notification hook
│   ├── lib/
│   │   ├── mock-data.ts        # TypeScript interfaces + mock dataset
│   │   ├── wallet-service.ts   # Pera Wallet service layer
│   │   └── utils.ts            # Tailwind class merging utility
│   ├── pages/
│   │   ├── LandingPage.tsx     # Hero, features section
│   │   ├── Dashboard.tsx       # Wallet list + global stats
│   │   ├── CreateWallet.tsx    # New wallet form
│   │   ├── WalletDetail.tsx    # Expenses, balances, activity
│   │   └── NotFound.tsx        # 404 page
│   ├── store/
│   │   └── useStore.ts         # Zustand global store
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.tsx                 # Root component & route definitions
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles & CSS variables
├── components.json             # shadcn/ui config
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 or **Bun** ≥ 1.0
- A [Pera Wallet](https://perawallet.app) account (mobile or browser extension) for wallet connection

### Installation

```bash
# Clone the repository
git clone https://github.com/Thesirix/algobuddy.git
cd algobuddy

# Install dependencies (Bun recommended)
bun install

# Or with npm
npm install
```

### Development

```bash
# Start the dev server (http://localhost:5173)
bun run dev

# Or with npm
npm run dev
```

### Build

```bash
# Production build
bun run build

# Preview the production build locally
bun run preview
```

### Lint & Test

```bash
# Run linter
bun run lint

# Run tests
bun run test

# Watch mode
bun run test:watch
```

---

## Architecture

### Routing

AlgoBuddy uses React Router v6 with five client-side routes:

```
/              → LandingPage   (public, redirects to /dashboard if connected)
/dashboard     → Dashboard     (protected, redirects to / if not connected)
/create        → CreateWallet  (protected)
/wallet/:id    → WalletDetail  (protected)
*              → NotFound
```

Auth guarding is handled inline per page: if `walletAddress` is null, React Router's `useNavigate` redirects to `/`.

### Data Flow

```
Pera Wallet ──connect──▶ wallet-service.ts ──address──▶ Zustand Store
                                                              │
                                              ┌───────────────┼───────────────┐
                                              ▼               ▼               ▼
                                          Dashboard     WalletDetail    CreateWallet
                                              │               │
                                        wallets[]      expenses[], deposits[]
                                                               │
                                                         AddExpenseModal
```

All state lives in Zustand. There is no server or database. The app is fully client-side with mock data seeded at startup.

---

## Data Model

### `BuddyWallet`

```typescript
interface BuddyWallet {
  id: string;
  name: string;
  members: Member[];
  splitType: "equal" | "custom";
  customSplits?: Record<string, number>;  // address → percentage
  settlementCycle: "weekly" | "monthly";
  balance: number;                         // total pooled USDCa
  expenses: Expense[];
  deposits: { address: string; amount: number; date: string }[];
  createdAt: string;
}
```

### `Expense`

```typescript
interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;          // Algorand address
  splitBetween: string[];  // Algorand addresses
  category: string;        // Food | Travel | Transport | Housing | Bills | Entertainment | Shopping | Other
  date: string;            // ISO date YYYY-MM-DD
}
```

### `Member`

```typescript
interface Member {
  address: string;  // Algorand wallet address
  name: string;
}
```

---

## Pages & Components

### Pages

#### `LandingPage`
The public entry point. Features an animated hero section with a live wallet preview card, a four-feature grid (Group Wallets, Fair Splitting, Auto Settlement, Yield on Idle Funds), and a `ConnectWalletButton`. Automatically redirects to `/dashboard` once the user connects their wallet.

#### `Dashboard`
Protected page showing the user's connected address, total balance across all wallets, active wallet count, and a card grid of all Buddy Wallets. Each card links to its `WalletDetail`.

#### `CreateWallet`
Form page for creating a new Buddy Wallet. Accepts:
- Wallet name
- Participant Algorand addresses (dynamic list)
- Split type: equal or custom
- Settlement cycle: weekly or monthly

On submit, simulates a 1.5 s smart-contract creation delay, creates the wallet in the Zustand store, and navigates to the new wallet's detail page.

#### `WalletDetail`
The most feature-rich page. Displays:
- **Stats row:** balance, expense count, member count, fairness score
- **Members & Net Balances:** per-member net balance computed from all expenses (positive = owed to you, negative = you owe)
- **Expenses tab:** full expense list with category badge, payer, date, amount
- **Activity tab:** combined deposit + expense timeline sorted by date descending
- **Actions:** Add Expense (opens modal), Deposit $50 USDCa, Settle (both mock transactions)

**Fairness Score algorithm** (`src/pages/WalletDetail.tsx:47`):

```typescript
const fairnessScore = Math.max(0, Math.round(100 - maxImbalance * 0.5));
// maxImbalance = max absolute net balance across all members
// Score of 100 = perfectly balanced group
```

#### `AddExpenseModal`
A modal overlay for logging a new expense against a specific wallet. Fields: description, amount (USDCa), paid-by member (dropdown), split-between members (toggle chips), category (dropdown). Saves directly to the Zustand store on submit.

### Key Components

#### `ConnectWalletButton`
Wraps the Pera Wallet connect/disconnect flow. Shows a loading spinner during connection. Once connected, displays the shortened address and a logout icon. Supports a `hero` variant for the landing page CTA.

#### `Navbar`
Sticky top navigation with glassmorphism blur (`backdrop-blur-xl`). Shows the AlgoBuddy logo, a Dashboard link (only when connected), a dark mode toggle, and the `ConnectWalletButton`.

---

## State Management

The global Zustand store (`src/store/useStore.ts`) holds:

```typescript
interface AppState {
  // Wallet connection
  walletAddress: string | null;
  isConnecting: boolean;

  // App data
  wallets: BuddyWallet[];
  darkMode: boolean;

  // Actions
  setWalletAddress: (address: string | null) => void;
  setIsConnecting: (v: boolean) => void;
  toggleDarkMode: () => void;
  addWallet: (wallet: BuddyWallet) => void;
  addExpense: (walletId: string, expense: Expense) => void;
  deposit: (walletId: string, address: string, amount: number) => void;
}
```

State is seeded with `MOCK_WALLETS` from `lib/mock-data.ts`: two pre-populated wallets ("Weekend Trip Fund" and "Apartment Expenses") with members, expenses, and deposits to demonstrate the full UI.

---

## Blockchain Integration

### Pera Wallet (`src/lib/wallet-service.ts`)

AlgoBuddy uses the official Pera Wallet Connect SDK. The service layer is a thin singleton wrapper:

```typescript
connectWallet()      // Opens Pera modal, returns first account address
disconnectWallet()   // Disconnects the session
reconnectSession()   // Silently restores an existing session on page load
shortenAddress()     // "ABCDE...WXYZ" display format
signMockTransaction() // Simulates a 1.5s tx delay (deposit / settlement)
```

### Current Limitations (MVP)

- `signMockTransaction()` does not broadcast real transactions to the Algorand network. It returns a mock transaction ID after a 1.5 second delay.
- Wallet balances and deposits are stored in Zustand only, not on-chain.
- Smart contract ABIs and ARC-4 method calls are not yet implemented.

---

## Design System

AlgoBuddy uses a custom Tailwind theme built on top of shadcn/ui's CSS variable system.

### Color Palette

| Token | Light | Dark | Usage |
|---|---|---|---|
| `primary` | Teal `168 72% 40%` | Teal `168 72% 45%` | CTAs, active states, amounts |
| `accent` | Sky `199 80% 50%` | Sky `199 80% 55%` | Secondary actions, settle button |
| `background` | Near-white `150 20% 98%` | Deep navy `200 25% 7%` | Page background |
| `card` | White `0 0% 100%` | Dark card `200 22% 10%` | Card surfaces |
| `destructive` | Red `0 72% 55%` | N/A | Negative balances, errors |

### Custom Utilities

```css
.gradient-primary   /* Teal → Sky diagonal gradient for buttons & badges */
.gradient-hero      /* Soft hero background gradient */
.gradient-card      /* Subtle card surface gradient */
.shadow-card        /* Soft drop shadow for cards */
.shadow-soft        /* Button glow shadow */
.text-gradient      /* Gradient text for headings */
.font-display       /* Space Grotesk for headings & numbers */
```

### Typography

- **Display / Headings:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (400–700)
- **Body / UI:** [Inter](https://fonts.google.com/specimen/Inter) (300–800)

---

## Testing

Tests live in `src/test/` and are run with [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com).

```bash
# Single run
bun run test

# Watch mode
bun run test:watch
```

The test environment uses `jsdom` for DOM simulation. The setup file (`src/test/setup.ts`) imports `@testing-library/jest-dom` matchers.

---

## Roadmap

### v0.2 - On-Chain MVP
- [ ] Deploy Buddy Wallet smart contracts on Algorand Testnet (ARC-4)
- [ ] Real USDCa ASA deposits via algosdk transaction builder
- [ ] On-chain settlement execution
- [ ] Persist wallet state to local storage between sessions

### v0.3 - UX & Social
- [ ] Invite members via shareable link
- [ ] Push notifications for new expenses and settlement reminders
- [ ] Expense receipt photo upload (IPFS)
- [ ] Mobile-optimized responsive layout

### v1.0 - Production
- [ ] Mainnet deployment
- [ ] Multi-wallet support (Defly, Kibisis)
- [ ] Yield strategy integration (Folks Finance / Tinyman)
- [ ] Audit & security review

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your fork and open a Pull Request

---

## License

Distributed under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ on [Algorand](https://algorand.com)

</div>
