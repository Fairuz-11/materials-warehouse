"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  description?: string;
}

interface ToastContextValue {
  toast: (opts: Omit<Toast, "id">) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  warning: (message: string, description?: string) => void;
  info: (message: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info: <Info size={16} />,
};

const variantStyles: Record<ToastVariant, string> = {
  success: "text-[var(--color-success-700)] bg-[var(--color-success-50)] border-[var(--color-success-100)]",
  error: "text-[var(--color-danger-700)] bg-[var(--color-danger-50)] border-[var(--color-danger-100)]",
  warning: "text-[var(--color-warning-600)] bg-[var(--color-warning-50)] border-[var(--color-warning-100)]",
  info: "text-[var(--color-info-700)] bg-[var(--color-info-50)] border-[var(--color-info-100)]",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (opts: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev.slice(-4), { ...opts, id }]);
      setTimeout(() => removeToast(id), 4500);
    },
    [removeToast],
  );

  const ctx: ToastContextValue = {
    toast: addToast,
    success: (message, description) =>
      addToast({ variant: "success", message, description }),
    error: (message, description) =>
      addToast({ variant: "error", message, description }),
    warning: (message, description) =>
      addToast({ variant: "warning", message, description }),
    info: (message, description) =>
      addToast({ variant: "info", message, description }),
  };

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      {/* Toast Container */}
      <div
        aria-live="assertive"
        aria-atomic="false"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={[
              "flex items-start gap-3 px-4 py-3 rounded-[var(--radius-lg)]",
              "border shadow-[var(--shadow-md)] pointer-events-auto",
              "animate-in slide-in-from-right-4",
              variantStyles[t.variant],
            ].join(" ")}
          >
            <span className="shrink-0 mt-0.5">{icons[t.variant]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug">{t.message}</p>
              {t.description && (
                <p className="mt-0.5 text-xs opacity-80">{t.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Tutup notifikasi"
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
