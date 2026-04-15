"use client";
import { XAxis, XAxisProps } from "recharts";

const ChartXAxis = (props: XAxisProps) => {
  return (
    <XAxis
      // Default Styles
      tickLine={false}
      axisLine={false}
      tick={{ fontSize: 11, fill: "#888" }}
      dy={8}
      // 1. Spread props first
      {...props}
      // 2. Default dataKey ONLY if one isn't provided and we aren't hiding it
      dataKey={props.dataKey || (props.hide ? undefined : "label")}
    />
  );
};

export default ChartXAxis;
