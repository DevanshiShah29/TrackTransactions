import { useEffect, useState } from "react";
import { Transaction } from "@/types";
import * as api from "@/lib/api";

export default function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const rows = await api.getTransactions();
      setData(rows);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const remove = async (id: string) => {
    await api.deleteTransaction(id);
    setData((d) => d.filter((r) => r.id !== id));
  };

  return { data, loading, refresh, remove, setData };
}
