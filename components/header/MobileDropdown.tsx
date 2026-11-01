import React from "react";
import { createPortal } from "react-dom";

type MobileDropdownProps = {
  isVisible: boolean;
  content: React.ReactNode;
  buttonPosition: { top: number; right: number };
};

/**
 * A component that renders a dropdown menu in a portal outside of the normal DOM hierarchy
 * to ensure it appears on top of everything else
 */
export function MobileDropdown({ isVisible, content, buttonPosition }: MobileDropdownProps) {
  if (!isVisible || typeof document === "undefined") return null;
  
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: `${buttonPosition.top}px`,
        right: `${buttonPosition.right}px`,
        zIndex: 99999,
      }}
      data-dropdown-container="true"
    >
      {/* Menu content */}
      <div
        style={{
          backgroundColor: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: 4,
          padding: 12,
          minWidth: 150,
          marginTop: 5,
          position: "relative",
          zIndex: 1,
        }}
      >
        {content}
      </div>

    </div>,
    document.body
  );
}