import React, { useState } from "react";

export const HoverItem = ({ content, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className} ${isHovered ? "shadow-lg" : ""}`}
    >
      {isHovered && (
        <div
          className="absolute bottom-52 left-1/2 transform -translate-x-1/2 shadow-md p-2 rounded-lg z-50"
          style={{
            backgroundColor: "#1a1c21",
            width: "500px",
            height: "255px",
            border: "2px solid #785a28",
            left: "60px",
            bottom: "200px",
          }}
        >
          {content}
          <div
            className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8"
            style={{
              borderTopColor: "#1a1c21",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};
