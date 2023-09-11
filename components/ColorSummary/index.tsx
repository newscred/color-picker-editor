import React from "react";
import reactCSS from "reactcss";
import { Color } from "@/helpers/types";
import { Inter } from "next/font/google";

interface ComponentProps {
  color: Color;
  onClick: () => void;
}

const textFont = Inter({
  weight: "400",
  subsets: ["latin"],
});

export default function Component({ color, onClick }: ComponentProps) {
  const styles = reactCSS({
    default: {
      container: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px",
      },
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: color,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      text: {
        ...textFont.style,
        color: "#080736",
        fontSize: "14px",
        letterSpacing: "0.15px",
        lineHeight: "20px",
        paddingLeft: "10px",
        display: "inline-block",
      },
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.swatch} onClick={onClick}>
        <div style={styles.color} />
      </div>
      <div style={styles.text}>{color}</div>
    </div>
  );
}
