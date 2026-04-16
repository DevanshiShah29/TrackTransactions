"use client";
import { Row, Col } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AnalyticsCard from "./AnalyticsCard";
import { ChartLegend } from "./ChartLegend";
import useTransactions from "@/hooks/useTransactions";
import { processDataForBar } from "@/utils/analytics";
import { capitalize } from "@/utils/format";
import ChartTooltip from "./ChartTooltip";
import ChartYAxis from "./ChartYAxis";
import ChartXAxis from "./ChartXAxis";
import { SubscriptionAnalytics } from "./SubscriptionAnalytics";

const COLORS = ["#562dd7", "#2eb479", "#fea02a", "#ff7875", "#36cfc9"];

const AnalyticsPage = () => {
  const { data } = useTransactions();

  return (
    <main style={{ padding: "24px" }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <AnalyticsCard title="Income vs Expense" infoText="Earnings vs Spending" data={data}>
            {(filtered, view, date) => (
              <ResponsiveContainer>
                <BarChart data={processDataForBar(filtered, view, date)}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} />
                  <ChartXAxis interval={view === "this_month" ? 4 : 0} />
                  <ChartYAxis />
                  <ChartTooltip />
                  <Bar dataKey="income" fill="#2ebe82" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#956afb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </AnalyticsCard>
        </Col>

        <Col xs={24} xl={12}>
          <AnalyticsCard title="Balance Trend" infoText="Growth of your net balance" data={data}>
            {(filtered, view, date) => {
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
                        <stop offset="5%" stopColor="#fea02c" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#fea02c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} />
                    <ChartXAxis interval={view === "this_month" ? 4 : 0} />
                    <ChartYAxis />
                    <ChartTooltip />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#fea02c"
                      fill="url(#colorBal)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              );
            }}
          </AnalyticsCard>
        </Col>

        <Col xs={24} lg={12}>
          <AnalyticsCard title="Spending by Category" infoText="Expense breakdown" data={data}>
            {(filtered) => {
              const grouped = filtered
                .filter((t) => t.type === "payment")
                .reduce((acc: any, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {});
              const pieData = Object.entries(grouped).map(([name, value], i) => ({
                name,
                value: value as number,
                color: COLORS[i % COLORS.length],
              }));

              return (
                <>
                  <ResponsiveContainer height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <ChartLegend items={pieData} />
                </>
              );
            }}
          </AnalyticsCard>
        </Col>

        <Col xs={24} lg={12}>
          <AnalyticsCard title="Income Sources" infoText="Breakdown of revenue" data={data}>
            {(filtered) => {
              const income = filtered.filter((t) => t.type === "receipt");
              const grouped = income.reduce((acc: any, t) => {
                const cat = t.category || "Other";
                acc[cat] = (acc[cat] || 0) + t.amount;
                return acc;
              }, {});

              const pieData = Object.entries(grouped).map(([name, value], i) => ({
                name,
                value: value as number,
                color: COLORS[i % COLORS.length],
              }));

              return (
                <>
                  <ResponsiveContainer height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <ChartLegend items={pieData} />
                </>
              );
            }}
          </AnalyticsCard>
        </Col>

        <Col xs={24} lg={12}>
          <AnalyticsCard title="Top 5 Expenses" infoText="Highest individual outlays" data={data}>
            {(filtered) => {
              const top5 = filtered
                .filter((t) => t.type === "payment")
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 5)
                .map((t) => ({ name: capitalize(t.category), amount: t.amount }));

              return (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={top5} margin={{ left: 30, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                    <ChartXAxis type="number" hide />
                    <ChartYAxis type="category" dataKey="name" />
                    <ChartTooltip />
                    <Bar dataKey="amount" radius={[0, 10, 10, 0]} barSize={18}>
                      {top5.map((_, index) => (
                        <Cell key={index} fill={index === 0 ? "#1c7b5e" : "#374151"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              );
            }}
          </AnalyticsCard>
        </Col>

        <Col xs={24} xl={12}>
          <AnalyticsCard
            title="Active Subscriptions"
            infoText="Monthly recurring costs"
            data={data}
          >
            {(filtered) => <SubscriptionAnalytics data={filtered} />}
          </AnalyticsCard>
        </Col>
      </Row>
    </main>
  );
};

export default AnalyticsPage;
