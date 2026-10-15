"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  /** Ukuran visual input */
  inputSize?: "sm" | "md";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      leftAddon,
      rightAddon,
      inputSize = "md",
      id,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const hasError = Boolean(error);

    const heightClass = inputSize === "sm" ? "h-8 text-xs" : "h-9 text-sm";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
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

        <div className="relative flex items-center">
          {leftAddon && (
            <span className="absolute left-2.5 flex items-center text-[var(--color-text-muted)] pointer-events-none">
              {leftAddon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            className={[
              heightClass,
              "w-full rounded-[var(--radius-md)] border bg-[var(--color-surface)]",
              "text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]",
              "transition-colors duration-[var(--transition-fast)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-0 focus:border-[var(--color-accent)]",
              hasError
                ? "border-[var(--color-danger-500)] focus:ring-[var(--color-danger-500)]"
                : "border-[var(--color-border-strong)] hover:border-[var(--color-neutral-400)]",
              disabled
                ? "bg-[var(--color-neutral-100)] text-[var(--color-text-disabled)] cursor-not-allowed"
                : "",
              leftAddon ? "pl-8" : "pl-3",
              rightAddon ? "pr-8" : "pr-3",
              className,
            ].join(" ")}
            {...props}
          />

          {rightAddon && (
            <span className="absolute right-2.5 flex items-center text-[var(--color-text-muted)] pointer-events-none">
              {rightAddon}
            </span>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-xs text-[var(--color-danger-600)]"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-xs text-[var(--color-text-muted)]"
          >
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
