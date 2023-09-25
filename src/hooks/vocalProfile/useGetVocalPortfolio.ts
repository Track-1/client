import { useInfiniteQuery } from "react-query";

import { getVocalInfo } from "../../api/profile";

export default function useGetVocalPortfolio(userId: number, limit: number) {
  const {
    data: vocalPortfolios,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["vocalPortfolio", limit],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getVocalInfo({
        userId: userId,
        page: pageParam,
        limit: limit,
      });
      return response;
    },
    getNextPageParam: (hasNextPage, data) => {
      if (!hasNextPage) {
        return undefined;
      }
      const totalPageNum = data.length * limit;
      return totalPageNum;
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });

  console.log(vocalPortfolios);

  return { vocalPortfolios, isLoading, fetchNextPage, hasNextPage };
}
