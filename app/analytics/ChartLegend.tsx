"use client";

import React from "react";
import { Flex, Typography } from "antd";

const { Text } = Typography;

interface LegendItem {
  label: string;
  color: string;
  value?: string | number;
}

const ChartLegend: React.FC<{ items: LegendItem[] }> = ({ items }) => {
  return (
    <Flex gap="large" justify="center" wrap="wrap" className="customLegend">
      {items.map((item, idx) => (
        <Flex key={idx} align="center" gap={8} className="legendItem">
          <span className="legendDot" style={{ backgroundColor: item.color }} />
          <Text className="legendLabel">{item.label}</Text>
          {item.value && <Text strong>{item.value}</Text>}
        </Flex>
      ))}
    </Flex>
  );
};

export default ChartLegend;
