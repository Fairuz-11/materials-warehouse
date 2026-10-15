interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Padding preset */
  padding?: "none" | "sm" | "md" | "lg";
  as?: "div" | "section" | "article";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  children,
  className = "",
  padding = "md",
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={[
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "rounded-[var(--radius-lg)] shadow-[var(--shadow-xs)]",
        paddingStyles[padding],
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

// ─── Card Header ──────────────────────────────────────────────────────────────
interface CardHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function CardHeader({
  title,
  description,
  actions,
  className = "",
}: CardHeaderProps) {
  return (
    <div
      className={[
        "flex items-start justify-between gap-4",
        "pb-4 mb-4 border-b border-[var(--color-border)]",
        className,
      ].join(" ")}
    >
      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
          {title}
        </h2>
        {description && (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// ─── Stat Card (for dashboard metrics) ───────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  className?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  icon,
  trend,
  className = "",
}: StatCardProps) {
  const trendColor = {
    up: "text-[var(--color-success-600)]",
    down: "text-[var(--color-danger-600)]",
    neutral: "text-[var(--color-text-muted)]",
  };

  return (
    <div
      className={[
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "rounded-[var(--radius-lg)] shadow-[var(--shadow-xs)] p-5",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            {label}
          </p>
          <p className="mt-1.5 text-2xl font-semibold text-[var(--color-text-primary)] leading-none tabular-nums">
            {value}
          </p>
          {(subtext || trend) && (
            <div className="mt-2 flex items-center gap-2">
              {trend && (
                <span
                  className={[
                    "text-xs font-medium",
                    trendColor[trend.direction],
                  ].join(" ")}
                >
                  {trend.value}
                </span>
              )}
              {subtext && (
                <span className="text-xs text-[var(--color-text-muted)]">
                  {subtext}
                </span>
              )}
            </div>
          )}
        </div>
        {icon && (
          <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)]">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
