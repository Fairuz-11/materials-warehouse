"use client";

import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";
import { MobileNav } from "./sidebar";

// Map path ke judul halaman
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/material": "Data Material",
  "/barang-masuk": "Barang Masuk",
  "/barang-keluar": "Barang Keluar",
  "/transaksi": "Riwayat Transaksi",
  "/laporan": "Laporan Persediaan",
  "/pengaturan": "Pengaturan",
};

function getPageTitle(pathname: string): string {
  // Cek exact match dulu
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Cek prefix match
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname.startsWith(path + "/")) return title;
  }
  return "Manajemen Gudang";
}

export function Header() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header
      role="banner"
      style={{
        height: "var(--header-height)",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
      className="sticky top-0 z-30 flex items-center gap-4 px-5 shrink-0"
    >
      {/* Mobile nav trigger */}
      <MobileNav />

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1 shrink-0">
        {/* Notifications */}
        <button
          aria-label="Notifikasi"
          className="relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)] transition-colors"
        >
          <Bell size={18} />
          {/* Unread indicator */}
          <span
            aria-hidden
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)]"
          />
        </button>

        {/* User menu */}
        <button
          aria-label="Menu pengguna"
          className="flex items-center gap-2 h-9 px-2 rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-100)] transition-colors"
        >
          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-neutral-200)] text-[var(--color-text-secondary)]">
            <User size={14} />
          </span>
          <span className="hidden sm:block text-xs font-medium text-[var(--color-text-primary)]">
            Admin
          </span>
        </button>
      </div>
    </header>
  );
}
