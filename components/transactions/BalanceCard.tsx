// "use client";

// import React, { useMemo } from "react";

// // Library imports
// import { Card, Typography, Flex, Space } from "antd";
// import { Transaction } from "@/types";

// const { Title, Text } = Typography;

// interface BalanceCardProps {
//   transactions: Transaction[];
// }

// const BalanceCard: React.FC<BalanceCardProps> = ({ transactions }) => {
//   // 1. Calculate totals
//   const totals = useMemo(() => {
//     return transactions.reduce(
//       (acc, t) => {
//         if (t.type === "receipt") acc.income += t.amount;
//         if (t.type === "payment") acc.expense += t.amount;
//         return acc;
//       },
//       { income: 0, expense: 0 },
//     );
//   }, [transactions]);

//   const balance = totals.income - totals.expense;

//   return (
//     <Card
//       className="atm-card"
//       style={{
//         background: "linear-gradient(135deg, #1c7b5e 0%, #134e3d 100%)",
//         borderRadius: "16px",
//         color: "#fff",
//         marginBottom: "30px",
//         maxWidth: "400px",
//         height: "220px",
//         boxShadow: "0 10px 30px rgba(28, 123, 94, 0.3)",
//       }}
//     >
//       <Flex vertical justify="space-between" style={{ height: "100%" }}>
//         {/* Top Section: Brand & Chip */}
//         <Flex justify="space-between" align="start">
//           <div>
//             <Text style={{ color: "rgba(255,255,255,0.7)", display: "block", fontSize: "12px" }}>
//               CURRENT BALANCE
//             </Text>
//             <Title level={2} style={{ color: "#fff", margin: 0, fontSize: "28px" }}>
//               ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//             </Title>
//           </div>
//           {/* Decorative Chip Icon */}
//           <div className="card-chip" />
//         </Flex>

//         {/* Middle Section: Card Number (Masked) */}
//         <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px", letterSpacing: "2px" }}>
//           **** **** **** 4096
//         </Text>

//         {/* Bottom Section: Income/Expense details */}
//         <Flex justify="space-between" align="end">
//           <Space direction="vertical" size={0}>
//             <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: "10px" }}>CARD HOLDER</Text>
//             <Text style={{ color: "#fff", fontWeight: 600 }}>FINANCIAL LEDGER</Text>
//           </Space>

//           <Flex gap="large">
//             <Space direction="vertical" size={0} align="end">
//               <Text style={{ color: "#87e8de", fontSize: "10px" }}>INCOME</Text>
//               <Text style={{ color: "#fff", fontWeight: 600 }}>
//                 +₹{totals.income.toLocaleString("en-IN")}
//               </Text>
//             </Space>
//             <Space direction="vertical" size={0} align="end">
//               <Text style={{ color: "#ffa39e", fontSize: "10px" }}>EXPENSE</Text>
//               <Text style={{ color: "#fff", fontWeight: 600 }}>
//                 -₹{totals.expense.toLocaleString("en-IN")}
//               </Text>
//             </Space>
//           </Flex>
//         </Flex>
//       </Flex>

//       <style jsx>{`
//         .card-chip {
//           width: 45px;
//           height: 35px;
//           background: linear-gradient(135deg, #ffd700 0%, #daa520 100%);
//           border-radius: 6px;
//           position: relative;
//         }
//         .card-chip::after {
//           content: "";
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           width: 30px;
//           height: 20px;
//           border: 1px solid rgba(0, 0, 0, 0.1);
//           border-radius: 4px;
//         }
//       `}</style>
//     </Card>
//   );
// };

// export default BalanceCard;

"use client";

import React, { useMemo } from "react";
import { Card, Typography, Flex, Space, Divider } from "antd";
import { Transaction } from "@/types";

const { Title, Text } = Typography;

interface BalanceCardProps {
  transactions: Transaction[];
}

const BalanceCard: React.FC<BalanceCardProps> = ({ transactions }) => {
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, t) => {
        if (t.type === "receipt") acc.income += t.amount;
        if (t.type === "payment") acc.expense += t.amount;
        return acc;
      },
      { income: 0, expense: 0 },
    );
  }, [transactions]);

  const balance = totals.income - totals.expense;

  return (
    <Card bordered={false} className="premium-balance-card">
      {/* Background Decorative Elements */}
      <div className="card-glass-overlay" />
      <div className="card-glow" />

      <Flex vertical justify="space-between" className="card-content">
        {/* Top Section */}
        <Flex justify="space-between" align="start">
          <Space direction="vertical" size={0}>
            <Text className="label-text">TOTAL BALANCE</Text>
            <Title level={1} className="balance-amount">
              ₹{balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Title>
          </Space>
          <div className="contactless-icon">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
          </div>
        </Flex>

        {/* Middle Section - Masked Number */}
        <div className="card-number">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span className="last-four">2110</span>
        </div>

        {/* Bottom Section */}
        <Flex justify="space-between" align="end">
          <Space direction="vertical" size={0}>
            <Text className="label-text">CARD HOLDER</Text>
            <Text className="holder-name">FINANCIAL LEDGER</Text>
          </Space>

          <Flex className="stats-box" gap="large">
            <div className="stat-item">
              <Text className="stat-label">INCOME</Text>
              <Text className="stat-value income">+₹{totals.income.toLocaleString("en-IN")}</Text>
            </div>
            <Divider
              type="vertical"
              style={{ height: "30px", borderColor: "rgba(255,255,255,0.2)" }}
            />
            <div className="stat-item">
              <Text className="stat-label">EXPENSES</Text>
              <Text className="stat-value expense">-₹{totals.expense.toLocaleString("en-IN")}</Text>
            </div>
          </Flex>
        </Flex>
      </Flex>

      <style jsx global>{`
        .premium-balance-card {
          width: 100%;
          max-width: 450px;
          height: 260px;
          border-radius: 24px !important;
          background: #1c7b5e !important;
          background-image:
            radial-gradient(circle at 0% 0%, rgba(44, 178, 115, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #1c7b5e 0%, #114d3b 100%) !important;
          position: relative;
          overflow: hidden;

          margin-bottom: 32px;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        .card-content {
          height: 100%;
          position: relative;
          z-index: 2;
          padding: 0 5px;
        }

        /* Soft satin sheen across the surface */
        .card-glass-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 255, 255, 0) 40%
          );
          pointer-events: none;
        }

        /* Subtle spotlight to avoid the "flat" look */
        .card-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          top: -80px;
          right: -80px;
          pointer-events: none;
        }

        .balance-amount {
          color: #ffffff !important;
          margin: 8px 0 0 0 !important;
          letter-spacing: -0.5px;
          font-weight: 700 !important;
          font-family: "Inter", sans-serif;
        }

        .label-text {
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .card-number {
          display: flex;
          gap: 18px;
          font-family: "Courier New", Courier, monospace; /* Classic card number font */
          color: rgba(255, 255, 255, 0.7);
          font-size: 18px;
          margin: 20px 0;
          letter-spacing: 2px;
        }

        .last-four {
          color: #ffffff;
          font-weight: 600;
        }

        .holder-name {
          color: #ffffff !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Stats Container - Clean & Modern */
        .stats-box {
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-label {
          display: block !important;
          color: rgba(255, 255, 255, 0.5) !important;
          font-size: 9px !important;
          font-weight: 700 !important;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-weight: 700 !important;
          font-size: 14px !important;
        }

        .stat-value.income {
          color: #5ff9aaff !important;
        }
        .stat-value.expense {
          color: #f57b7bff !important;
        }

        .wave {
          border-right: 2px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </Card>
  );
};

export default BalanceCard;
