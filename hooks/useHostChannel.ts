import HostChannel from "@/helpers/HostChannel";
import { useEffect, useState } from "react";
import { useEvent } from "./useEvent";

export default function useHostChannel(
  options: {
    onMessage?: HostChannel["onMessage"];
  } = {},
) {
  const onMessage = useEvent(options.onMessage);
  const [hostChannel] = useState(() => new HostChannel(onMessage));

  useEffect(() => {
    hostChannel.connect();
    return () => {
      hostChannel.disconnect();
    };
  }, [hostChannel]);

  return hostChannel;
}
