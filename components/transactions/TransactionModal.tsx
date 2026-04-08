import React from "react";
import TransactionForm from "@/components/TransactionForm";

const TransactionModal: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  return <TransactionForm onSuccess={onSuccess} />;
};

export default TransactionModal;
