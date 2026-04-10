"use client";

import React, { useMemo } from "react";
import { Card, Typography, Flex, Row, Col, Button, Tooltip, App } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Transaction } from "@/types";
import { capitalize } from "@/utils/format";
import dayjs from "dayjs";

const { Text, Title } = Typography;

interface MonthlyStatsTileProps {
  transactions: Transaction[];
  onDownload?: () => void;
}

const MonthlyStatsTile: React.FC<MonthlyStatsTileProps> = ({ transactions, onDownload }) => {
  const { message } = App.useApp();

  const stats = useMemo(() => {
    const now = dayjs();
    const startOfMonth = now.startOf("month");

    // Filter current month data
    const monthlyData = transactions.filter(
      (t) => dayjs(t.date).isAfter(startOfMonth) || dayjs(t.date).isSame(startOfMonth, "day"),
    );

    //  Calculate Income & Expense for Savings Rate
    const income = monthlyData
      .filter((t) => t.type === "receipt")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = monthlyData
      .filter((t) => t.type === "payment")
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

    // Find Top Spending Category
    const categoryTotals: Record<string, number> = {};

    monthlyData
      .filter((t) => t.type === "payment")
      .forEach((t) => {
        // Ensure category is a string even if the data is undefined
        const catName = t.category || "Uncategorized";
        categoryTotals[catName] = (categoryTotals[catName] || 0) + t.amount;
      });

    // Safely handle the empty array case for .sort()
    const topCategoryEntry = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    const topCategory = topCategoryEntry ? topCategoryEntry[0] : "None";

    // Calculate Daily Average
    const daysPassed = now.date();
    const dailyAvg = Math.round(expense / daysPassed);

    return {
      savingsRate: Math.max(0, savingsRate),
      transactionCount: monthlyData.length,
      topCategory,
      dailyAvg,
    };
  }, [transactions]);

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      message.loading("Preparing report...");
      setTimeout(() => message.success("Report downloaded!"), 1500);
    }
  };

  return (
    <Card className="stats-tile monthly-stats" role="region" aria-label="Monthly insights">
      <Flex justify="space-between" align="center" className="stats-header">
        <Text type="secondary" strong className="tile-label">
          THIS MONTH
        </Text>
        <Tooltip title="Download Report">
          <Button
            type="text"
            icon={<DownloadOutlined className="download-icon" />}
            onClick={handleDownload}
            aria-label="Download monthly financial report"
            size="medium"
          />
        </Tooltip>
      </Flex>

      <Row gutter={[8, 8]}>
        <Col xs={12}>
          <div className="mini-card savings-box">
            <Flex vertical>
              <Text className="mini-label">
                <span role="img" aria-hidden="true">
                  📈
                </span>
                SAVINGS RATE
              </Text>
              <Title level={4} className="mini-value">
                {stats.savingsRate}%
              </Title>
            </Flex>
          </div>
        </Col>

        <Col xs={12}>
          <div className="mini-card transaction-box">
            <Flex vertical>
              <Text className="mini-label">
                <span role="img" aria-hidden="true">
                  🧾
                </span>
                TRANSACTIONS
              </Text>
              <Title level={4} className="mini-value">
                {stats.transactionCount}
              </Title>
            </Flex>
          </div>
        </Col>
        <Col xs={12}>
          <div className="mini-card purple-tint">
            <Flex vertical>
              <Text className="mini-label">
                <span role="img" aria-hidden="true">
                  📅
                </span>
                DAILY AVG
              </Text>
              <Title level={4} className="mini-value">
                ₹{stats.dailyAvg || "N/A"}
              </Title>
            </Flex>
          </div>
        </Col>

        <Col xs={12}>
          <div className="mini-card orange-tint">
            <Flex vertical>
              <Text className="mini-label">
                <span role="img" aria-hidden="true">
                  🔥
                </span>
                TOP SPEND
              </Text>
              <Title level={4} className="mini-value text-truncate">
                {capitalize(stats.topCategory) || "N/A"}
              </Title>
            </Flex>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MonthlyStatsTile;
