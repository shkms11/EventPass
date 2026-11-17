import {
  CalendarRange,
  CircleDollarSign,
  Ticket,
  TrendingUp,
} from "lucide-react";
import type { DashboardMetric } from "../../types/admin-dashboard";

const iconMap = {
  revenue: CircleDollarSign,
  tickets: Ticket,
  events: CalendarRange,
  conversion: TrendingUp,
} as const;

interface MetricCardProps {
  metric: DashboardMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = metric.key ? iconMap[metric.key] : TrendingUp;
  const deltaPositive = (metric.delta ?? "").startsWith("+");

  return (
    <article
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        padding: 20,
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: 12,
            background: "#eef2ff",
            color: "#4338ca",
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "6px 8px",
            background: deltaPositive ? "#e8fdf3" : "#fef3c7",
            color: deltaPositive ? "#126b3d" : "#92400e",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {metric.delta ?? "New"}
        </span>
      </div>

      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {metric.label}
      </p>
      <h2
        style={{
          margin: "10px 0 6px",
          fontSize: 32,
          lineHeight: 1.1,
          letterSpacing: -0.05,
        }}
      >
        {metric.value}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          color: "#6b7280",
        }}
      >
        {metric.helper ?? "Updated today"}
      </p>
    </article>
  );
}
