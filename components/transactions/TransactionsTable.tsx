import React from "react";
import { Table, Space, Tooltip, Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import CategoryAvatar from "./CategoryAvatar";
import AmountCell from "./AmountCell";
import { Transaction } from "@/types";
import { categoryMap } from "@/lib/constants";

const TransactionsTable: React.FC<{
  data: Transaction[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
}> = ({ data, loading, onDelete }) => {
  const columns = [
    {
      title: "Transaction",
      dataIndex: "description",
      key: "description",
      sorter: (a: Transaction, b: Transaction) =>
        (a.description || "").localeCompare(b.description || ""),
      render: (text: string, record: Transaction) => {
        const key = (record.category || "").toLowerCase();
        const cfg = categoryMap[key] || { icon: <Tag />, color: "#d9d9d9" };
        return (
          <Space>
            <CategoryAvatar icon={cfg.icon} color={cfg.color} />
            <strong>{text || "No Description"}</strong>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: Object.keys(categoryMap).map((cat) => ({ text: cat.toUpperCase(), value: cat })),
      onFilter: (value: any, record: Transaction) =>
        (record.category || "").toLowerCase() === value,
      render: (cat: string) => <span style={{ textTransform: "capitalize" }}>{cat}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "PAYMENT", value: "payment" },
        { text: "RECEIPT", value: "receipt" },
        { text: "CONTRA", value: "contra" },
      ],
      onFilter: (value: any, record: Transaction) => record.type === value,
      render: (type: string) => (
        <Tag color={type === "receipt" ? "green" : type === "payment" ? "volcano" : "blue"}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Transaction, b: Transaction) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (date: string) => dayjs(date).format("D MMMM YYYY"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
      render: (_: number, record: Transaction) => (
        <AmountCell amount={record.amount} type={record.type} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Transaction) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined style={{ color: "#1c7b5e" }} />} />
          </Tooltip>
          <Popconfirm title="Delete this record?" onConfirm={() => onDelete(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 8, showSizeChanger: true }}
      className="premium-table"
    />
  );
};

export default TransactionsTable;
