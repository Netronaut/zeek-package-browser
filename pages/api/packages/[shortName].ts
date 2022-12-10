import type { NextApiRequest, NextApiResponse } from "next";
import { getPackageByShortName } from "../../../service/package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Package | { error: string }>
) {
  const shortName = req.query.shortName as string;
  const pkg = await getPackageByShortName(shortName);

  if (!pkg) {
    res.status(404).json({ error: `Package ${shortName} not found` });
    return;
  }

  res.status(200).json(pkg);
}
