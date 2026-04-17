"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Layout } from "antd";
import AppSidebar from "@/components/AppSidebar";
import "./globals.css";
import "../styles/_global.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#1c7b5e",
                borderRadius: 8,
                controlHeight: 40,
              },
            }}
          >
            <Layout style={{ height: "100vh", overflow: "hidden", flexDirection: "row" }}>
              {/* 1. Sidebar remains fixed on the left */}
              <AppSidebar />

              {/* 2. Content wrapper handles the scrolling */}
              <Layout style={{ background: "#fafafa" }}>
                <Layout.Content
                  style={{
                    margin: 0,
                    height: "100%",
                    overflowY: "auto",
                    scrollBehavior: "smooth",
                  }}
                >
                  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>{children}</div>
                </Layout.Content>
              </Layout>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
