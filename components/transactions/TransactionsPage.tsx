"use client";

import React, { useState, useCallback, useMemo } from "react";

// Library imports
import { Card, Divider, Modal, App, Typography, Layout, Row, Col, Flex } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

// Component imports
import TransactionsContainer from "./TransactionsContainer";
import TransactionForm from "./TransactionForm";
import BalanceCard from "./BalanceCard";
import MonthlyBudgetTile from "./MonthlyBudget";
import useTransactions from "@/hooks/useTransactions";
import MonthlyStatsTile from "./MonthlyStatsTile";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

/**
 * TransactionsPage serves as the primary view for the Transaction Ledger.
 * It manages the modal state for creating/editing and orchestrates data refreshing.
 */
const TransactionsPage: React.FC = () => {
  const { data, loading, refresh, remove } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any | null>(null);
  const { message } = App.useApp();

  const budget = 10000;
  const spentThisMonth = useMemo(() => {
    return data
      .filter((t) => t.type === "payment" && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0);
  }, [data]);

  const budgetPercent = Math.min(Math.round((spentThisMonth / budget) * 100), 100);

  // Memoizing handlers to prevent unnecessary re-renders of the container
  const handleOpenAdd = useCallback(() => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((t: any) => {
    setEditingTransaction(t);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await remove(id);
        message.success("Transaction deleted successfully");
      } catch {
        message.error("Failed to delete transaction. Please try again.");
      }
    },
    [remove, message],
  );

  return (
    <Content className="page-wrapper">
      <main style={{ width: "100%" }}>
        <Row gutter={[16, 16]} align="stretch">
          <Col xs={24} xl={8}>
            <BalanceCard transactions={data} />
          </Col>
          <Col xs={24} xl={8}>
            <MonthlyBudgetTile
              budget={budget}
              spentThisMonth={spentThisMonth}
              budgetPercent={budgetPercent}
              onEditBudget={() => message.info("Budget editing coming soon!")}
            />
          </Col>
          <Col xs={24} xl={8}>
            <MonthlyStatsTile transactions={data} />
          </Col>
        </Row>
        <Card className="ledger-card" role="article">
          {/* Semantic Header Section for SEO */}
          <header className="ledger-header">
            <Title level={3} id="ledger-title" className="brand-title">
              Transaction Ledger
            </Title>
            <Paragraph type="secondary" className="brand-subtitle">
              Track and manage your financial records with ease.
            </Paragraph>
          </header>

          <TransactionsContainer
            transactions={data}
            loading={loading}
            onDelete={handleDelete}
            onOpenAdd={handleOpenAdd}
            onEdit={handleOpenEdit}
          />
        </Card>
      </main>
      <Modal
        title={
          <Title level={4} style={{ margin: 0 }}>
            {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
          </Title>
        }
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
        centered
        aria-labelledby="modal-title"
      >
        <Divider className="modal-divider" />
        <TransactionForm
          initialData={editingTransaction}
          onSuccess={() => {
            handleCloseModal();
            refresh();
          }}
        />
      </Modal>
    </Content>
  );
};

export default TransactionsPage;
