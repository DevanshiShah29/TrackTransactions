"use client";

import React, { useMemo } from "react";

// Library imports
import { Card, Typography, Flex, Space, Divider } from "antd";
import dayjs from "dayjs";

// Types
import { BalanceCardProps } from "@/types";

const { Title, Text } = Typography;

const BalanceCard: React.FC<BalanceCardProps> = ({ transactions }) => {
  const totals = useMemo(() => {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    return transactions
      .filter((t) => {
        const transDate = dayjs(t.date);
        return transDate.month() === currentMonth && transDate.year() === currentYear;
      })
      .reduce(
        (acc, t) => {
          if (t.type === "receipt") acc.income += t.amount;
          if (t.type === "payment") acc.expense += t.amount;
          return acc;
        },
        { income: 0, expense: 0 },
      );
  }, [transactions]);

  const monthlyBalance = totals.income - totals.expense;

  return (
    <Card variant="borderless" className="premium-balance-card">
      <div className="card-glass-overlay" />
      <div className="card-glow" />

      <Flex vertical justify="space-between" className="card-content">
        {/* Top Section */}
        <Flex justify="space-between" align="start">
          <Space orientation="vertical" size={0}>
            <Text className="label-text">{dayjs().format("MMMM")} BALANCE</Text>
            <Title level={1} className="balance-amount">
              ₹{monthlyBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Title>
          </Space>
          <div className="contactless-icon" aria-hidden="true">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
          </div>
        </Flex>

        {/* Middle Section - Card Number */}
        <div className="card-number" aria-label="Card number ending in 2110">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span className="last-four">2110</span>
        </div>

        {/* Bottom Section */}
        <Flex justify="space-between" align="end">
          <Space orientation="vertical" size={0}>
            <Text className="label-text">CARD HOLDER</Text>
            <Text className="holder-name">FINANCIAL LEDGER</Text>
          </Space>

          <Flex className="stats-box" gap="large">
            <div
              className="stat-item"
              role="status"
              aria-label={`Monthly Income: ₹${totals.income}`}
            >
              <Text className="stat-label">INCOME</Text>
              <Text className="stat-value income">+₹{totals.income.toLocaleString("en-IN")}</Text>
            </div>
            <Divider
              orientation="vertical"
              style={{ height: "30px", borderColor: "rgba(255,255,255,0.2)" }}
            />
            <div
              className="stat-item"
              role="status"
              aria-label={`Monthly Expenses: ₹${totals.expense}`}
            >
              <Text className="stat-label">EXPENSES</Text>
              <Text className="stat-value expense">-₹{totals.expense.toLocaleString("en-IN")}</Text>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default BalanceCard;
