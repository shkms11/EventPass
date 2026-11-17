import type {
  BookingRecord,
  BookingStatus,
} from "../../types/admin-dashboard";
import { DashboardPanel } from "./DashboardPanel";

const statusColors: Record<BookingStatus, { background: string; color: string }> = {
  Paid: { background: "#e8fdf3", color: "#126b3d" },
  Pending: { background: "#fff4dc", color: "#874d00" },
  Refunded: { background: "#fdeceb", color: "#9d2a2a" },
};

interface RecentBookingsProps {
  bookings: BookingRecord[];
}

export function RecentBookings({ bookings }: RecentBookingsProps) {
  return (
    <DashboardPanel>
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
            <tr
              style={{
                color: "#6b7280",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Customer</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Event</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Date</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Amount</th>
              <th style={{ textAlign: "left", padding: "12px 8px", fontWeight: 700 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
    </DashboardPanel>
  );
}
