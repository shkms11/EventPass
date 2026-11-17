import type {
  BookingRecord,
  ChannelSummary,
  DashboardMetric,
  PendingApproval,
} from "../types/admin-dashboard";

export const DEFAULT_DASHBOARD_METRICS: DashboardMetric[] = [
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

export const DEFAULT_RECENT_BOOKINGS: BookingRecord[] = [
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

export const DEFAULT_CHANNEL_SUMMARIES: ChannelSummary[] = [
  { name: "Direct", value: "42%", share: 42, change: "+6.3%" },
  { name: "Social", value: "26%", share: 26, change: "+3.1%" },
  { name: "Email", value: "19%", share: 19, change: "+1.7%" },
  { name: "Referral", value: "13%", share: 13, change: "-0.8%" },
];

export const DEFAULT_PENDING_APPROVALS: PendingApproval[] = [
  { id: "venue-policy-review-1", title: "Venue policy update", detail: "2 reviewers left" },
  { id: "venue-policy-review-2", title: "Venue policy update", detail: "2 reviewers left" },
];
