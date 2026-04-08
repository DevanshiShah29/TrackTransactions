"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Card,
  Typography,
  App,
  Avatar,
  Space,
  Input,
  Button,
  Popconfirm,
  Tooltip,
  Modal,
  Divider,
} from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SwapOutlined,
  CoffeeOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  BankOutlined,
  DollarOutlined,
  RiseOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import TransactionForm from "@/components/TransactionForm"; // Ensure path is correct

const { Title, Text } = Typography;

const categoryMap: Record<string, { icon: React.ReactNode; color: string }> = {
  food: { icon: <CoffeeOutlined />, color: "#ff9c6e" },
  clothes: { icon: <ShoppingOutlined />, color: "#ff85c0" },
  "online subscription": { icon: <GlobalOutlined />, color: "#597ef7" },
  recharge: { icon: <ThunderboltOutlined />, color: "#ffd666" },
  donation: { icon: <HeartOutlined />, color: "#ff7875" },
  interest: { icon: <RiseOutlined />, color: "#95de64" },
  salary: { icon: <BankOutlined />, color: "#b37feb" },
  profit: { icon: <DollarOutlined />, color: "#73d13d" },
  cash: { icon: <WalletOutlined />, color: "#87e8de" },
};

const TransactionsPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { message } = App.useApp();

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transactions");
      const result = await response.json();
      setData(result);
    } catch (error) {
      message.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (res.ok) {
        message.success("Deleted successfully");
        setData(data.filter((item) => item.id !== id));
      }
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const columns = [
    {
      title: "Transaction",
      dataIndex: "description",
      key: "description",
      sorter: (a: any, b: any) => (a.description || "").localeCompare(b.description || ""),
      render: (text: string, record: any) => {
        const config = categoryMap[record.category.toLowerCase()] || {
          icon: <Tag />,
          color: "#d9d9d9",
        };
        return (
          <Space>
            <Avatar size="small" style={{ backgroundColor: config.color }} icon={config.icon} />
            <Text strong>{text || "No Description"}</Text>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: Object.keys(categoryMap).map((cat) => ({ text: cat.toUpperCase(), value: cat })),
      onFilter: (value: any, record: any) => record.category.toLowerCase() === value,
      render: (cat: string) => <Text style={{ textTransform: "capitalize" }}>{cat}</Text>,
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
      onFilter: (value: any, record: any) => record.type === value,
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
      sorter: (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (date: string) => dayjs(date).format("DD-MM-YYYY"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      sorter: (a: any, b: any) => a.amount - b.amount,
      render: (amount: number, record: any) => {
        const isReceipt = record.type === "receipt";
        const isPayment = record.type === "payment";
        return (
          <Space>
            <Text
              strong
              style={{ color: isReceipt ? "#237804" : isPayment ? "#cf1322" : "#096dd9" }}
            >
              {isPayment ? "-" : isReceipt ? "+" : ""} ₹{amount.toLocaleString("en-IN")}
            </Text>
            {isReceipt ? (
              <ArrowUpOutlined style={{ color: "#52c41a" }} />
            ) : isPayment ? (
              <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
            ) : (
              <SwapOutlined style={{ color: "#1890ff" }} />
            )}
          </Space>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined style={{ color: "#1c7b5e" }} />} />
          </Tooltip>
          <Popconfirm title="Delete this record?" onConfirm={() => handleDelete(record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
            marginBottom: "24px",
          }}
        >
          <div>
            <Title level={3} style={{ margin: 0, color: "#1c7b5e" }}>
              Transaction Ledger
            </Title>
            <Text type="secondary">Manage your financial records efficiently</Text>
          </div>

          <Space size="middle">
            <Input
              placeholder="Search history..."
              prefix={<SearchOutlined />}
              style={{ width: 250, borderRadius: "8px" }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{ borderRadius: "8px", background: "#1c7b5e" }}
            >
              Add Transaction
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 8, showSizeChanger: true }}
          className="premium-table"
        />
      </Card>

      {/* ADD TRANSACTION MODAL */}
      <Modal
        title={"Add New Transaction"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Divider style={{ margin: "12px 0 24px 0" }} />
        <TransactionForm
          onSuccess={() => {
            setIsModalOpen(false);
            fetchTransactions();
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
