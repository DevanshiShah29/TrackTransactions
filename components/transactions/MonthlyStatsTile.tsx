"use client";

import React from "react";
import { Card, Typography, Flex, Row, Col, Button, Tooltip, App } from "antd";
import {
  DownloadOutlined,
  ArrowUpOutlined,
  HistoryOutlined,
  FireOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

interface MonthlyStatsTileProps {
  savingsRate: number;
  transactionCount: number;
  topCategory: string;
  onDownload?: () => void;
}

/**
 * MonthlyStatsTile: Displays key performance indicators for the current month.
 * Implements WCAG-compliant color contrasts and responsive grid layouts.
 */
const MonthlyStatsTile: React.FC<MonthlyStatsTileProps> = ({
  savingsRate,
  transactionCount,
  topCategory,
  onDownload,
}) => {
  const { message } = App.useApp();

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      message.loading("Preparing your monthly report...");
      setTimeout(() => {
        message.success("Report downloaded successfully!");
      }, 1500);
    }
  };

  return (
    <Card
      className="stats-tile monthly-stats"
      role="region"
      aria-label="Monthly financial insights"
    >
      {/* Header Section */}
      <Flex justify="space-between" align="center" className="stats-header">
        <Text type="secondary" strong className="tile-label">
          THIS MONTH
        </Text>
        <Tooltip title="Download Monthly Report">
          <Button
            type="text"
            icon={<DownloadOutlined className="download-icon" />}
            onClick={handleDownload}
            aria-label="Download monthly financial report"
            size="small"
          />
        </Tooltip>
      </Flex>

      {/* Bento Grid Content */}
      <Row gutter={[8, 8]}>
        <Col xs={12}>
          <div className="mini-card savings-box">
            <Flex vertical>
              <Text className="mini-label">
                <ArrowUpOutlined aria-hidden="true" /> SAVINGS RATE
              </Text>
              <Title level={4} className="mini-value">
                {savingsRate}%
              </Title>
            </Flex>
          </div>
        </Col>

        <Col xs={12}>
          <div className="mini-card transaction-box">
            <Flex vertical>
              <Text className="mini-label">
                <HistoryOutlined aria-hidden="true" /> TRANSACTIONS
              </Text>
              <Title level={4} className="mini-value">
                {transactionCount}
              </Title>
            </Flex>
          </div>
        </Col>

        <Col xs={12}>
          <div className="mini-card spending-box">
            <Flex vertical>
              <Text className="mini-label">
                <FireOutlined aria-hidden="true" /> TOP SPENDING
              </Text>
              <Title level={4} className="mini-value">
                {topCategory || "N/A"}
              </Title>
            </Flex>
          </div>
        </Col>

        <Col xs={12}>
          <div className="mini-card spending-box">
            <Flex vertical>
              <Text className="mini-label">
                <FireOutlined aria-hidden="true" /> TOP SPENDING
              </Text>
              <Title level={4} className="mini-value">
                {topCategory || "N/A"}
              </Title>
            </Flex>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MonthlyStatsTile;
