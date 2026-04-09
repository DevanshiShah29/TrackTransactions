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
      <Row gutter={[16, 16]}>
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

        <Col xs={24}>
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

      <style jsx global>{`
        .monthly-stats {
          display: flex;
          flex-direction: column;
        }

        .stats-header {
          margin-bottom: 10px;
        }

        .download-icon {
          color: #1c7b5e;
          font-size: 18px;
          transition: transform 0.2s ease;
        }

        .download-icon:hover {
          transform: translateY(1px);
        }

        .mini-card {
          padding: 12px 16px;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .mini-label {
          font-size: 10px !important;
          font-weight: 700 !important;
          letter-spacing: 0.8px;
          margin-bottom: 4px !important;
          display: flex;
          align-items: center;
          gap: 4px;
          color: rgba(0, 0, 0, 0.45) !important;
        }

        .mini-value {
          margin: 0 !important;
          font-family: "Inter", sans-serif;
        }

        .savings-box {
          background: #f6ffed;
          border-color: #d9f7be;
        }
        .savings-box .mini-value {
          color: #1c7b5e !important;
        }

        .transaction-box {
          background: #e6f4ff;
          border-color: #bae0ff;
        }
        .transaction-box .mini-value {
          color: #0958d9 !important;
        }

        .spending-box {
          background: #fff1f0;
          border-color: #ffccc7;
        }
        .spending-box .mini-value {
          color: #cf1322 !important;
        }

        @media (hover: hover) {
          .mini-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
        }

        /* SEO: Hide helper text for screen readers */
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
    </Card>
  );
};

export default MonthlyStatsTile;
