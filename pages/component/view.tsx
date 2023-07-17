import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
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
            height: "50px",
          });
          return;
        }
        case "field-value": {
          if (message?.content?.color) setColor(message?.content?.color);
          return;
        }
        case "field-config": {
          setConfig(message.config ?? "{}");
          return;
        }
      }
    },
  });

  const handleClick = () => {
    hostChannel.sendMessage({ type: "set:mode", mode: "edit" });
  };

  useEffect(() => {
    const shade = JSON.parse(config).shade ?? "none";
    if (shade == "red") {
      setColor({
        r: 255,
        g: 0,
        b: 0,
        a: 1,
      });
    } else if (shade == "blue") {
      setColor({
        r: 0,
        g: 0,
        b: 255,
        a: 1,
      });
    } else if (shade == "green") {
      setColor({
        r: 0,
        g: 255,
        b: 0,
        a: 1,
      });
    }
  }, [config]);

  return (
    <div ref={colorRef}>
      <ColorSummary color={color} onClick={handleClick} />
    </div>
  );
}
