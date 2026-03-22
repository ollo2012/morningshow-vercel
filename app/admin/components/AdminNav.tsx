"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Announcements", href: "/admin/announcements" },
    { name: "Products", href: "/admin/products" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
      <div className="mt-4">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            Log Out
          </button>
      </div>
    </nav>
  );
}