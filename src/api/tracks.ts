import axios from "axios";
import {
  DefaultResponseType,
  FilteredTrackResponse,
  RecentTracksResponse,
  TrackDetailResponse,
  TrackDownloadResponse,
} from "../type/api";
import { FilteredTrackParamsType } from "../type/tracks";
import { client } from "./common/client";
import { TRACKS } from "./path";

export async function getFilteredTracks(params: FilteredTrackParamsType) {
  const { data } = await client.get<FilteredTrackResponse>(TRACKS.FILTERED_LIST, {
    params: {
      page: params.page,
      limit: params.limit,
      categ: params.categ.length === 0 ? ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] : params.categ,
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

  const res = await axios.get(data.data.trackAudioFile, {
    responseType: "blob",
  });

  return res;
}

export async function postTrack(formData: FormData) {
  const { data } = await client.post<DefaultResponseType>(TRACKS.POST, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchTrack(trackId: number, formData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(TRACKS.DETAIL(trackId), formData, {
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

export async function getRecentTracks(count: number) {
  const { data } = await client.get<RecentTracksResponse>(TRACKS.RECENT_TRACKS(count), {
    headers: {
      count: count,
    },
  });
  return data.data;
}
