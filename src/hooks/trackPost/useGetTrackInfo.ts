import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTrackInfo } from "../../api/trackPost/getTrackInfo";

export default function useGetTrackInfo() {
  const { beatId } = useParams();

  const { data: trackInfo } = useQuery(["getTrackInfo"], () => getTrackInfo(Number(beatId)), {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });
  return { trackInfo };
}
