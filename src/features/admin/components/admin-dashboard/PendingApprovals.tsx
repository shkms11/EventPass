import { RefreshCcw } from "lucide-react";
import type { PendingApproval } from "../../types/admin-dashboard";
import { DashboardPanel } from "./DashboardPanel";

interface PendingApprovalsProps {
  approvals: PendingApproval[];
}

export function PendingApprovals({ approvals }: PendingApprovalsProps) {
  return (
    <DashboardPanel>
      <h3 style={{ margin: "0 0 16px", fontSize: 20 }}>Pending approvals</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 12,
        }}
      >
        {approvals.map((approval) => (
          <li
            key={approval.id}
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
              <div style={{ fontWeight: 700 }}>{approval.title}</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{approval.detail}</div>
            </div>
            <RefreshCcw size={16} aria-hidden="true" color="#6b7280" />
          </li>
        ))}
      </ul>
    </DashboardPanel>
  );
}
