import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getComment } from "../../api/trackPost/getComment";
import { QUERIES_KEY } from "../../core/common/queriesKey";

export default function useGetComment(page: number) {
  const { id } = useParams();

  const { data: trackComments } = useQuery([QUERIES_KEY.GET_TRACK_COMMENT], () => getComment(page, Number(id)), {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });

  return { trackComments };
}
