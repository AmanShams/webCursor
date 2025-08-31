import Link from "next/link";
import { CodeXml } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserButton from "@/features/auth/components/user-button";

export const Header = () => {
  return (
    <header className=" absolute top-0 z-50 w-full">
      <div className="flex items-center justify-center w-full">
        <div
          className="
          flex items-center justify-between
          bg-white/90 dark:bg-zinc-900/90
          backdrop-blur-md
          border-b
          border-zinc-200 dark:border-zinc-800
          w-full max-w-7xl
          rounded-b-lg
          px-6 py-3
          transition-all duration-300 ease-in-out
        "
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2">
            <CodeXml className="h-6 w-6" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-semibold tracking-wide text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/api"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors flex items-center gap-1"
            >
              API
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};
