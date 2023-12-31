import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: Response) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST method allowed" });
    return;
  }

  const shade = req.body.shade;
  const validShades = ["red", "green", "blue"];
  if (shade !== undefined && !validShades.includes(shade)) {
    res.status(422).json({
      message: `Shade cannot be ${shade}`,
      details: {
        shade: {
          message: `Shade cannot be ${shade}`,
        },
      },
    });
    return;
  }

  res.status(200).json({ message: "OK" });
};

type Response = NextApiResponse<{
  message: string;
  details?: {
    [key: string]: { message: string };
  };
}>;

export default handler;
