import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTrackInfo } from "../../api/trackPost/getTrackInfo";

export default function useGetTrackInfo() {
  const { id } = useParams();

  const { data: trackInfo } = useQuery(["getTrackInfo"], () => getTrackInfo(Number(id)), {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });

  const {
    beatId,
    jacketImage,
    beatWavFile,
    title,
    producerName,
    producerId,
    producerProfileImage,
    introduce,
    keyword,
    category,
    isMe,
    wavFileLength,
    isClosed,
  } = trackInfo !== undefined && trackInfo;

  return {
    beatId,
    jacketImage,
    beatWavFile,
    title,
    producerName,
    producerId,
    producerProfileImage,
    introduce,
    keyword,
    category,
    isMe,
    wavFileLength,
    isClosed,
  };
}
