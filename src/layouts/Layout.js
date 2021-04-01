import React from "react";
import Header from "./Header";

function Layout({
  toggleSidebar,
  cartLength,
  onToggle,
  isCheckingOut,
  children,
}) {
  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        cartLength={cartLength}
        onToggle={onToggle}
        isCheckingOut={isCheckingOut}
      />
      {children}
    </>
  );
}

export default Layout;
