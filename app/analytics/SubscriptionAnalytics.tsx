// "use client";
// import { Flex, Avatar, Typography, Badge, Empty } from "antd";
// import { capitalize } from "@/utils/format";
// import dayjs from "dayjs";
// import { categoryMap } from "@/lib/constants";

// const { Text, Title } = Typography;

// const SubscriptionItem = ({ name, date, amount, prevAmount, category }: any) => {
//   const isPriceHike = prevAmount && amount > prevAmount;

//   // 1. Normalize the category string to match your map keys (lowercase + trimmed)
//   const safeCategory = category?.toLowerCase().trim() || "other";

//   // 2. Lookup the config, fallback to 'other' if not found
//   const config = categoryMap[safeCategory] || categoryMap["other"];

//   return (
//     <Flex align="center" justify="space-between" className="subCard">
//       <Flex align="center" gap={16}>
//         {/* Use the color and icon from your map */}
//         <Avatar
//           size={48}
//           icon={config.icon}
//           style={{
//             backgroundColor: config.color,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             flexShrink: 0,
//           }}
//         />
//         <Flex vertical>
//           <Title level={5} className="subTitle" style={{ margin: 0 }}>
//             {capitalize(name)}
//           </Title>
//           <Text className="subDate">{dayjs(date).format("MMM DD, YYYY")}</Text>
//         </Flex>
//       </Flex>

//       <Flex vertical align="end">
//         <Text className="subAmount">₹{amount.toLocaleString("en-IN")}</Text>
//         {isPriceHike && (
//           <Badge
//             status="warning"
//             text="Price increased"
//             style={{ fontSize: "10px", color: "#faad14" }}
//           />
//         )}
//       </Flex>
//     </Flex>
//   );
// };

// export const SubscriptionAnalytics = ({ data }: { data: any[] }) => {
//   // 1. Better Filtering based on your actual DB strings
//   const subs = data.filter((t) => {
//     const cat = t.category?.toLowerCase().trim();
//     const desc = t.description?.toLowerCase() || "";

//     return (
//       cat === "online subscription" ||
//       cat === "recharge" ||
//       desc.includes("subscription") ||
//       desc.includes("membership") ||
//       desc.includes("cloud") // for Apple Cloud in your DB
//     );
//   });

//   // 2. Grouping by Description
//   const processedSubs = Object.values(
//     subs.reduce((acc: any, t) => {
//       // Use description as the unique key, fallback to category
//       const displayName = t.description || capitalize(t.category);

//       // Keep only the most recent transaction for each description
//       if (!acc[displayName] || dayjs(t.date).isAfter(dayjs(acc[displayName].date))) {
//         const prev = acc[displayName]?.amount;
//         acc[displayName] = {
//           ...t,
//           displayName,
//           prevAmount: prev,
//         };
//       }
//       return acc;
//     }, {}),
//   );

//   if (processedSubs.length === 0) {
//     return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No active services found" />;
//   }

//   return (
//     <div style={{ padding: "8px" }}>
//       {processedSubs.map((sub: any) => (
//         <SubscriptionItem
//           key={sub.id}
//           name={sub.displayName}
//           date={sub.date}
//           amount={sub.amount}
//           prevAmount={sub.prevAmount}
//           category={sub.category}
//         />
//       ))}
//     </div>
//   );
// };
"use client";
import { Flex, Avatar, Typography } from "antd";
import { capitalize } from "@/utils/format";
import dayjs from "dayjs";
import { categoryMap } from "@/lib/constants";

const { Text, Title } = Typography;

export const SubscriptionAnalytics = ({ data }: { data: any[] }) => {
  // 1. Logic for All-Time / Range Filtering
  // Group by description and get the latest transaction to show current cost
  const processed = Object.values(
    data
      .filter((t) => {
        const cat = t.category?.toLowerCase() || "";
        const desc = t.description?.toLowerCase() || "";
        return (
          cat.includes("subscription") || cat.includes("recharge") || desc.includes("subscription")
        );
      })
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
      .reduce((acc: any, t) => {
        const key = t.description || t.category;
        acc[key] = t; // Always keeps the latest one
        return acc;
      }, {}),
  ).sort((a: any, b: any) => dayjs(b.date).unix() - dayjs(a.date).unix());

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
                    {capitalize(item.description || item.category)}
                  </Title>
                  <Text className="subItemDate">{dayjs(item.date).format("MMM DD, YYYY")}</Text>
                </Flex>
              </Flex>

              <Text className="subItemAmount">₹{item.amount.toLocaleString("en-IN")}</Text>
            </Flex>
          </div>
        );
      })}
    </div>
  );
};
