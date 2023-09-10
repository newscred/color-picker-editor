export type Color = string;

export type Config = {
  shade?: string;
};

export type HostMessage =
  | { type: "connected" }
  | {
      type: "field-value";
      data: { color: Color };
    }
  | {
      type: "field-config";
      data: Config;
    };

export type ComponentMessage =
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
