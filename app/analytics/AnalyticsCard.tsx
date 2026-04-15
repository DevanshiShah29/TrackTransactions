"use client";
import React, { useState, useMemo } from "react";
import { Flex, Typography, Tooltip, Select, Button } from "antd";
import { InfoCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

// Common Tooltip Formatter

interface Props {
  title: string;
  infoText: string;
  data: any[];
  children: (filtered: any[], view: string, date: dayjs.Dayjs) => React.ReactNode;
}

const AnalyticsCard: React.FC<Props> = ({ title, infoText, data, children }) => {
  const [viewType, setViewType] = useState("this_year");
  const [referenceDate, setReferenceDate] = useState(dayjs());

  const handleMove = (dir: "prev" | "next") => {
    const unit = viewType === "this_year" ? "year" : "month";
    setReferenceDate((prev) => (dir === "next" ? prev.add(1, unit) : prev.subtract(1, unit)));
  };

  const filteredData = useMemo(() => {
    if (viewType === "all_time") return data;
    return data.filter((t) =>
      dayjs(t.date).isSame(referenceDate, viewType === "this_year" ? "year" : "month"),
    );
  }, [data, viewType, referenceDate]);

  const rangeLabel =
    viewType === "all_time"
      ? "Total History"
      : viewType === "this_year"
        ? referenceDate.format("YYYY")
        : referenceDate.format("MMM YYYY");

  return (
    <section className="chartWrapper">
      <Flex justify="space-between" align="center" className="chartHeader">
        <div className="titleSection">
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
          <Tooltip title={infoText}>
            <InfoCircleOutlined className="infoIcon" />
          </Tooltip>
        </div>
        <Flex align="center" gap={8}>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={() => handleMove("prev")}
            disabled={viewType === "all_time"}
          />
          <Select
            value={viewType}
            onChange={(v) => {
              setViewType(v);
              setReferenceDate(dayjs());
            }}
            className="viewSelect"
            options={[
              { label: "All Time", value: "all_time" },
              { label: "Year", value: "this_year" },
              { label: "Month", value: "this_month" },
            ]}
          />
          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={() => handleMove("next")}
            disabled={viewType === "all_time"}
          />
        </Flex>
      </Flex>
      <div className="rangeContainer">
        <Flex justify="center">
          <Text className="rangeDisplay">{rangeLabel}</Text>
        </Flex>
      </div>
      <div className="chartContent">{children(filteredData, viewType, referenceDate)}</div>
    </section>
  );
};

export default AnalyticsCard;
