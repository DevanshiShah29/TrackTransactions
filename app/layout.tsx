import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, App } from "antd"; // Added App
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
                colorPrimary: "#1c7b5e", // Brand Green
                borderRadius: 8,
                controlHeight: 40, // Larger touch target for mobile
              },
            }}
          >
            <App>{children}</App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
