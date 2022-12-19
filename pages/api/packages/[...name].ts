import type { NextApiRequest, NextApiResponse } from "next";
import { getPackageByName } from "service/package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Package | { error: string }>
) {
  const name = req.query.name as string[];
  const pkg = await getPackageByName(name.join("/"));

  if (!pkg) {
    return res.status(404).json({ error: `Package '${name}' not found` });
  }

  res.status(200).json(pkg);
}
