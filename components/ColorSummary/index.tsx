import React from "react";
import reactCSS from "reactcss";
import { colord } from "colord";

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface ComponentProps {
  color: Color;
  onClick: () => void;
}

export default function Component({ color, onClick }: ComponentProps) {
  const styles = reactCSS({
    default: {
      container: {
        display: "flex",
        alignItems: "center",
        marginBottom: "5px"
      },
      color: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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
        paddingLeft: "10px",
        display: "inline-block",
        fontSize: "20px",
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
      },
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.swatch} onClick={onClick}>
        <div style={styles.color} />
      </div>
      <div style={styles.text}>{colord(color).toHex()}</div>
    </div>
  );
}
