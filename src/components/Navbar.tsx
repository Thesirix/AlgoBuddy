import { Link, useLocation } from "react-router-dom";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useStore } from "@/store/useStore";
import { Moon, Sun, Hexagon } from "lucide-react";

export function Navbar() {
  const { darkMode, toggleDarkMode, walletAddress } = useStore();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Hexagon className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">AlgoBuddy</span>
        </Link>

        <div className="flex items-center gap-3">
          {walletAddress && (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                to="/dashboard"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === "/dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <ConnectWalletButton />
        </div>
      </div>
    </nav>
  );
}
