import dayjs from "dayjs";
import { Transaction } from "@/types";

/**
 * processDataForBar: Groups transactions into Income/Expense buckets
 * based on the active time range.
 */
export const processDataForBar = (
  transactions: Transaction[],
  viewType: string,
  referenceDate: dayjs.Dayjs,
) => {
  const dataMap: Record<string, { label: string; income: number; expense: number }> = {};

  if (viewType === "this_month") {
    const daysInMonth = referenceDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      const key = i.toString().padStart(2, "0");
      dataMap[key] = { label: key, income: 0, expense: 0 };
    }

    transactions.forEach((t) => {
      const day = dayjs(t.date).date().toString().padStart(2, "0");
      if (dataMap[day]) {
        if (t.type === "receipt") dataMap[day].income += t.amount;
        if (t.type === "payment") dataMap[day].expense += t.amount;
      }
    });
  } else if (viewType === "this_year") {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    months.forEach((m, index) => {
      // We use the index (padded) as the key to ensure perfect sorting later
      const sortKey = index.toString().padStart(2, "0");
      dataMap[sortKey] = { label: m, income: 0, expense: 0 };
    });

    transactions.forEach((t) => {
      const monthIndex = dayjs(t.date).month().toString().padStart(2, "0");
      if (dataMap[monthIndex]) {
        if (t.type === "receipt") dataMap[monthIndex].income += t.amount;
        if (t.type === "payment") dataMap[monthIndex].expense += t.amount;
      }
    });
  } else {
    transactions.forEach((t) => {
      const year = dayjs(t.date).year().toString();
      if (!dataMap[year]) {
        dataMap[year] = { label: year, income: 0, expense: 0 };
      }
      if (t.type === "receipt") dataMap[year].income += t.amount;
      if (t.type === "payment") dataMap[year].expense += t.amount;
    });
  }

  // Final fix: Convert to array and sort strictly by the object keys
  return Object.keys(dataMap)
    .sort()
    .map((key) => dataMap[key]);
};

/**
 * Formats large numbers into shorthand (e.g., 1000 -> 1k)
 */
export const formatYAxis = (value: number) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  let formattedValue: string;

  if (absValue >= 1000000) {
    formattedValue = `${(absValue / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (absValue >= 1000) {
    formattedValue = `${(absValue / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  } else {
    formattedValue = absValue.toString();
  }

  return `${sign}${formattedValue}`;
};
