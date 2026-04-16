"use client";

// Library imports
import { Tooltip, TooltipProps } from "recharts";

// Utility imports
import { commonTooltip } from "@/utils/format";

const ChartTooltip = (props: TooltipProps) => {
  return (
    <Tooltip
      formatter={commonTooltip}
      contentStyle={{
        borderRadius: 8,
        borderColor: "#eee",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #eee",
        padding: "8px 12px",
        ...props.contentStyle, // Allows local overrides
      }}
      // Default cursor, can be overridden by passing cursor prop to <ChartTooltip />
      cursor={{ fill: "rgba(0,0,0,0.05)" }}
      {...props}
    />
  );
};

export default ChartTooltip;
