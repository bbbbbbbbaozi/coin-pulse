"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Coin Pulse's logo"
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

          <p className="text-purple-100">Search Modal</p>

          <Link
            href="/coins"
            className={cn("nav-link", {
              "is-active": pathname === "/coins",
              "is-home": false,
            })}
          >
            Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
