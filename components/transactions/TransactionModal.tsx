"use client";

import React from "react";

// Component imports
import TransactionForm from "@/components/transactions/TransactionForm";

// Type imports
import { Transaction } from "@/types";

interface TransactionModalProps {
  onSuccess?: () => void;
  initialData?: Transaction | null;
}

/**
 * TransactionModal acts as a thin wrapper for TransactionForm.
 * It forwards all necessary props to ensure Add and Edit modes work seamlessly.
 */
const TransactionModal: React.FC<TransactionModalProps> = ({ onSuccess, initialData }) => {
  return (
    <div role="presentation" className="transaction-modal-content">
      <TransactionForm onSuccess={onSuccess} initialData={initialData} />
    </div>
  );
};

export default TransactionModal;
