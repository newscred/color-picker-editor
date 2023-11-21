import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import useHostChannel from "@/hooks/useHostChannel";
import { Color, Config } from "@/helpers/types";

const ColorSummary = dynamic(() => import("@/components/ColorSummary"), {
  loading: () => <p>Loading...</p>,
});


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
              height: "50px",
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
          console.log("From view component: The current mode is", message.data);
          return;
        }
      }
    },
  });

  const handleClick = () => {
    hostChannel.sendMessage({ type: "set:mode", data: "edit" });
  };

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

  return (
    <div ref={colorRef}>
      <ColorSummary color={color} onClick={handleClick} />
    </div>
  );
}
