import {
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
} from "lucide-react";
import { StatCard } from "@/components/ui/card";

// Placeholder data — akan diganti dengan query Prisma
const stats = [
  {
    label: "Total Material",
    value: "0",
    subtext: "jenis material terdaftar",
    icon: <Package size={18} />,
  },
  {
    label: "Barang Masuk",
    value: "0",
    subtext: "transaksi bulan ini",
    icon: <ArrowDownToLine size={18} />,
  },
  {
    label: "Barang Keluar",
    value: "0",
    subtext: "transaksi bulan ini",
    icon: <ArrowUpFromLine size={18} />,
  },
  {
    label: "Stok Menipis",
    value: "0",
    subtext: "di bawah stok minimum",
    icon: <AlertTriangle size={18} />,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Ringkasan Gudang
        </h2>
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
          Ikhtisar data persediaan material konstruksi
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            subtext={stat.subtext}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Placeholder content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
            Aktivitas Terbaru
          </h3>
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[var(--color-text-muted)]">
              Belum ada transaksi — database belum terhubung
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
            Stok Kritis
          </h3>
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[var(--color-text-muted)]">Tidak ada</p>
          </div>
        </div>
      </div>
    </div>
  );
}
