import { useInfiniteQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getComment } from "../../api/trackPost/getComment";
import { QUERIES_KEY } from "../../core/common/queriesKey";

export default function useGetComment() {
  const { id } = useParams();

  // const { data: trackComments } = useQuery([QUERIES_KEY.GET_TRACK_COMMENT], () => getComment(page, Number(id)), {
  //   onError: (error) => {
  //     console.log(error);
  //   },
  //   staleTime: 3000,
  // });

  const pageParam = 1;

  const {
    data: trackComments,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery([QUERIES_KEY.GET_TRACK_COMMENT], () => getInfiniteComment(pageParam, Number(id)), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.nextPage;
    },
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });

  async function getInfiniteComment(pageParam: number, trackId: number) {
    if (hasNextPage !== false) {
      const response = await getComment(pageParam, trackId);
      return { response, nextPage: pageParam + 1 };
    }
  }

  return { trackComments, fetchNextPage, hasNextPage };
}
