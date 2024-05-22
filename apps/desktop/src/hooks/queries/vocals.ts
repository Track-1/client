import { useInfiniteQuery, useQuery } from 'react-query';
import { getFilteredVocals, getRecentVocals } from '../../api/vocals';
import { QUERIES_KEY } from '../../core/common/queriesKey';
import { FilteredVocalsParamsType } from '../../type/vocals';
import { EventLowerCategoryId } from '../../core/common/categories';

export function useFilteredVocals(params: Omit<FilteredVocalsParamsType, 'page'>) {
  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    [QUERIES_KEY.GET_VOCAL_INFO, params.categ, params.trackSearch],
    getFilteredVocals,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.vocalList.length === 0 ? undefined : 1;
      },
      refetchOnWindowFocus: false,
      select: (data) => {
        return {
          pageParams: data.pageParams,
          pages: data.pages.flatMap((data) =>
            data.data.vocalList.filter((item) =>
              params.categ.length > 0 ? params.categ.includes(EventLowerCategoryId[item.userCategory[0]]) : item
            )
          ),
        };
      },
    }
  );
  const allDatas = data?.pages.flatMap((data) => data);

  return {
    vocalData: allDatas,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetRecentVocals(count: number) {
  const { data: recentVocalInfo } = useQuery(['getRecentVocals'], () => getRecentVocals(count), {
    onError: (err) => {
      console.log(err);
    },
  });

  return { recentVocalInfo };
}
