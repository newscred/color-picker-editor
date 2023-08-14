import type { NextApiRequest, NextApiResponse } from "next";

type Settings = {
  [key: string]: {
    label: string;
    required?: boolean;
    default?: string;
  } & (
    | { type: "dropdown"; options: Array<{ label: string; value: string }> }
    | { type: "text"; maxLength?: number }
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Settings>) => {
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
