export interface Transaction {
  id: string;
  description?: string;
  category?: string;
  type: "payment" | "receipt" | "contra";
  date: string;
  amount: number;
}
