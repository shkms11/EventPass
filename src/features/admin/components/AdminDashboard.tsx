import {
  ArrowUpRight,
  CalendarRange,
  CircleDollarSign,
  RefreshCcw,
  Ticket,
  TrendingUp,
} from "lucide-react";

export type DashboardMetric = {
  key?: "revenue" | "tickets" | "events" | "conversion";
  label: string;
  value: string;
  delta?: string;
  helper?: string;
};

export type BookingStatus = "Paid" | "Pending" | "Refunded";

export type BookingRecord = {
  id: string;
  customer: string;
  event: string;
  date: string;
  amount: string;
  status: BookingStatus;
};

export type ChannelSummary = {
  name: string;
  value: string;
  share: number;
  change: string;
};

export interface AdminDashboardProps {
  title?: string;
  stats?: DashboardMetric[];
  metrics?: DashboardMetric[];
  bookings?: BookingRecord[];
  recentBookings?: BookingRecord[];
  channels?: ChannelSummary[];
  performance?: ChannelSummary[];
}

const defaultMetrics: DashboardMetric[] = [
  {
    key: "revenue",
    label: "Gross revenue",
    value: "$128.4K",
    delta: "+12.4%",
    helper: "vs last month",
  },
  {
    key: "tickets",
    label: "Tickets sold",
    value: "4,892",
    delta: "+8.1%",
    helper: "across 26 events",
  },
  {
    key: "events",
    label: "Active events",
    value: "18",
    delta: "+3",
    helper: "scheduled this week",
  },
  {
    key: "conversion",
    label: "Conversion rate",
    value: "7.8%",
    delta: "+1.2%",
    helper: "from checkout flow",
  },
];

const defaultBookings: BookingRecord[] = [
  {
    id: "EV-1048",
    customer: "Ava Patel",
    event: "Rooftop Sessions",
    date: "Jun 14",
    amount: "$224.00",
    status: "Paid",
  },
  {
    id: "EV-1042",
    customer: "Marcus Chen",
    event: "Long Table Supper Club",
    date: "Jun 15",
    amount: "$96.00",
    status: "Pending",
  },
  {
    id: "EV-1029",
    customer: "Isabella Gomez",
    event: "Color Outside the Lines",
    date: "Jun 16",
    amount: "$36.00",
    status: "Paid",
  },
  {
    id: "EV-1017",
    customer: "Noah Brooks",
    event: "Sunset Yoga Flow",
    date: "Jun 18",
    amount: "$28.00",
    status: "Refunded",
  },
];

const defaultChannels: ChannelSummary[] = [
  { name: "Direct", value: "42%", share: 42, change: "+6.3%" },
  { name: "Social", value: "26%", share: 26, change: "+3.1%" },
  { name: "Email", value: "19%", share: 19, change: "+1.7%" },
  { name: "Referral", value: "13%", share: 13, change: "-0.8%" },
];

const statusColors: Record<BookingStatus, { background: string; color: string }> = {
  Paid: { background: "#e8fdf3", color: "#126b3d" },
  Pending: { background: "#fff4dc", color: "#874d00" },
  Refunded: { background: "#fdeceb", color: "#9d2a2a" },
};

const iconMap = {
  revenue: CircleDollarSign,
  tickets: Ticket,
  events: CalendarRange,
  conversion: TrendingUp,
} as const;

export function AdminDashboard({
  title = "Admin dashboard",
  stats,
  metrics,
  bookings,
  recentBookings,
  channels,
  performance,
}: AdminDashboardProps) {
  const metricCards = metrics ?? stats ?? defaultMetrics;
  const recentItems = bookings ?? recentBookings ?? defaultBookings;
  const channelSummary = channels ?? performance ?? defaultChannels;

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
        {metricCards.map((metric) => {
          const Icon = metric.key ? iconMap[metric.key] : TrendingUp;
          const deltaPositive = (metric.delta ?? "").startsWith("+");

          return (
            <article
              key={`${metric.label}-${metric.value}`}
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
        })}
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(260px, 1fr)",
          gap: 18,
        }}
      >
        <section
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: 20,
            boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h3 style={{ margin: 0, fontSize: 20 }}>Recent bookings</h3>
            <button
              type="button"
              style={{
                border: "none",
                background: "transparent",
                color: "#4f46e5",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              View all
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#6b7280", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Customer</th>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Event</th>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Date</th>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Amount</th>
                  <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map((booking) => (
                  <tr key={booking.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "14px 8px", fontWeight: 600 }}>{booking.customer}</td>
                    <td style={{ padding: "14px 8px", color: "#374151" }}>{booking.event}</td>
                    <td style={{ padding: "14px 8px", color: "#374151" }}>{booking.date}</td>
                    <td style={{ padding: "14px 8px", fontWeight: 700 }}>{booking.amount}</td>
                    <td style={{ padding: "14px 8px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                          background: statusColors[booking.status].background,
                          color: statusColors[booking.status].color,
                        }}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <section
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 18,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 20 }}>Top channels</h3>
              <TrendingUp size={18} aria-hidden="true" color="#4f46e5" />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {channelSummary.map((channel) => (
                <div key={channel.name}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>{channel.name}</span>
                    <span style={{ color: "#6b7280", fontSize: 13 }}>{channel.value}</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: "#eef2ff",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${channel.share}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 6,
                      fontSize: 12,
                      color: channel.change.startsWith("-") ? "#b91c1c" : "#166534",
                      fontWeight: 700,
                    }}
                  >
                    {channel.change}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
            }}
          >
            <h3 style={{ margin: "0 0 16px", fontSize: 20 }}>Pending approvals</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "#f9fafb",
                  borderRadius: 12,
                  padding: "12px 14px",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>Venue policy update</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>2 reviewers left</div>
                </div>
                <RefreshCcw size={16} aria-hidden="true" color="#6b7280" />
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "#f9fafb",
                  borderRadius: 12,
                  padding: "12px 14px",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>Venue policy update</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>2 reviewers left</div>
                </div>
                <RefreshCcw size={16} aria-hidden="true" color="#6b7280" />
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default AdminDashboard;
