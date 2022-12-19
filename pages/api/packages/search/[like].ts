import type { NextApiRequest, NextApiResponse } from "next";
import { getAllPackages } from "service/package";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PackageSearchResult[]>
) {
  const like = decodeURI(req.query.like as string);
  const pkgs = await getAllPackages(
    `name like '%${like}%' or short_name like '%${like}%'`
  );

  res
    .status(200)
    .json(
      pkgs.map(({ id, name, shortName }) => ({
        id,
        name: name.split("/").slice(1).join("/"),
        shortName,
      }))
    );
}
