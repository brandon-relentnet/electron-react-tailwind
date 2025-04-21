import React from "react";
import { useGridLayout } from "./GridLayoutContext";

export default function ResponsiveGrid({ children, className = "" }) {
  const { getGridClasses, getGridStyle } = useGridLayout();

  return (
    <>
      <div
        className={`grid rounded-lg shadow-md p-4 gap-4 place-items-center ${getGridClasses()} ${className}`}
        style={getGridStyle()}
      >
        {children}
      </div>
    </>
  );
}
