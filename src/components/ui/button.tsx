"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-accent)] text-white border border-[var(--color-accent)]",
    "hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
    "active:bg-[var(--color-accent-800)]",
    "disabled:bg-[var(--color-neutral-300)] disabled:border-[var(--color-neutral-300)]",
    "disabled:text-[var(--color-text-disabled)]",
  ].join(" "),

  secondary: [
    "bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-strong)]",
    "hover:bg-[var(--color-neutral-100)] hover:border-[var(--color-neutral-400)]",
    "active:bg-[var(--color-neutral-200)]",
    "disabled:bg-[var(--color-neutral-100)] disabled:text-[var(--color-text-disabled)]",
    "disabled:border-[var(--color-border)]",
  ].join(" "),

  outline: [
    "bg-transparent text-[var(--color-accent-text)] border border-[var(--color-accent-600)]",
    "hover:bg-[var(--color-accent-subtle)]",
    "active:bg-[var(--color-accent-100)]",
    "disabled:opacity-50",
  ].join(" "),

  ghost: [
    "bg-transparent text-[var(--color-text-secondary)] border border-transparent",
    "hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]",
    "active:bg-[var(--color-neutral-200)]",
    "disabled:opacity-50",
  ].join(" "),

  danger: [
    "bg-[var(--color-danger-600)] text-white border border-[var(--color-danger-600)]",
    "hover:bg-[var(--color-danger-700)] hover:border-[var(--color-danger-700)]",
    "active:bg-[var(--color-danger-700)]",
    "disabled:opacity-50",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-7 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-10 px-5 text-sm gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "secondary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-medium rounded-[var(--radius-md)]",
          "transition-colors duration-[var(--transition-fast)]",
          "cursor-pointer select-none whitespace-nowrap",
          "disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
