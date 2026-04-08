"use client";

import React, { useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker, Radio, Button, Card, App } from "antd";
import { WalletOutlined, SwapOutlined, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

// Phase 1 Categories
const categories = [
  "Food",
  "Clothes",
  "Online Subscription",
  "Recharge",
  "Donation",
  "Interest",
  "Salary",
  "Profit",
  "Cash",
];

const TransactionForm = () => {
  // Access message/notification context from Ant Design's App wrapper
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          // Ensure date is formatted as a string for the API/Database
          date: values.date.toISOString(),
        }),
      });

      if (response.ok) {
        message.success("Transaction recorded successfully!");
        form.resetFields();
      } else {
        const errorData = await response.json();
        message.error(errorData.error || "Failed to save transaction");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      message.error("Server connection failed. Please check if the DB is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Add New Transaction"
      variant="outlined"
      style={{ maxWidth: 600, margin: "20px auto", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: "payment", date: dayjs() }}
        onFinish={onFinish}
      >
        {/* Transaction Type Selector */}
        <Form.Item name="type" label="Transaction Type" rules={[{ required: true }]}>
          <Radio.Group block optionType="button" buttonStyle="solid">
            <Radio.Button value="payment">
              <SendOutlined /> Payment
            </Radio.Button>
            <Radio.Button value="receipt">
              <WalletOutlined /> Receipt
            </Radio.Button>
            <Radio.Button value="contra">
              <SwapOutlined /> Contra
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {/* Amount in Rupees */}
          <Form.Item
            name="amount"
            label="Amount (₹)"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              prefix="₹"
              style={{ width: "100%" }}
              placeholder="0.00"
              precision={2}
              min={0.01}
            />
          </Form.Item>

          {/* Category Dropdown */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Select a category" }]}
          >
            <Select placeholder="Select category" showSearch>
              {categories.map((cat) => (
                <Select.Option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        {/* Date of Transaction */}
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
        </Form.Item>

        {/* Description / Memo */}
        <Form.Item name="description" label="Description">
          <TextArea rows={3} placeholder="What was this for? (e.g. Monthly Broadband bill)" />
        </Form.Item>

        {/* Action Button */}
        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block loading={loading} size="large">
            Save Transaction
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransactionForm;
