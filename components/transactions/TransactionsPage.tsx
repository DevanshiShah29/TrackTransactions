"use client";

import React, { useState } from "react";
import { Card, Divider, Modal, App } from "antd";
import TransactionsTable from "./TransactionsTable";
import SearchBar from "./SearchBar";
import TransactionModal from "./TransactionModal";
import useTransactions from "@/hooks/useTransactions";
import TransactionsContainer from "./TransactionsContainer";

const TransactionsPage: React.FC = () => {
  const { data, loading, refresh, remove } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message } = App.useApp();

  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <Card
        bordered={false}
        style={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: "#1c7b5e" }}>Transaction Ledger</h3>
            <div style={{ color: "rgba(0,0,0,0.45)" }}>
              Manage your financial records efficiently
            </div>
          </div>
        </div>

        <TransactionsContainer
          transactions={data}
          onDelete={async (id) => {
            try {
              await remove(id);
              message.success("Deleted successfully");
            } catch {
              message.error("Delete failed");
            }
          }}
          onOpenAdd={() => setIsModalOpen(true)}
        />
      </Card>

      <Modal
        title="Add New Transaction"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Divider style={{ margin: "12px 0 24px 0" }} />
        <TransactionModal
          onSuccess={() => {
            setIsModalOpen(false);
            refresh();
          }}
        />
      </Modal>

      <style jsx global>{`
        .premium-table .ant-table-thead > tr > th {
          background: #f0f2f5 !important;
          color: #1c7b5e !important;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default TransactionsPage;
