"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { SearchModal } from "./searchModal";

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Crypto Scope Logo"
            width={132}
            height={40}
          />
        </Link>

        <nav>
          <Link
            href="/"
            className={cn("nav-link", {
              "is-active": pathname === "/",
              "is-home": true,
            })}
          >
            Home
          </Link>
            <SearchModal initialTrendingCoins={[]} />
          {/* <Button
            variant="ghost"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2"
          >
            <SearchIcon size={18} />
            <p>Search Modal</p>

            <kbd className="kbd ml-auto">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button> */}

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
