export type Mode = "view" | "edit";
export type Color = string;

export type Config = {
  shade?: string;
};

export type Context = {
  taskId: string;
  contentGuid: string;
};

export type HostMessage =
  | { type: "connected" }
  | {
      type: "field-value";
      data: { color: Color } | undefined;
    }
  | {
      type: "field-config";
      data: Config;
    }
  | {
      type: "mode";
      data: Mode;
    }
  | {
      type: "field-context";
      data: Context;
    };

export type ComponentMessage =
  | { type: "connect" }
  | { type: "get:field-value" }
  | { type: "get:field-config" }
  | { type: "get:field-context" }
  | {
      type: "set:field-value";
      data: { color: Color } | undefined;
    }
  | { type: "get:mode" }
  | { type: "set:mode"; data: Mode }
  | { type: "set:style"; data: { height: string } };
