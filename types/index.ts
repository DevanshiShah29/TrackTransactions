export interface Transaction {
  id: string;
  description?: string;
  category?: string;
  type: "payment" | "receipt" | "contra";
  date: string;
  amount: number;
}

export interface BalanceCardProps {
  transactions: Transaction[];
}

export interface BudgetFormProps {
  onSuccess: (values: any) => void;
  initialData?: Record<string, number> | null;
  loading?: boolean;
}

export interface CategoryAvatarProps {
  icon?: React.ReactNode;
  color?: string;
}

export interface MonthlyBudgetTileProps {
  budgetPercent: number;
  spentThisMonth: number;
  budget: number;
  onUpdateBudget: (values: any) => Promise<void> | void;
  categoryTargets?: Record<string, number>;
}

export interface MonthlyStatsTileProps {
  transactions: Transaction[];
  onDownload?: () => void;
}

export interface TransactionFormProps {
  onSuccess?: () => void;
  initialData?: Transaction | null;
}

export interface TransactionsContainerProps {
  transactions: Transaction[];
  loading?: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (transaction: Transaction) => void;
  onOpenAdd: () => void;
}

export interface TransactionsTableProps {
  data: Transaction[];
  loading: boolean;
  onDelete: (id: string) => Promise<void>;
  onEdit: (record: Transaction) => void;
}

export interface SearchBarProps {
  onOpenAdd: () => void;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}
