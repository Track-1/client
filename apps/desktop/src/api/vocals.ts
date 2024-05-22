import { FilteredVocalsResponse, RecentVocalsResponse } from '../type/api';
import { client } from './common/client';
import { VOCALS } from './path';

export async function getFilteredVocals() {
  const { data } = await client.get<FilteredVocalsResponse>(VOCALS.FILTERED_LIST);
  return data;
}

export async function getRecentVocals(count: number) {
  const { data } = await client.get<RecentVocalsResponse>(VOCALS.RECENT_VOCALS(count), {
    headers: {
      count: count,
    },
  });
  return data.data;
}
