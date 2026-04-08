"use client";

import { useState } from "react";
import { Form, Input, InputNumber, Select, DatePicker, Radio, Button, App } from "antd";
import { WalletOutlined, SwapOutlined, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { createTransaction } from "@/lib/api";
import { categories } from "@/lib/constants";

const { TextArea } = Input;

const TransactionForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createTransaction({ ...values, date: values.date.toISOString() });
      message.success("Recorded successfully!");
      form.resetFields();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error("Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
};

export default TransactionForm;
