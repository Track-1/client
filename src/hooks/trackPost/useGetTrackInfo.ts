import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTrackInfo } from "../../api/trackPost/getTrackInfo";
import { QUERIES_KEY } from "../../core/common/queriesKey";

export default function useGetTrackInfo() {
  const { id } = useParams();

  const { data: trackInfo } = useQuery([QUERIES_KEY.GET_TRACK_INFO], () => getTrackInfo(Number(id)), {
    onError: (error) => {
      console.log(error);
    },
    staleTime: 3000,
  });

  const {
    trackAudioFile,
    rackAudioFileLength,
    trackAudioFileName,
    trackClosed,
    trackId,
    trackImageFile,
    trackTitle,
    trackUserId,
    trackUserName,
    userCategory,
    userImageFile,
    userIntroduction,
    userKeyword,
    userSelf,
  } = trackInfo !== undefined && trackInfo;

  return {
    trackAudioFile,
    rackAudioFileLength,
    trackAudioFileName,
    trackClosed,
    trackId,
    trackImageFile,
    trackTitle,
    trackUserId,
    trackUserName,
    userCategory,
    userImageFile,
    userIntroduction,
    userKeyword,
    userSelf,
  };
}
