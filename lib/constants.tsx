import {
  CoffeeOutlined,
  ShoppingOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
  HeartOutlined,
  RiseOutlined,
  BankOutlined,
  DollarOutlined,
  WalletOutlined,
} from "@ant-design/icons";

interface CategoryInfo {
  icon: any;
  color: string;
}

export const categoryMap: Record<string, CategoryInfo> = {
  // Use <Icon /> (the element) instead of Icon (the value)
  food: { icon: <CoffeeOutlined />, color: "#ff9c6e" },
  clothes: { icon: <ShoppingOutlined />, color: "#ff85c0" },
  "online subscription": { icon: <GlobalOutlined />, color: "#597ef7" },
  recharge: { icon: <ThunderboltOutlined />, color: "#ffd666" },
  donation: { icon: <HeartOutlined />, color: "#ff7875" },
  interest: { icon: <RiseOutlined />, color: "#95de64" },
  salary: { icon: <BankOutlined />, color: "#b37feb" },
  profit: { icon: <DollarOutlined />, color: "#73d13d" },
  cash: { icon: <WalletOutlined />, color: "#87e8de" },
};

export const categories = [
  "Food",
  "Clothes",
  "Online Subscription",
  "Recharge",
  "Donation",
  "Interest",
  "Salary",
  "Profit",
  "Cash",
  "Gift",
  "Groceries",
  "Entertainment",
  "Health",
  "Education",
  "Transport",
  "Other",
];
