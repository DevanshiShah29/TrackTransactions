"use client";

import React, { useState, useMemo } from "react";
import { Flex, Typography, Tooltip, Select, Button } from "antd";
import { InfoCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface DynamicChartProps {
  title: string;
  infoText: string;
  data: any[];
  // Change this line to accept 3 arguments
  renderChart: (
    filteredData: any[],
    viewType: string,
    referenceDate: dayjs.Dayjs,
  ) => React.ReactNode;
}

const DynamicAnalyticsContainer: React.FC<DynamicChartProps> = ({
  title,
  infoText,
  data,
  renderChart,
}) => {
  const [viewType, setViewType] = useState("this_year"); // all_time, this_year, this_month
  const [referenceDate, setReferenceDate] = useState(dayjs());

  // 1. Navigation Logic
  const handleMove = (direction: "prev" | "next") => {
    if (viewType === "this_year") {
      setReferenceDate((prev) =>
        direction === "next" ? prev.add(1, "year") : prev.subtract(1, "year"),
      );
    } else if (viewType === "this_month") {
      setReferenceDate((prev) =>
        direction === "next" ? prev.add(1, "month") : prev.subtract(1, "month"),
      );
    }
  };

  // 2. Data Filtering Logic
  const filteredData = useMemo(() => {
    if (viewType === "all_time") return data;

    return data.filter((t) => {
      const tDate = dayjs(t.date);
      if (viewType === "this_year") {
        return tDate.isSame(referenceDate, "year");
      }
      if (viewType === "this_month") {
        return tDate.isSame(referenceDate, "month") && tDate.isSame(referenceDate, "year");
      }
      return true;
    });
  }, [data, viewType, referenceDate]);

  // 3. UI Display for the current range
  const rangeLabel = useMemo(() => {
    if (viewType === "all_time") return "Total History";
    if (viewType === "this_year") return referenceDate.format("YYYY");
    return referenceDate.format("MMM YYYY");
  }, [viewType, referenceDate]);

  return (
    <section className="chartWrapper">
      <Flex justify="space-between" align="center" className="chartHeader">
        <div className="titleSection">
          <Title level={4}>{title}</Title>
          <Tooltip title={infoText}>
            <InfoCircleOutlined className="infoIcon" />
          </Tooltip>
        </div>

        <div className="actionSection">
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => handleMove("prev")}
            disabled={viewType === "all_time"}
          />

          <Select
            value={viewType}
            onChange={(val) => {
              setViewType(val);
              setReferenceDate(dayjs());
            }}
            className="periodDropdown"
            options={[
              { label: "All Time", value: "all_time" },
              { label: "Years", value: "this_year" },
              { label: "Months", value: "this_month" },
            ]}
          />

          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={() => handleMove("next")}
            disabled={viewType === "all_time"}
          />
        </div>
      </Flex>

      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Text className="rangeDisplay">{rangeLabel}</Text>
      </Flex>

      {/* Ensure the chart is inside .chartWrapper .chartContent so CSS height applies */}
      <div className="chartContent">{renderChart(filteredData, viewType, referenceDate)}</div>
    </section>
  );
};

export default DynamicAnalyticsContainer;
