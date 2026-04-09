// components/transactions/TransactionsTable.tsx
"use client";

import React, { useMemo } from "react";

// Library imports
import { Table, Space, Button, Popconfirm, Tag, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

// Component imports
import CategoryAvatar from "./CategoryAvatar";
import AmountCell from "./AmountCell";

// Type imports
import { Transaction } from "@/types";
import { categoryMap } from "@/lib/constants";

const { Text } = Typography;

interface TransactionsTableProps {
  data: Transaction[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (record: Transaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  loading,
  onDelete,
  onEdit,
}) => {
  // Memoize columns to improve performance and keep the render block clean
  const columns: ColumnsType<Transaction> = useMemo(
    () => [
      {
        title: "Transaction",
        dataIndex: "description",
        key: "description",
        width: 300,
        sorter: (a, b) => (a.description || "").localeCompare(b.description || ""),
        render: (text: string, record: Transaction) => {
          const key = (record.category || "").toLowerCase();
          const cfg = categoryMap[key] || { icon: <Tag />, color: "#d9d9d9" };
          return (
            <Space size="middle">
              <CategoryAvatar icon={cfg.icon} color={cfg.color} />
              <Text strong aria-label={`Description: ${text || "No Description"}`}>
                {text || "No Description"}
              </Text>
            </Space>
          );
        },
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: 200,
        filters: Object.keys(categoryMap).map((cat) => ({ text: cat.toUpperCase(), value: cat })),
        onFilter: (value, record) => (record.category || "").toLowerCase() === value,
        render: (cat: string) => <Text style={{ textTransform: "capitalize" }}>{cat}</Text>,
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: 150,
        filters: [
          { text: "PAYMENT", value: "payment" },
          { text: "RECEIPT", value: "receipt" },
          { text: "CONTRA", value: "contra" },
        ],
        onFilter: (value, record) => record.type === value,
        render: (type: string) => (
          <Tag
            color={type === "receipt" ? "green" : type === "payment" ? "volcano" : "blue"}
            style={{ fontWeight: 600, borderRadius: "4px" }}
          >
            {type.toUpperCase()}
          </Tag>
        ),
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 200,
        sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
        render: (date: string) => <Text>{dayjs(date).format("DD MMMM YYYY")}</Text>,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        align: "right",
        width: 200,
        sorter: (a, b) => a.amount - b.amount,
        render: (_, record) => <AmountCell amount={record.amount} type={record.type} />,
      },
      {
        title: "Actions",
        key: "actions",
        width: 150,
        render: (_, record) => (
          <Space size="small">
            <Button
              type="text"
              aria-label="Edit transaction"
              icon={<EditOutlined style={{ color: "#1c7b5e", fontSize: "16px" }} />}
              onClick={() => onEdit(record)}
            />
            <Popconfirm
              title="Are you sure you want to delete?"
              onConfirm={() => onDelete(record.id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                danger
                aria-label="Delete transaction"
                icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
              />
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{
        pageSize: 8,
        showSizeChanger: true,
        position: ["bottomRight"],
      }}
      className="premium-table"
      aria-label="Recent transactions table"
    />
  );
};

export default TransactionsTable;
