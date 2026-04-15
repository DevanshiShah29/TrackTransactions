"use client";
import { Row, Col, Flex, Typography } from "antd";
import { capitalize } from "@/utils/format";

const { Text } = Typography;

interface LegendItem {
  name: string;
  value: number;
  color: string;
}

export const ChartLegend = ({ items }: { items: LegendItem[] }) => (
  <div className="legendGrid">
    <Row gutter={[16, 12]}>
      {items.map((item, idx) => (
        <Col span={8} key={idx}>
          <Flex vertical gap={2}>
            <Flex align="center" gap={6}>
              <div className="legendDot" style={{ backgroundColor: item.color }} />
              <Text ellipsis={{ tooltip: capitalize(item.name) }} className="legendLabel">
                {capitalize(item.name)}
              </Text>
            </Flex>
            <Text className="legendValue">₹{item.value.toLocaleString("en-IN")}</Text>
          </Flex>
        </Col>
      ))}
    </Row>
  </div>
);
