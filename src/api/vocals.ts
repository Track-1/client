import { FilteredVocalsResponse } from "../type/api";
import { FilteredVocalsParamsType } from "../type/vocals";
import { client } from "./common/client";
import { VOCALS } from "./path";

export async function getFilteredVocals(params: FilteredVocalsParamsType) {
  const { data } = await client.get<FilteredVocalsResponse>(VOCALS.FILTERED_LIST, {
    params: {
      page: params.page,
      limit: params.limit,
      categ: params.categ.length === 0 ? ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] : params.categ,
      trackSearch: params.trackSearch ? true : false,
    },
  });
  return data;
}
