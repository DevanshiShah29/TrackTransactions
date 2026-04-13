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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { capitalize } from "@/utils/format"; // Ensure this helper exists
import { processDataForBar } from "@/utils/analytics";
import DynamicAnalyticsContainer from "./DynamicAnalyticsContainer";
import useTransactions from "@/hooks/useTransactions";
import ChartLegend from "./ChartLegend";

const AnalyticsPage = () => {
  const { data } = useTransactions();
  const SOURCE_COLORS = ["#1677ff", "#69b1ff", "#003eb3"];

  // Helper for Capitalized Tooltips
  const formatTooltipValue = (value: any, name?: string | number | Symbol) => {
    const nameStr = name?.toString() || "";
    return [`₹${value.toLocaleString("en-IN")}`, capitalize(nameStr)];
  };

  return (
    <main style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        {/* 1. Income vs Expense - Bar Chart */}
        <Col xs={24} xl={12}>
          <DynamicAnalyticsContainer
            title="Income vs Expense"
            infoText="Earnings vs Spending"
            data={data}
            renderChart={(filtered, view, date) => (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processDataForBar(filtered, view, date)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    interval={view === "this_month" ? 4 : 0}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <YAxis axisLine={false} tickLine={false} />

                  <Tooltip
                    formatter={formatTooltipValue}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="income" fill="#1c7b5e" radius={[4, 4, 0, 0]} barSize={12} />
                  <Bar dataKey="expense" fill="#ffa39e" radius={[4, 4, 0, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            )}
          />
        </Col>

        {/* 2. Balance Trend - Area Chart (With Axis) */}
        <Col xs={24} xl={12}>
          <DynamicAnalyticsContainer
            title="Balance Trend"
            infoText="Growth of your net balance"
            data={data}
            renderChart={(filtered, view, date) => {
              let bal = 0;
              const trend = processDataForBar(filtered, view, date).map((d) => ({
                ...d,
                balance: (bal += d.income - d.expense),
              }));
              return (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1677ff" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#1677ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      interval={view === "this_month" ? 4 : 0}
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                    />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip formatter={formatTooltipValue} />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#1677ff"
                      fill="url(#colorBal)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              );
            }}
          />
        </Col>

        {/* 3. Pie Charts (No paddingAngle for 'no space' look) */}
        <Col xs={24} lg={12}>
          <DynamicAnalyticsContainer
            title="Spending by Category"
            infoText="Expense breakdown"
            data={data}
            renderChart={(filtered) => {
              const grouped = filtered
                .filter((t) => t.type === "payment")
                .reduce((acc: any, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {});
              const pieData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
              return (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={70}
                      outerRadius={90}
                      dataKey="value"
                      paddingAngle={0} // No space between sections
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={["#1c7b5e", "#2cb273", "#87e8de", "#114d3b"][i % 4]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={formatTooltipValue} />
                  </PieChart>
                </ResponsiveContainer>
              );
            }}
          />
        </Col>

        {/* 4. Top 5 Expenses - Premium Horizontal Bar */}
        <Col xs={24} lg={12}>
          <DynamicAnalyticsContainer
            title="Top 5 Expenses"
            infoText="Highest individual outlays"
            data={data}
            renderChart={(filtered) => {
              const top5 = filtered
                .filter((t) => t.type === "payment")
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 5)
                .map((t) => ({ name: capitalize(t.category), amount: t.amount }));
              return (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={top5} margin={{ left: 30, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      width={100}
                      tick={{ fill: "#4b5563", fontWeight: 500 }}
                    />
                    <Tooltip formatter={formatTooltipValue} cursor={{ fill: "rgba(0,0,0,0.02)" }} />
                    {/* Multi-colored premium bars */}
                    <Bar dataKey="amount" radius={[0, 10, 10, 0]} barSize={18}>
                      {top5.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? "#1c7b5e" : "#374151"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              );
            }}
          />
        </Col>

        {/* 5. Income Sources - Pie Chart */}
        <Col xs={24} lg={12} xl={12}>
          <DynamicAnalyticsContainer
            title="Income Sources"
            infoText="Breakdown of your revenue streams."
            data={data}
            renderChart={(filtered) => {
              const income = filtered.filter((t) => t.type === "receipt");
              const grouped = income.reduce((acc: any, t) => {
                acc[t.category || "Other"] = (acc[t.category || "Other"] || 0) + t.amount;
                return acc;
              }, {});
              const pieData = Object.entries(grouped).map(([name, value]) => ({ name, value }));
              return (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        paddingAngle={0}
                        stroke="none"
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={SOURCE_COLORS[i % SOURCE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <ChartLegend
                    items={pieData.map((d, i) => ({
                      label: d.name as string,
                      color: SOURCE_COLORS[i % SOURCE_COLORS.length],
                    }))}
                  />
                </>
              );
            }}
          />
        </Col>
      </Row>
    </main>
  );
};
export default AnalyticsPage;
