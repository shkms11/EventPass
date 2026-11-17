import { ArrowUpRight } from "lucide-react";
import {
  DEFAULT_CHANNEL_SUMMARIES,
  DEFAULT_DASHBOARD_METRICS,
  DEFAULT_PENDING_APPROVALS,
  DEFAULT_RECENT_BOOKINGS,
} from "../data/admin-dashboard";
import type { AdminDashboardProps } from "../types/admin-dashboard";
import { ChannelPerformance } from "./admin-dashboard/ChannelPerformance";
import { MetricCard } from "./admin-dashboard/MetricCard";
import { PendingApprovals } from "./admin-dashboard/PendingApprovals";
import { RecentBookings } from "./admin-dashboard/RecentBookings";

export type {
  AdminDashboardProps,
  BookingRecord,
  BookingStatus,
  ChannelSummary,
  DashboardMetric,
  PendingApproval,
} from "../types/admin-dashboard";

export function AdminDashboard({
  title = "Admin dashboard",
  stats,
  metrics,
  bookings,
  recentBookings,
  channels,
  performance,
}: AdminDashboardProps) {
  const metricCards = metrics ?? stats ?? DEFAULT_DASHBOARD_METRICS;
  const recentItems = bookings ?? recentBookings ?? DEFAULT_RECENT_BOOKINGS;
  const channelSummary = channels ?? performance ?? DEFAULT_CHANNEL_SUMMARIES;

  return (
    <div
      aria-label="Admin dashboard"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 24px 48px",
        background: "#f6f8fc",
        color: "#111827",
        fontFamily: 'Inter, "Segoe UI", sans-serif',
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: "24px 28px",
          boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b7280",
              fontWeight: 700,
            }}
          >
            Operations overview
          </p>
          <h1
            style={{
              margin: "8px 0 0",
              fontSize: 32,
              lineHeight: 1.2,
              letterSpacing: -0.04,
            }}
          >
            {title}
          </h1>
        </div>

        <button
          type="button"
          style={{
            border: "1px solid #d1d5db",
            background: "#f9fafb",
            color: "#111827",
            padding: "10px 16px",
            borderRadius: 12,
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Export report
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </header>

      <section
        aria-label="Performance metrics"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {metricCards.map((metric) => (
          <MetricCard key={`${metric.label}-${metric.value}`} metric={metric} />
        ))}
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
          gap: 18,
        }}
      >
        <RecentBookings bookings={recentItems} />
        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <ChannelPerformance channels={channelSummary} />
          <PendingApprovals approvals={DEFAULT_PENDING_APPROVALS} />
        </aside>
      </div>
    </div>
  );
}

export default AdminDashboard;
