"use client";

import React from "react";
import { Card, Typography, Flex, Progress, Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

/**
 * MonthlyBudgetTile: Displays spending progress against a set limit.
 * Includes an accessible button for budget adjustments.
 */
const MonthlyBudgetTile: React.FC<{
  budgetPercent: number;
  spentThisMonth: number;
  budget: number;
  onEditBudget: () => void;
}> = ({ budgetPercent, spentThisMonth, budget, onEditBudget }) => {
  return (
    <Card className="stats-tile budget-tile" role="region" aria-label="Monthly budget overview">
      {/* Header with Title and Action Button */}
      <Flex justify="space-between" align="center" className="tile-header">
        <Text type="secondary" strong className="tile-label">
          MONTHLY BUDGET
        </Text>
        <Tooltip title="Edit Monthly Budget">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined className="edit-icon" />}
            onClick={onEditBudget}
            aria-label="Edit monthly budget"
          />
        </Tooltip>
      </Flex>

      {/* Progress Content */}
      <Flex vertical align="center" gap="middle" className="tile-body">
        <Progress
          type="circle"
          percent={budgetPercent}
          size={120}
          strokeColor="var(--ant-primary-color, #1c7b5e)"
          format={(p) => (
            <div className="progress-text" aria-hidden="true">
              <span className="percent-val">{p}%</span>
              <br />
              <small className="sub-text">used</small>
            </div>
          )}
        />
        <div className="budget-summary">
          <Text className="budget-limit-text">
            Spent <Text strong>₹{spentThisMonth.toLocaleString("en-IN")} </Text>
          </Text>
          <Text className="budget-limit-text">
            of <Text strong>₹{budget.toLocaleString("en-IN")} </Text>
          </Text>
        </div>
      </Flex>
    </Card>
  );
};

export default MonthlyBudgetTile;
