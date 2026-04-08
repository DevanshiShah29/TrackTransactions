import React from "react";
import { Space, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, SwapOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AmountCell: React.FC<{ amount: number; type: string }> = ({ amount, type }) => {
  const isReceipt = type === "receipt";
  const isPayment = type === "payment";
  const color = isReceipt ? "#2cb273" : isPayment ? "#dd4861" : "#096dd9";

  return (
    <Space>
      <Text strong style={{ color }}>
        ₹{amount.toLocaleString("en-IN")}
      </Text>
      {isReceipt ? (
        <ArrowUpOutlined style={{ color: "#2cb273" }} />
      ) : isPayment ? (
        <ArrowDownOutlined style={{ color: "#dd4861" }} />
      ) : (
        <SwapOutlined style={{ color: "#1890ff" }} />
      )}
    </Space>
  );
};

export default AmountCell;
