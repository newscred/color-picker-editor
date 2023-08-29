import { Color } from "./types";

export default class HostChannel {
  port?: MessagePort;
  onMessage?: (message: HostMessage) => void;

  constructor(onMessage?: HostChannel["onMessage"]) {
    this.onMessage = onMessage;
    this._onConnected = this._onConnected.bind(this);
  }

  sendMessage(message: ComponentMessage) {
    this.port?.postMessage(message);
  }

  connect() {
    window.addEventListener("message", this._onConnected);
    window.parent.postMessage({ type: "connect" }, "*");
  }

  disconnect() {
    window.removeEventListener("message", this._onConnected);
  }

  _onConnected(event: MessageEvent) {
    if (event.data.type === "connected") {
      this.port = event.ports[0];

      this.port.onmessage = (event) => {
        this.onMessage?.(event.data);
      };

      this.onMessage?.(event.data);
    }
  }
}

type HostMessage =
  | { type: "connected" }
  | {
      type: "field-value";
      data: { color: Color };
    }
  | {
      type: "field-config";
      data: { shade?: string };
    };

type ComponentMessage =
  | { type: "connect" }
  | { type: "get:field-value" }
  | { type: "get:field-config" }
  | {
      type: "set:field-value";
      data: { color: Color };
    }
  | { type: "get:mode" }
  | { type: "set:mode"; data: "view" | "edit" }
  | { type: "set:style"; data: { height: string } };
