// Table component set — optimized for enterprise data display.
// Supports desktop full-table and mobile card-list fallback via props.

interface TableProps {
  children: React.ReactNode;
  className?: string;
  /** Wrapper untuk enable horizontal scroll di layar kecil */
  scrollable?: boolean;
}

export function Table({ children, className = "", scrollable = true }: TableProps) {
  const inner = (
    <table
      className={["w-full text-sm border-collapse", className].join(" ")}
    >
      {children}
    </table>
  );

  if (scrollable) {
    return (
      <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
        {inner}
      </div>
    );
  }
  return inner;
}

// ─── Table Head ───────────────────────────────────────────────────────────────
export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-[var(--color-neutral-50)] border-b border-[var(--color-border)]">
      {children}
    </thead>
  );
}

// ─── Table Body ───────────────────────────────────────────────────────────────
export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="divide-y divide-[var(--color-border)]">{children}</tbody>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────
interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className = "", onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={[
        "transition-colors duration-[var(--transition-fast)]",
        onClick
          ? "cursor-pointer hover:bg-[var(--color-neutral-50)]"
          : "hover:bg-[var(--color-neutral-50)]",
        className,
      ].join(" ")}
    >
      {children}
    </tr>
  );
}

// ─── Table Header Cell ────────────────────────────────────────────────────────
interface ThProps {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  width?: string;
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | null;
  onSort?: () => void;
}

export function Th({
  children,
  className = "",
  align = "left",
  width,
  sortable,
  sortDirection,
  onSort,
}: ThProps) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <th
      scope="col"
      style={{ width }}
      onClick={sortable ? onSort : undefined}
      className={[
        "px-4 py-3 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider",
        "whitespace-nowrap select-none",
        alignClass,
        sortable
          ? "cursor-pointer hover:text-[var(--color-text-primary)]"
          : "",
        className,
      ].join(" ")}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-[var(--color-neutral-400)]">
            {sortDirection === "asc"
              ? "↑"
              : sortDirection === "desc"
                ? "↓"
                : "↕"}
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  );
}

// ─── Table Data Cell ──────────────────────────────────────────────────────────
interface TdProps {
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  muted?: boolean;
  mono?: boolean;
}

export function Td({
  children,
  className = "",
  align = "left",
  muted = false,
  mono = false,
}: TdProps) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <td
      className={[
        "px-4 py-3 align-middle",
        alignClass,
        muted ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-primary)]",
        mono ? "font-mono text-xs" : "",
        className,
      ].join(" ")}
    >
      {children}
    </td>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
interface TableEmptyProps {
  message?: string;
  description?: string;
  icon?: React.ReactNode;
  colSpan?: number;
}

export function TableEmpty({
  message = "Tidak ada data",
  description,
  icon,
  colSpan = 100,
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          {icon && (
            <span className="text-[var(--color-neutral-300)]">{icon}</span>
          )}
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            {message}
          </p>
          {description && (
            <p className="text-xs text-[var(--color-text-muted)]">
              {description}
            </p>
          )}
        </div>
      </td>
    </tr>
  );
}
