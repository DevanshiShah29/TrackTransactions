"use client";

import React, { useState } from "react";
import { Flex, Typography, Tooltip, Select, Button } from "antd";
import { InfoCircleOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface ChartContainerProps {
  title: string;
  infoText: string;
  children: React.ReactNode;
}

const AnalyticsChartContainer: React.FC<ChartContainerProps> = ({ title, infoText, children }) => {
  const [period, setPeriod] = useState("this_year");

  const periods = [
    { label: "All Time", value: "all_time" },
    { label: "This Year", value: "this_year" },
    { label: "This Month", value: "this_month" },
  ];

  // Logic to handle arrows cycling through periods
  const handleNav = (direction: "prev" | "next") => {
    const currentIndex = periods.findIndex((p) => p.value === period);
    let nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= 0 && nextIndex < periods.length) {
      setPeriod(periods[nextIndex].value);
    }
  };

  return (
    <section className="chartWrapper">
      <Flex justify="space-between" align="center" className="chartHeader">
        {/* Left Side: Title + Tooltip */}
        <div className="titleSection">
          <Title level={4}>{title}</Title>
          <Tooltip title={infoText}>
            <InfoCircleOutlined className="infoIcon" />
          </Tooltip>
        </div>

        {/* Right Side: Arrows + Dropdown */}
        <div className="actionSection">
          <Button
            type="text"
            icon={<LeftOutlined />}
            className="navBtn"
            onClick={() => handleNav("prev")}
            disabled={period === "all_time"}
          />

          <Select
            value={period}
            onChange={setPeriod}
            className="periodDropdown"
            options={periods}
          />

          <Button
            type="text"
            icon={<RightOutlined />}
            className="navBtn"
            onClick={() => handleNav("next")}
            disabled={period === "this_month"}
          />
        </div>
      </Flex>

      <div className="chartContent">{children}</div>
    </section>
  );
};

export default AnalyticsChartContainer;
