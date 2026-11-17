import type { ReactNode } from "react";

interface DashboardPanelProps {
  children: ReactNode;
}

export function DashboardPanel({ children }: DashboardPanelProps) {
  return (
    <section
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      }}
    >
      {children}
    </section>
  );
}
