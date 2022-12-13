import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const fieldNameMap: Record<string, string> = {
  id: "id",
  name: "name",
  author: "author",
  url: "url",
  readme: "readme",
  created: "created",
  modified: "modified",
  /* change case */
  short_name: "shortName",
  readme_name: "readmeName",
  subscribers_count: "subscribersCount",
  stargazers_count: "stargazersCount",
  open_issues_count: "openIssuesCount",
  forks_count: "forksCount",
  pushed_at: "pushedAt",
};

function select(select: string | string[] = []) {
  if (typeof select === "string") {
    return Object.keys(fieldNameMap)
      .map((key) => `${key} as ${fieldNameMap[key]}`)
      .join(", ");
  }
  const projection = select.length
    ? select.map((key) => (key in fieldNameMap ? fieldNameMap[key] : key))
    : ["*"];
  return projection.join(", ");
}

async function getDb() {
  const dbFile = path.join(process.cwd(), "pkgs.sqlite");
  return open({
    filename: dbFile,
    driver: sqlite3.Database,
  });
}

export async function getAllNames() {
  const db = await getDb();
  const result = await db.all<Pick<Package, "name">[]>(
    `select ${select(["name"])} from packages`
  );

  return result.map(({ name }) => name);
}

export async function getAllPackages() {
  const db = await getDb();
  return db.all<Package[]>(`select ${select("*")} from packages;`);
}

export async function getPackageByName(name: string) {
  const db = await getDb();
  return db.get<Package>(
    `select ${select("*")} from packages where name = ?`,
    name
  );
}
