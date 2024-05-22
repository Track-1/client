export function updateQueryParams(queryKey: string, queryParams: string[]) {
  const queryString = queryParams.map((query) => `${queryKey}=${query}`).join("&");

  return `?${queryString}`;
}
