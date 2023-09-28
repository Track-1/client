import { useInfiniteQuery } from "react-query";

import { getVocalInfo } from "../../api/profile";
import { VocalsPortfoliosParamsType } from "../../type/vocals";

export default function useGetVocalPortfolio(params: Omit<VocalsPortfoliosParamsType, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getVocalInfo({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "vocals",
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const vocalPortfolios = data?.pages.flatMap((data) => data.response.data.map((vocalPortfolio) => vocalPortfolio));

  return {
    vocalPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}
