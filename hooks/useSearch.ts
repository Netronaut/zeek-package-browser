import { useFetch } from "usehooks-ts";

const searchNamesUrl = "/api/packages/search";

export function useSearch(key: string) {
  const url = `${searchNamesUrl}/${encodeURI(key)}`;
  const { data, error } = useFetch<PackageSearchResult[]>(url);

  if (error) {
    console.error(error);
  }

  return data ? data : [];
}
