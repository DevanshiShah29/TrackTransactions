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
    // Group by Day (1 to 31)
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
    // Group by Month (Jan to Dec)
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
    months.forEach((m) => {
      dataMap[m] = { label: m, income: 0, expense: 0 };
    });

    transactions.forEach((t) => {
      const monthLabel = dayjs(t.date).format("MMM");
      if (dataMap[monthLabel]) {
        if (t.type === "receipt") dataMap[monthLabel].income += t.amount;
        if (t.type === "payment") dataMap[monthLabel].expense += t.amount;
      }
    });
  } else {
    // All Time: Group by Year
    transactions.forEach((t) => {
      const year = dayjs(t.date).year().toString();
      if (!dataMap[year]) {
        dataMap[year] = { label: year, income: 0, expense: 0 };
      }
      if (t.type === "receipt") dataMap[year].income += t.amount;
      if (t.type === "payment") dataMap[year].expense += t.amount;
    });
  }

  // Convert map to sorted array for Recharts
  return Object.values(dataMap).sort((a, b) => {
    if (viewType === "all_time") return Number(a.label) - Number(b.label);
    return 0; // Days and Months are already inserted in order
  });
};
