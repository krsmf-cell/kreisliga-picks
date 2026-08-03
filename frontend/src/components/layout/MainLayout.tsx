import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(76,175,80,.18), transparent 30%),
          radial-gradient(circle at bottom right, rgba(33,150,243,.12), transparent 25%),
          linear-gradient(180deg,#eef4ef 0%,#dfe8e2 100%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: 290, // 250px Sidebar + 40px Padding
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <div
          style={{
            padding: 30,
            flex: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}