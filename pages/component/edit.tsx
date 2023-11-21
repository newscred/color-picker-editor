import dynamic from "next/dynamic";
import React from "react";
import { useState, useRef, useEffect } from "react";
import reactCSS from "reactcss";
import { SketchPicker, ColorResult } from "react-color";
import useHostChannel from "@/hooks/useHostChannel";
import { Color, Config } from "@/helpers/types";
import { colord } from "colord";

const ColorSummary = dynamic(() => import("@/components/ColorSummary"), {
  loading: () => <p>Loading...</p>,
});

const DEFAULT_COLOR = "#ffffff";

export default function Component() {
  const colorRef = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState<Color | undefined>();
  const [config, setConfig] = useState<Config>({});

  const hostChannel = useHostChannel({
    onMessage(message) {
      switch (message.type) {
        case "connected": {
          hostChannel.sendMessage({ type: "get:field-value" });
          hostChannel.sendMessage({ type: "get:field-config" });
          hostChannel.sendMessage({
            type: "set:style",
            data: {
              height: "350px",
            },
          });
          hostChannel.sendMessage({
            type: "get:mode",
          });
          return;
        }
        case "field-value": {
          if (message?.data?.color) setColor(message?.data?.color);
          return;
        }
        case "field-config": {
          setConfig(message.data ?? {});
          return;
        }
        case "mode": {
          console.log("From edit component: The current mode is", message.data);
          return;
        }
      }
    },
  });

  const handleClose = () => {
    hostChannel.sendMessage({
      type: "set:field-value",
      data: color ? { color } : undefined,
    });
    hostChannel.sendMessage({ type: "set:mode", data: "view" });
  };

  const handleChange = (color: ColorResult) => {
    const c = color.rgb;
    const hex = colord(`rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`).toHex();
    setColor(hex);
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

  useEffect(() => {
    if (color) {
      return;
    }

    const shade = config.shade ?? "";
    if (shade == "red") {
      setColor("#ff0000");
    } else if (shade == "blue") {
      setColor("#0000ff");
    } else if (shade == "green") {
      setColor("#00ff00");
    }
  }, [color, config]);

  const displayColor = color ?? DEFAULT_COLOR;

  return (
    <div ref={colorRef}>
      <ColorSummary color={color} onClick={() => {}} />
      <div style={styles.popover}>
        <div style={styles.cover} onClick={handleClose} />
        <SketchPicker color={displayColor} onChange={handleChange} />
      </div>
    </div>
  );
}
