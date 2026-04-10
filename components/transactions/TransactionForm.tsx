"use client";

import { useEffect, useState } from "react";

// Library imports
import { Form, Input, InputNumber, Select, DatePicker, Radio, Button, App, Row, Col } from "antd";
import { WalletOutlined, SwapOutlined, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

// Api functions
import { createTransaction, updateTransaction } from "@/lib/api";

// Constants
import { categories } from "@/lib/constants";
import { TransactionFormProps } from "@/types";

const { TextArea } = Input;

const TransactionForm: React.FC<TransactionFormProps> = ({ onSuccess, initialData }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        date: dayjs(initialData.date),
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = { ...values, date: values.date.toISOString() };
      if (initialData?.id) {
        await updateTransaction(initialData.id, payload);
        message.success("Updated successfully!");
      } else {
        await createTransaction(payload);
        message.success("Recorded successfully!");
      }
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error("Failed to save transaction.");
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
      aria-label={initialData ? "Edit transaction" : "Add new transaction"}
      scrollToFirstError
    >
      {/* 1. Transaction Type - Semantic group for accessibility */}
      <Form.Item
        name="type"
        label={<span style={{ fontWeight: 600 }}>Transaction Type</span>}
        rules={[{ required: true }]}
      >
        <Radio.Group
          block
          optionType="button"
          buttonStyle="solid"
          size="medium"
          aria-label="Select transaction type"
        >
          <Radio.Button value="payment" aria-label="Payment">
            <SendOutlined aria-hidden="true" /> Payment
          </Radio.Button>
          <Radio.Button value="receipt" aria-label="Receipt">
            <WalletOutlined aria-hidden="true" /> Receipt
          </Radio.Button>
          <Radio.Button value="contra" aria-label="Contra">
            <SwapOutlined aria-hidden="true" /> Contra
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Row gutter={[16, 0]}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="amount"
            label={<span style={{ fontWeight: 600 }}>Amount (₹)</span>}
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              prefix={<span aria-hidden="true">₹</span>}
              style={{ width: "100%" }}
              placeholder="0.00"
              precision={2}
              min={0.01}
              size="medium"
              aria-label="Transaction amount in Rupees"
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            name="category"
            label={<span style={{ fontWeight: 600 }}>Category</span>}
            rules={[{ required: true, message: "Select a category" }]}
          >
            <Select
              placeholder="Select category"
              showSearch
              size="medium"
              aria-label="Select category"
              options={categories.map((cat) => ({
                label: cat,
                value: cat.toLowerCase(),
              }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="date"
        label={<span style={{ fontWeight: 600 }}>Date</span>}
        rules={[{ required: true }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          format="DD-MM-YYYY"
          size="medium"
          aria-label="Select transaction date"
          inputReadOnly={true} // Prevents mobile keyboard from popping up on date pick
        />
      </Form.Item>

      <Form.Item
        name="description"
        label={<span style={{ fontWeight: 600 }}>Description (Optional)</span>}
      >
        <TextArea
          rows={3}
          placeholder="What was this for?"
          aria-label="Transaction description"
          maxLength={200}
          showCount
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          size="medium"
          style={{
            fontWeight: 600,
            height: "48px",
            marginTop: "8px",
          }}
        >
          {initialData ? "Update Transaction" : "Save Transaction"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
