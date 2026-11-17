import { TrendingUp } from "lucide-react";
import type { ChannelSummary } from "../../types/admin-dashboard";
import { DashboardPanel } from "./DashboardPanel";

interface ChannelPerformanceProps {
  channels: ChannelSummary[];
}

export function ChannelPerformance({ channels }: ChannelPerformanceProps) {
  return (
    <DashboardPanel>
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
        {channels.map((channel) => (
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
    </DashboardPanel>
  );
}
