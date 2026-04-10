"use client";

import { Row, Col } from "antd";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import useTransactions from "@/hooks/useTransactions";
import { processDataForBar } from "@/utils/analytics";
import DynamicAnalyticsContainer from "./DynamicAnalyticsContainer";

const AnalyticsPage = () => {
  const { data } = useTransactions();

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24}>
        <DynamicAnalyticsContainer
          title="Income vs Expenses"
          infoText="Comparison of money in vs money out across selected timeframes."
          data={data}
          // TypeScript will now be happy because the signatures match
          renderChart={(filtered, viewType, referenceDate) => {
            const chartData = processDataForBar(filtered, viewType, referenceDate);

            return (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#8c8c8c" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#8c8c8c" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f6ffed" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="income" fill="#1c7b5e" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expense" fill="#ffa39e" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            );
          }}
        />
      </Col>
    </Row>
  );
};

export default AnalyticsPage;
