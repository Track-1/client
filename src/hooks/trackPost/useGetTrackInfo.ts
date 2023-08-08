import { useQuery } from "react-query";
import { getTrackInfo } from "../../api/trackPost/getTrackInfo";

export default function useGetTrackInfo() {
  const { data: trackInfo } = useQuery(["getTrackInfo"], () => getTrackInfo(7), {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });

  return { trackInfo };
}
