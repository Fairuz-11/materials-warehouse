type BadgeVariant =
  | "default"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "accent"
  | "muted";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] border-[var(--color-neutral-300)]",
  muted:
    "bg-[var(--color-neutral-100)] text-[var(--color-text-muted)] border-[var(--color-neutral-200)]",
  success:
    "bg-[var(--color-success-50)] text-[var(--color-success-700)] border-[var(--color-success-100)]",
  danger:
    "bg-[var(--color-danger-50)] text-[var(--color-danger-700)] border-[var(--color-danger-100)]",
  warning:
    "bg-[var(--color-warning-50)] text-[var(--color-warning-600)] border-[var(--color-warning-100)]",
  info: "bg-[var(--color-info-50)] text-[var(--color-info-700)] border-[var(--color-info-100)]",
  accent:
    "bg-[var(--color-accent-50)] text-[var(--color-accent-700)] border-[var(--color-accent-100)]",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-[var(--color-neutral-500)]",
  muted: "bg-[var(--color-neutral-400)]",
  success: "bg-[var(--color-success-500)]",
  danger: "bg-[var(--color-danger-500)]",
  warning: "bg-[var(--color-warning-500)]",
  info: "bg-[var(--color-info-500)]",
  accent: "bg-[var(--color-accent-500)]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-1.5 py-0.5 text-[11px] gap-1",
  md: "px-2 py-0.5 text-xs gap-1.5",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center font-medium rounded-[var(--radius-sm)] border",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={[
            "shrink-0 rounded-full",
            size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5",
            dotColors[variant],
          ].join(" ")}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
