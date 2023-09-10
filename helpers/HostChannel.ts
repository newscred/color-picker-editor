import { ComponentMessage, HostMessage } from "./types";

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
