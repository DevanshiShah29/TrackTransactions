import dayjs from "dayjs";

export const formatDate = (iso?: string) => (iso ? dayjs(iso).format("DD-MM-YYYY") : "");
export const formatAmount = (n: number) => n.toLocaleString("en-IN");
export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
