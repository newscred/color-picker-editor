import type { NextApiRequest, NextApiResponse } from "next";

type BaseField = {
  label: string;
  required?: boolean;
  disabled?: boolean;
};

export type TextField = BaseField & {
  type: "text";
  maxLength?: number;
  default?: string;
};

export type DropdownField = BaseField & {
  type: "dropdown";
  options: Array<{ label: string; value: string }>;
  default?: string[] | string;
  multivalued?: boolean;
  creatable?: boolean;
};

export type Schema = {
  [key: string]: DropdownField | TextField;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Schema>) => {
  res.status(200).json({
    shade: {
      type: "dropdown",
      label: "Shade",
      options: [
        { label: "Red", value: "red" },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
      ],
    },
  });
};

export default handler;
