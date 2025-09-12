import { NAV_LINKS } from "@/constants/constants";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          AINZBOT
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
