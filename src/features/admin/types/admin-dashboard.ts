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

export type PendingApproval = {
  id: string;
  title: string;
  detail: string;
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
