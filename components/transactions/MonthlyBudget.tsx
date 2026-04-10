"use client";

import React, { useState } from "react";

// Library imports
import { Card, Typography, Flex, Progress, Button, Tooltip, Modal, Divider } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

// Component imports
import BudgetForm from "./BudgetForm";

const { Text, Title } = Typography;

interface MonthlyBudgetTileProps {
  budgetPercent: number;
  spentThisMonth: number;
  budget: number;
  onUpdateBudget: (values: any) => Promise<void> | void;
  categoryTargets?: Record<string, number>;
}

/**
 * MonthlyBudgetTile: Displays spending progress.
 * Manages its own Modal state for budget adjustments.
 */
const MonthlyBudgetTile: React.FC<MonthlyBudgetTileProps> = ({
  budgetPercent,
  spentThisMonth,
  budget,
  onUpdateBudget,
  categoryTargets = {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleFormSuccess = async (values: any) => {
    await onUpdateBudget(values);
    handleClose();
  };

  const isBudgetSet = budget > 0;

  return (
    <Card className="stats-tile budget-tile" role="region" aria-label="Monthly budget overview">
      <Flex justify="space-between" align="center" className="tile-header">
        <Text type="secondary" strong className="tile-label">
          MONTHLY BUDGET
        </Text>
        <Tooltip title={isBudgetSet ? "Edit Budget" : "Add Budget"}>
          <Button
            type="text"
            size="medium"
            icon={
              isBudgetSet ? (
                <EditOutlined className="edit-icon" />
              ) : (
                <PlusOutlined className="edit-icon" />
              )
            }
            onClick={handleOpen}
            aria-label={isBudgetSet ? "Edit monthly budget" : "Add monthly budget"}
          />
        </Tooltip>
      </Flex>

      <Flex
        vertical
        align="center"
        gap="middle"
        className="tile-body"
        style={{ flex: 1, justifyContent: "center" }}
      >
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

      <Modal
        title={<Title level={4}>Set Monthly Budget - April 2026</Title>}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
        centered
      >
        <Divider style={{ margin: "12px 0 24px 0" }} />
        <BudgetForm onSuccess={handleFormSuccess} initialData={categoryTargets} />
      </Modal>
    </Card>
  );
};

export default MonthlyBudgetTile;
