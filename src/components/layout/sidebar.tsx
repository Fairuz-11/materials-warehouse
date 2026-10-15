"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  ScrollText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Warehouse,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Data Material",
    href: "/material",
    icon: <Package size={18} />,
  },
  {
    label: "Barang Masuk",
    href: "/barang-masuk",
    icon: <ArrowDownToLine size={18} />,
  },
  {
    label: "Barang Keluar",
    href: "/barang-keluar",
    icon: <ArrowUpFromLine size={18} />,
  },
  {
    label: "Riwayat Transaksi",
    href: "/transaksi",
    icon: <ScrollText size={18} />,
  },
  {
    label: "Laporan",
    href: "/laporan",
    icon: <BarChart3 size={18} />,
  },
  {
    label: "Pengaturan",
    href: "/pengaturan",
    icon: <Settings size={18} />,
  },
];

// ─── Desktop Sidebar ──────────────────────────────────────────────────────────
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      aria-label="Navigasi utama"
      style={{
        width: collapsed
          ? "var(--sidebar-width-collapsed)"
          : "var(--sidebar-width)",
        backgroundColor: "var(--color-sidebar-bg)",
        borderRight: "1px solid var(--color-sidebar-border)",
      }}
      className="hidden lg:flex flex-col shrink-0 h-screen sticky top-0 transition-[width] duration-300 ease-in-out overflow-hidden"
    >
      {/* Logo */}
      <div
        style={{ height: "var(--header-height)", borderBottom: "1px solid var(--color-sidebar-border)" }}
        className="flex items-center gap-3 px-4 shrink-0"
      >
        <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white">
          <Warehouse size={16} />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p
              className="text-sm font-semibold leading-none truncate"
              style={{ color: "var(--color-sidebar-text)" }}
            >
              MatGudang
            </p>
            <p
              className="text-[11px] leading-none mt-1 truncate"
              style={{ color: "var(--color-sidebar-text-muted)" }}
            >
              Manajemen Material
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2">
        <ul className="space-y-0.5" role="list">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    backgroundColor: isActive
                      ? "var(--color-sidebar-active)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-sidebar-accent)"
                      : "var(--color-sidebar-text)",
                  }}
                  className={[
                    "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]",
                    "text-sm font-medium transition-colors duration-[var(--transition-fast)]",
                    "hover:bg-[var(--color-sidebar-hover)]",
                    collapsed ? "justify-center" : "",
                  ].join(" ")}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div
        style={{ borderTop: "1px solid var(--color-sidebar-border)" }}
        className="shrink-0 p-2"
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
          aria-label={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
          style={{ color: "var(--color-sidebar-text-muted)" }}
          className={[
            "w-full flex items-center px-3 py-2 rounded-[var(--radius-md)] text-xs",
            "hover:bg-[var(--color-sidebar-hover)] hover:text-[var(--color-sidebar-text)]",
            "transition-colors duration-[var(--transition-fast)]",
            collapsed ? "justify-center" : "gap-2",
          ].join(" ")}
        >
          {collapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span>Perkecil</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Buka menu navigasi"
        className="lg:hidden flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        style={{ backgroundColor: "var(--color-sidebar-bg)" }}
        className={[
          "fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width)] flex flex-col",
          "transition-transform duration-300 ease-in-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        aria-label="Navigasi mobile"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          style={{
            height: "var(--header-height)",
            borderBottom: "1px solid var(--color-sidebar-border)",
          }}
          className="flex items-center justify-between px-4 shrink-0"
        >
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white">
              <Warehouse size={16} />
            </span>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--color-sidebar-text)" }}
            >
              MatGudang
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
            style={{ color: "var(--color-sidebar-text-muted)" }}
            className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)] hover:bg-[var(--color-sidebar-hover)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="space-y-0.5" role="list">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      backgroundColor: isActive
                        ? "var(--color-sidebar-active)"
                        : "transparent",
                      color: isActive
                        ? "var(--color-sidebar-accent)"
                        : "var(--color-sidebar-text)",
                    }}
                    className="flex items-center gap-3 px-3 py-3 rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-sidebar-hover)] transition-colors"
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
