"use client";

import React, { useEffect } from "react";

// Library imports
import { Form, InputNumber, Button, Row, Col, Typography, Divider, Flex } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { categories } from "@/lib/constants";

const { Text, Title } = Typography;

interface BudgetFormProps {
  onSuccess: (values: any) => void;
  initialData?: Record<string, number> | null;
  loading?: boolean;
}

/**
 * BudgetForm: Allows users to set optional monthly targets per category.
 * Automatically calculates the total budget for the month.
 */
const BudgetForm: React.FC<BudgetFormProps> = ({ onSuccess, initialData, loading }) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const totalBudget = React.useMemo(() => {
    if (!values) return 0;
    return Object.values(values).reduce((acc: number, val: any) => acc + (Number(val) || 0), 0);
  }, [values]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSuccess}
      className="budget-settings-form"
      aria-label="Monthly budget settings form"
    >
      <Title level={5} style={{ marginBottom: 16 }}>
        Set Category Targets{" "}
        <Text type="secondary" style={{ fontSize: 13, fontWeight: 400 }}>
          (Optional)
        </Text>
      </Title>

      <Row gutter={[16, 0]}>
        {categories.map((cat) => (
          <Col xs={24} sm={12} key={cat}>
            <Form.Item name={cat.toLowerCase()} label={cat} style={{ marginBottom: 16 }}>
              <InputNumber
                prefix="₹"
                placeholder="0"
                min={0}
                style={{ width: "100%" }}
                size="large"
                aria-label={`Budget for ${cat}`}
              />
            </Form.Item>
          </Col>
        ))}
      </Row>

      <Divider style={{ margin: "12px 0 24px 0" }} />

      <Flex justify="space-between" align="center" className="budget-footer">
        <div>
          <Text type="secondary" style={{ display: "block", fontSize: 12 }}>
            TOTAL PLANNED BUDGET
          </Text>
          <Title level={3} style={{ margin: 0, color: "#1c7b5e" }}>
            ₹{totalBudget.toLocaleString("en-IN")}
          </Title>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={loading}
          size="large"
        >
          Save Budget
        </Button>
      </Flex>
    </Form>
  );
};

export default BudgetForm;
