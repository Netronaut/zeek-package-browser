import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs/promises";

async function getDb() {
  const dbFile = path.join(process.cwd(), "pkgs.sqlite");
  return open({
    filename: dbFile,
    driver: sqlite3.Database,
  });
}

export async function getAllShortNames() {
  const db = await getDb();
  return db.all<Pick<Package, "short_name">[]>(
    "select short_name from packages"
  );
}

export async function getAllPackages() {
  const db = await getDb();
  return db.all<Package[]>("select * from packages;");
}

export async function getPackageByShortName(shortName: string) {
  const db = await getDb();
  return db.get<Package>(
    "select * from packages where short_name = ?",
    shortName
  );
}
