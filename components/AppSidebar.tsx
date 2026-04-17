"use client";
import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  TransactionOutlined,
  BarChartOutlined,
  SettingOutlined,
  WalletOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard", title: "" },
    { key: "/transactions", icon: <TransactionOutlined />, label: "Ledger", title: "" },
    { key: "/analytics", icon: <BarChartOutlined />, label: "Analytics", title: "" },
    { key: "/subscriptions", icon: <WalletOutlined />, label: "Subscriptions", title: "" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings", title: "" },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      width={260}
      collapsedWidth={80}
      className="premiumSidebar"
    >
      {/* Custom Trigger Button */}
      <div className="sidebarTrigger" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>

      <div className="sidebarLogoWrapper">
        <div className={`logoFull ${collapsed ? "fadeOut" : "fadeIn"}`}>FINANCE.</div>
        <div className={`logoShort ${collapsed ? "fadeIn" : "fadeOut"}`}>F.</div>
      </div>

      <Menu
        mode="inline"
        className="sidebarMenu"
        selectedKeys={[pathname]}
        items={menuItems}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
};

export default AppSidebar;
