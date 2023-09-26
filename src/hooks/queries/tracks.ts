import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import {
  deleteTrack,
  getFilteredTracks,
  getTrackDetail,
  getTrackDownload,
  patchTrack,
  patchTrackClose,
  postTrack,
} from "../../api/tracks";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { FilteredTrackParamsType } from "../../type/tracks";

export function useFilteredTracks(params: Omit<FilteredTrackParamsType, "page">) {
  const pageParams = 1;
  const fetchTracks = async (pageParams: number) => {
    const response = await getFilteredTracks({ ...params, page: pageParams });
    return { response, nextPage: pageParams + 1 };
  };
  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "tracks",
    () => fetchTracks(pageParams),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage;
      },
    },
  );

  return {
    trackData: data?.pages,
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

export function useTrackDownload(trackId: number) {
  const { data, ...restValues } = useQuery({
    queryKey: [QUERIES_KEY.TRACK_DOWNLOAD, trackId],
    queryFn: () => getTrackDownload(trackId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    trackDownload: data,
    ...restValues,
  };
}

export function useUploadTrack() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postTrack(formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });
  return {
    uploadTrack: mutate,
    ...restValues,
  };
}

export function useEditTrack() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) => patchTrack(trackId, formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });
  return {
    editTrack: mutate,
    ...restValues,
  };
}

export function useCloseTrack() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (trackId: number) => patchTrackClose(trackId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    closeTrack: mutate,
    ...restValues,
  };
}

export function useDeleteTrack() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (trackId: number) => deleteTrack(trackId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    deleteTrack: mutate,
    ...restValues,
  };
}
