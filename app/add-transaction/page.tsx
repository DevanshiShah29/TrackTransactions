import TransactionForm from "@/components/TransactionForm";

export default function AddTransactionPage() {
  return (
    <main style={{ padding: "40px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Expense Tracker</h1>
        <TransactionForm />
      </div>
    </main>
  );
}
