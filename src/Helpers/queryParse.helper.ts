import { IQueryParse } from "../Types/types";

export function queryParse(searchParams: string) {
  const params = searchParams.replace("?", "").split("&");

  const query: IQueryParse = {};
  params.forEach((param) => {
    const pair = param.split("=");
    query[pair[0]] = pair[1];
  });

  return query;
}
