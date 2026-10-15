"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /** Lebar dialog — default md */
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  // Tutup saat klik backdrop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (e: MouseEvent) => {
      if (e.target === dialog) onClose();
    };
    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  // Tutup saat Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={[
        sizeStyles[size],
        "w-full m-auto",
        "rounded-[var(--radius-xl)] border border-[var(--color-border)]",
        "bg-[var(--color-surface)] shadow-[var(--shadow-lg)]",
        "p-0 backdrop:bg-black/40",
        // Prevent default browser dialog styling
        "open:flex open:flex-col",
      ].join(" ")}
      aria-labelledby="dialog-title"
      aria-describedby={description ? "dialog-description" : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-[var(--color-border)]">
        <div className="min-w-0">
          <h2
            id="dialog-title"
            className="text-base font-semibold text-[var(--color-text-primary)]"
          >
            {title}
          </h2>
          {description && (
            <p
              id="dialog-description"
              className="mt-1 text-xs text-[var(--color-text-muted)]"
            >
              {description}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="shrink-0 -mr-1 -mt-1"
        >
          <X size={16} />
        </Button>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-neutral-50)] rounded-b-[var(--radius-xl)]">
          {footer}
        </div>
      )}
    </dialog>
  );
}
