"use client";

import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      options,
      placeholder,
      id,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-medium text-[var(--color-text-primary)] select-none"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--color-danger-600)]" aria-hidden>
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={hasError}
            className={[
              "h-9 w-full rounded-[var(--radius-md)] border text-sm appearance-none",
              "bg-[var(--color-surface)] text-[var(--color-text-primary)]",
              "pl-3 pr-8",
              "transition-colors duration-[var(--transition-fast)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
              hasError
                ? "border-[var(--color-danger-500)] focus:ring-[var(--color-danger-500)]"
                : "border-[var(--color-border-strong)] hover:border-[var(--color-neutral-400)]",
              disabled
                ? "bg-[var(--color-neutral-100)] text-[var(--color-text-disabled)] cursor-not-allowed"
                : "cursor-pointer",
              className,
            ].join(" ")}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
          />
        </div>

        {error && (
          <p role="alert" className="text-xs text-[var(--color-danger-600)]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
