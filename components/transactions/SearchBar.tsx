import React, { useState, useRef, useEffect } from "react";
import { Input, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

type Props = {
  onOpenAdd: () => void;
  onSearch?: (query: string) => void;
  defaultValue?: string;
};

const SearchBar: React.FC<Props> = ({ onOpenAdd, onSearch, defaultValue = "" }) => {
  const [query, setQuery] = useState<string>(defaultValue);
  // use ReturnType<typeof setTimeout> so typing works across environments
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEBOUNCE_MS = 300;

  // keep internal query in sync when parent changes defaultValue
  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const scheduleSearch = (value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      onSearch?.(value);
      timerRef.current = null;
    }, DEBOUNCE_MS);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    scheduleSearch(v);
  };

  const handlePressEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onSearch?.(query);
  };

  return (
    <div
      style={{ display: "flex", width: "100%", gap: 12, alignItems: "center", marginBottom: 24 }}
    >
      <Input
        placeholder="Search history..."
        prefix={<SearchOutlined />}
        allowClear
        value={query}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
        style={{ flex: 1, minWidth: 0, borderRadius: 8, padding: "8px 12px" }}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={onOpenAdd}
        style={{ width: 150, borderRadius: 8, background: "#1c7b5e", padding: "19px 12px" }}
      >
        Add Transaction
      </Button>
    </div>
  );
};

export default SearchBar;
