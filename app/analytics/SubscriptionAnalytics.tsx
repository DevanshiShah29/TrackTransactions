"use client";

// Library imports
import dayjs from "dayjs";
import { Flex, Avatar, Typography } from "antd";

// Utility imports
import { capitalize } from "@/utils/format";
import { categoryMap } from "@/lib/constants";

const { Text, Title } = Typography;

const SubscriptionAnalytics = ({ data }: { data: any[] }) => {
  const processed = Object.values(
    data
      .filter((t) => {
        const cat = t.category?.toLowerCase() || "";
        const desc = t.description?.toLowerCase() || "";
        return (
          cat.includes("subscription") || cat.includes("recharge") || desc.includes("subscription")
        );
      })
      .reduce((acc: any, t) => {
        // If description is empty or just whitespace, use the category name.
        const displayName = t.description?.trim() ? t.description : capitalize(t.category);
        const key = displayName.toLowerCase().trim();

        if (!acc[key]) {
          acc[key] = {
            ...t,
            displayName,
            totalAmount: t.amount,
            latestDate: t.date,
          };
        } else {
          acc[key].totalAmount += t.amount;
          if (dayjs(t.date).isAfter(dayjs(acc[key].latestDate))) {
            acc[key].latestDate = t.date;
            // Update the ID so the map key remains stable but points to latest metadata
            acc[key].id = t.id;
          }
        }
        return acc;
      }, {}),
  ).sort((a: any, b: any) => dayjs(b.latestDate).unix() - dayjs(a.latestDate).unix());

  if (!processed.length) return null;

  return (
    <div className="subAnalyticsList">
      {processed.map((item: any) => {
        const config = categoryMap[item.category?.toLowerCase()] || categoryMap["other"];

        return (
          <div key={item.id} className="subItemCard">
            <Flex align="center" justify="space-between">
              <Flex align="center" gap={16}>
                <Avatar
                  className="subItemIcon"
                  icon={config.icon}
                  style={{ backgroundColor: config.color }}
                />
                <Flex vertical>
                  <Title level={5} className="subItemTitle">
                    {capitalize(item.displayName)}
                  </Title>
                  <Text className="subItemDate">
                    Last: {dayjs(item.latestDate).format("MMM DD, YYYY")}
                  </Text>
                </Flex>
              </Flex>

              <Text className="subItemAmount">₹{item.totalAmount.toLocaleString("en-IN")}</Text>
            </Flex>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionAnalytics;
