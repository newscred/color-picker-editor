import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>
) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST method allowed" });
    return;
  }

  const color = req.body.color;

  if (typeof color !== "string") {
    return res.status(422).json({ message: "No 'color' hex string found" });
  }
  
  if (!color.match(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i)) {
    return res.status(422).json({ message: `'${color}' is not a valid hex color string` });
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
