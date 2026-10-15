import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-5 md:p-6 max-w-[var(--content-max-width)] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
