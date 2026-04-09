"use client";

import React, { useState, useRef, useEffect } from "react";

// Library imports
import { Input, Button, Flex, Grid } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

type SearchBarProps = {
  onOpenAdd: () => void;
  onSearch?: (query: string) => void;
  defaultValue?: string;
};

const { useBreakpoint } = Grid;

const SearchBar: React.FC<SearchBarProps> = ({ onOpenAdd, onSearch, defaultValue = "" }) => {
  const [query, setQuery] = useState<string>(defaultValue);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const DEBOUNCE_MS = 300;
  const screens = useBreakpoint(); // This detects screen size (xs, sm, md, etc.)

  // Logic: stack vertically if screen size is 'xs' (mobile)
  const isMobile = screens.xs;

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch?.(v), DEBOUNCE_MS);
  };

  return (
    <nav aria-label="Transaction controls">
      <Flex
        gap="middle"
        align="center"
        className="search-bar-container"
        justify="space-between"
        vertical={isMobile}
      >
        {/* Input Wrapper - Flex: 1 makes it take available space */}
        <div className="search-input-wrapper">
          <label htmlFor="transaction-search" className="visually-hidden">
            Search Transactions
          </label>
          <Input
            id="transaction-search"
            placeholder="Search by description or category..."
            prefix={<SearchOutlined aria-hidden="true" />}
            allowClear
            size="medium"
            value={query}
            onChange={handleChange}
            onPressEnter={() => onSearch?.(query)}
            aria-label="Search transactions"
          />
        </div>

        <Button
          type="primary"
          icon={<PlusOutlined aria-hidden="true" />}
          onClick={onOpenAdd}
          size="medium"
          aria-label="Add new transaction"
          className="add-transaction-btn"
          block={isMobile}
        >
          Add Transaction
        </Button>
      </Flex>
    </nav>
  );
};

export default SearchBar;
