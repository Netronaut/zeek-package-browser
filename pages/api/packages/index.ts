import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPackages } from "../../../service/package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Package[]>
) {
  res.status(200).json(await getAllPackages());
}
