"use client";

import React from "react";

// Library imports
import { Space, Typography } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, SwapOutlined } from "@ant-design/icons";

const { Text } = Typography;

const TRANSACTION_CONFIG = {
  receipt: { color: "#2cb273", Icon: ArrowUpOutlined, prefix: "+" },
  payment: { color: "#dd4861", Icon: ArrowDownOutlined, prefix: "-" },
  contra: { color: "#096dd9", Icon: SwapOutlined, prefix: "" },
} as const;

type TransactionType = keyof typeof TRANSACTION_CONFIG;

const AmountCell: React.FC<{ amount: number; type: string }> = ({ amount, type }) => {
  const config = TRANSACTION_CONFIG[type as TransactionType] || TRANSACTION_CONFIG.contra;

  const IconComponent = config.Icon;

  return (
    <Space size="small">
      <Text strong style={{ color: config.color, fontSize: "15px" }}>
        ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </Text>
      <IconComponent style={{ color: config.color }} />
    </Space>
  );
};

export default AmountCell;
