import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  deleteTrack,
  getFilteredTracks,
  getRecentTracks,
  getTrackDetail,
  getTrackDownload,
  patchTrack,
  patchTrackClose,
  postTrack,
} from '../../api/tracks';
import { QUERIES_KEY } from '../../core/common/queriesKey';
import { FilteredTrackParamsType } from '../../type/tracks';
import { loginUserData } from '../../recoil/common/loginUserData';

export function useFilteredTracks(params: Omit<FilteredTrackParamsType, 'page'>) {
  const fetchTracks = async (pageParams: number) => {
    const response = await getFilteredTracks({ ...params, page: pageParams });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    [QUERIES_KEY.GET_TRACK_INFO, params.categ, params.limit],
    ({ pageParam = 1 }) => fetchTracks(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data[0].trackList.length === 0 ? undefined : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    }
  );

  const trackData = data?.pages.flatMap((data) => data.response.data[0].trackList.map((trackInfo) => trackInfo));

  return {
    trackData,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useTrackDetail(trackId: number) {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.TRACK_DETAIL, trackId],
    queryFn: () => getTrackDetail(trackId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    trackDetail: data,
    ...restValues,
  };
}

export function useTrackDownload(trackId: number, isDownload: boolean | undefined, getFileLink: (data: any) => void) {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.TRACK_DOWNLOAD, trackId],
    queryFn: () => getTrackDownload(trackId),
    onSuccess: (data) => {
      getFileLink(data);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!isDownload,
  });

  return {
    trackDownload: data,
    ...restValues,
  };
}

export function useUploadTrack() {
  const navigate = useNavigate();
  const prevURL = useLocation().state?.prevURL;
  const userId = useRecoilValue(loginUserData).userId;

  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postTrack(formData),
    onSuccess: (data) => {
      setTimeout(() => {
        if (prevURL === '/signup/success') {
          navigate(`/producer-profile/${userId}`, {
            state: {
              prevURL: '/track-search',
            },
          });
        } else {
          navigate(-1);
        }
      }, 3000);
    },
    onError: () => {},
  });
  return {
    uploadTrack: mutate,
    ...restValues,
  };
}

export function useEditTrack() {
  const navigate = useNavigate();
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, uploadData }: { trackId: number; uploadData: FormData }) => patchTrack(trackId, uploadData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editTrack: mutate,
    ...restValues,
  };
}

export function useCloseTrack() {
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (trackId: number) => patchTrackClose(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.TRACK_DETAIL);
    },
    onError: () => {},
  });
  return {
    closeTrack: mutate,
    ...restValues,
  };
}

export function useDeleteTrack() {
  const queryClient = useQueryClient();
  const { mutate, ...restValues } = useMutation({
    mutationFn: (trackId: number) => deleteTrack(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries('producerVocalSearchings');
    },
    onError: () => {},
  });
  return {
    deleteTrack: mutate,
    ...restValues,
  };
}

export function useGetRecentTracks(count: number) {
  const { data: recentTrackInfo } = useQuery(['getRecentTracks'], () => getRecentTracks(count), {
    onError: (err) => {
      console.log(err);
    },
  });

  return { recentTrackInfo };
}
