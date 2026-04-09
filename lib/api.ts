// lib/api.ts

export async function getTransactions() {
  const res = await fetch("/api/transactions");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

export async function createTransaction(payload: any) {
  const res = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}

export async function updateTransaction(id: string, data: any) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Update failed");
  return response.json();
}

export async function deleteTransaction(id: string) {
  const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
  return res;
}
