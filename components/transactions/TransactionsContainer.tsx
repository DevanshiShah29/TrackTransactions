"use client";

import React, { useMemo, useState, useCallback } from "react";

// Library imports
import { Flex } from "antd";

// Component imports
import SearchBar from "./SearchBar";
import TransactionsTable from "./TransactionsTable";

// Constants and types
import { Transaction } from "@/types";

interface TransactionsContainerProps {
  transactions: Transaction[];
  loading?: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (transaction: Transaction) => void;
  onOpenAdd: () => void;
}

/**
 * TransactionsContainer manages the filtering logic and layout
 * for the transaction ledger. It uses useMemo for performant filtering.
 */
const TransactionsContainer: React.FC<TransactionsContainerProps> = ({
  transactions = [],
  loading = false,
  onDelete,
  onEdit,
  onOpenAdd,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Using useMemo prevents expensive filter operations on every re-render
  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return transactions;

    return transactions.filter((t) => {
      const description = (t.description ?? "").toLowerCase();
      const category = (t.category ?? "").toLowerCase();
      const type = (t.type ?? "").toLowerCase();
      const amount = t.amount?.toString() ?? "";

      // Browser compatible date string matching using Indian locale as base
      const dateFormatted = t.date
        ? new Date(t.date)
            .toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .toLowerCase()
        : "";

      return (
        description.includes(query) ||
        category.includes(query) ||
        type.includes(query) ||
        amount.includes(query) ||
        dateFormatted.includes(query)
      );
    });
  }, [transactions, searchQuery]);

  // Memoized Search Callback to prevent SearchBar re-renders
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <section aria-labelledby="ledger-title" className="transactions-manager">
      <Flex vertical gap="large">
        {/* Search and Add */}
        <SearchBar onOpenAdd={onOpenAdd} onSearch={handleSearch} defaultValue={searchQuery} />

        {/* Semantic Table Wrapper for SEO/Accessibility */}
        <div
          role="region"
          aria-live="polite"
          aria-busy={loading}
          className="table-responsive-wrapper"
        >
          <TransactionsTable
            data={filteredTransactions}
            loading={loading}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </Flex>
    </section>
  );
};

export default TransactionsContainer;
