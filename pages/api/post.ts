// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  title: string
  description: string
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      const { title, description } = req.body;

      const newPost = await prisma.post.create({
        data: {
          title,
          description,
        },
      })
      res.status(200).json("New post successfully created");
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  }

  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `HTTP method ${req.method} is not supported.` });
  }


}
