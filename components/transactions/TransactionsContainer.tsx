import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import TransactionsTable from "./TransactionsTable";
import { Transaction } from "@/types";

type Props = {
  transactions: Transaction[];
  loading?: boolean;
  onDelete: (id: string) => Promise<void>;
  onOpenAdd: () => void;
};

const TransactionsContainer: React.FC<Props> = ({
  transactions,
  loading = false,
  onDelete,
  onOpenAdd,
}) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter((t) => {
      const desc = (t.description || "").toLowerCase();
      const cat = (t.category || "").toLowerCase();
      const type = (t.type || "").toLowerCase();
      const amount = String(t.amount || "");
      const date = t.date ? new Date(t.date).toLocaleDateString() : "";
      return (
        desc.includes(q) ||
        cat.includes(q) ||
        type.includes(q) ||
        amount.includes(q) ||
        date.toLowerCase().includes(q)
      );
    });
  }, [transactions, search]);

  return (
    <>
      <SearchBar onOpenAdd={onOpenAdd} onSearch={setSearch} />
      <TransactionsTable data={filtered} loading={loading} onDelete={onDelete} />
    </>
  );
};

export default TransactionsContainer;
