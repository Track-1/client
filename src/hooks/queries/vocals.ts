import { useInfiniteQuery } from "react-query";
import { getFilteredVocals } from "../../api/vocals";
import { FilteredVocalsParamsType } from "../../type/vocals";

export function useFilteredVocals(params: Omit<FilteredVocalsParamsType, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getFilteredVocals({ ...params, page: pageParams });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "vocals",
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data[0].vocalList.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const vocalData = data?.pages.flatMap((data) => data.response.data[0].vocalList.map((trackInfo) => trackInfo));

  return {
    vocalData,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}
