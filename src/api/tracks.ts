import { DefaultResponseType, FilteredTrackResponse, TrackDetailResponse, TrackDownloadResponse } from "../type/api";
import { FilteredTrackParamsType } from "../type/tracks";
import { client } from "./common/client";
import { TRACKS } from "./path";

export async function getFilteredTracks(params: FilteredTrackParamsType) {
  const { data } = await client.get<FilteredTrackResponse>(TRACKS.FILTERED_LIST, {
    params: {
      page: params.page,
      limit: params.limit,
      categ: params.categ,
    },
  });

  return data;
}

export async function getTrackDetail(trackId: number) {
  const { data } = await client.get<TrackDetailResponse>(TRACKS.DETAIL(trackId));
  return data.data;
}

export async function getTrackDownload(trackId: number) {
  const { data } = await client.get<TrackDownloadResponse>(TRACKS.DOWNLOAD(trackId));
  return data;
}

export async function postTrack(uploadData: FormData) {
  const { data } = await client.post<DefaultResponseType>(TRACKS.POST, uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjkyMjAwMDkxLCJleHAiOjE2OTczODQwOTF9.3WlB_9XRaf0_rGC3J8iY6qHkSOU7nMUL-YXO-_cIFH0`,
    },
  });
  return data;
}

export async function patchTrack(trackId: number, uploadData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(TRACKS.DETAIL(trackId), uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchTrackClose(trackId: number) {
  const { data } = await client.patch<DefaultResponseType>(TRACKS.TRACK_CLOSE(trackId));
  return data;
}

export async function deleteTrack(trackId: number) {
  const { data } = await client.delete<DefaultResponseType>(TRACKS.DETAIL(trackId));
  return data;
}
