import React, { useState } from "react";

function HoverMenor({ content, children, className }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className} ${isHovered ? "shadow-lg" : ""}`}
    >
      {isHovered && (
        <div
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 shadow-md p-2 rounded-lg z-50"
          style={{
            backgroundColor: "#1a1c21",
            width: "350px",
            height: "290px",
            border: "2px solid #785a28",
            left: "215px",
            bottom: "10px",
          }}
        >
          {content}
          <div
            className="absolute w-4 h-4 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8"
            style={{
              borderTopColor: "#fffff",
              top: "267px",
              left: "-18px",
              transform: "rotate(90deg)",
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}

export default HoverMenor;
