import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Process a GET request
    console.log(req.body);
    res.send("hello");
  }
  if (req.method === "POST") {
    console.log(req.body);
  }
}
