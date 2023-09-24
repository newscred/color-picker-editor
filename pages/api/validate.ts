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

  let errorMessage = null;
  if (typeof color !== "string") {
    errorMessage = "No 'color' hex string found";
  } else if (!color.match(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i)) {
    errorMessage = `'${color}' is not a valid hex color string`;
  }

  if (errorMessage) {
    res.status(422).json({ message: errorMessage });
    return;
  }

  res.status(200).json({ message: "OK" });
};

export default handler;
