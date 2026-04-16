"use client";

// Library imports
import { YAxis, YAxisProps } from "recharts";

// Utility imports
import { formatYAxis } from "@/utils/analytics";

const ChartYAxis = (props: YAxisProps) => {
  // Logic: Only format as currency if it's a number axis
  const isNumber = props.type === "number" || !props.type;

  return (
    <YAxis
      // 1. Spread defaults first
      width={35}
      tickLine={false}
      axisLine={false}
      tick={{ fontSize: 11, fill: "#888" }}
      // 2. Apply conditional formatter
      tickFormatter={isNumber ? formatYAxis : undefined}
      // 3. Spread props last so the user can override ANYTHING
      {...props}
    />
  );
};

export default ChartYAxis;
