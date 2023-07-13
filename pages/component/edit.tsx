import dynamic from "next/dynamic";
import React from "react";
import { useState, useRef } from "react";
import reactCSS from "reactcss";
import { SketchPicker, ColorResult } from "react-color";
import useHostChannel from "@/hooks/useHostChannel";

const ColorSummary = dynamic(() => import("@/components/ColorSummary"), {
  loading: () => <p>Loading...</p>,
});

const DEFAULT_COLOR = {
  r: 0,
  g: 0,
  b: 0,
  a: 1,
};

export default function Component() {
  const colorRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [config, setConfig] = useState<string>("{}");

  const hostChannel = useHostChannel({
    onMessage(message) {
      switch (message.type) {
        case "connected": {
          hostChannel.sendMessage({ type: "get:field-value" });
          hostChannel.sendMessage({ type: "get:field-config" });
          hostChannel.sendMessage({
            type: "set:height",
            height: "350px",
          });
          return;
        }
        case "field-value": {
          setColor(message?.content?.color ?? DEFAULT_COLOR);
          return;
        }
        case "field-config": {
          setConfig(message.config ?? "");
          return;
        }
      }
    },
  });

  const handleClose = () => {
    hostChannel.sendMessage({ type: "set:mode", mode: "view" });
  };

  const handleChange = (color: ColorResult) => {
    const colorWithOpacity = { ...color.rgb, a: color.rgb.a ?? 1 };
    hostChannel.sendMessage({
      type: "set:field-value",
      content: {
        color: colorWithOpacity,
      },
    });
    setColor(colorWithOpacity);
  };

  const styles = reactCSS({
    default: {
      popover: {
        position: "absolute" as "absolute",
        zIndex: 2,
      },
      cover: {
        position: "fixed" as "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div ref={colorRef}>
      <ColorSummary color={color} onClick={() => {}} />
      <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose} />
        <SketchPicker color={color} onChange={handleChange} />
      </div>
    </div>
  );
}
