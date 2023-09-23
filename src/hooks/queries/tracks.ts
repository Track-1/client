import { useMutation, useQuery } from "react-query";
import {
  deleteTrack,
  getTrackDetail,
  getTrackDownload,
  patchTrack,
  patchTrackClose,
  postTrack,
} from "../../api/tracks";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { FilteredTrackParamsType } from "../../type/tracks";

export function useFilteredTracks(params: FilteredTrackParamsType) {
  //무한스크롤 미적용 (서버아직;;)
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
