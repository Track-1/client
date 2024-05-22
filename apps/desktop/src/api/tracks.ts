import axios from 'axios';
import {
  DefaultResponseType,
  FilteredTrackResponse,
  RecentTracksResponse,
  TrackDetailResponse,
  TrackDownloadResponse,
} from '../type/api';
import { client } from './common/client';
import { TRACKS } from './path';

export async function getFilteredTracks() {
  const { data } = await client.get<FilteredTrackResponse>(TRACKS.FILTERED_LIST);
  return data;
}

export async function getTrackDetail() {
  const { data } = await client.get<TrackDetailResponse>(TRACKS.DETAIL);
  return data.data;
}

export async function getTrackDownload(trackId: number) {
  const { data } = await client.get<TrackDownloadResponse>(TRACKS.DOWNLOAD(trackId));

  const res = await axios.get(data.data.trackAudioFile, {
    responseType: 'blob',
  });

  return res;
}

export async function postTrack(formData: FormData) {
  const { data } = await client.post<DefaultResponseType>(TRACKS.POST, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function patchTrack(trackId: number, formData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(TRACKS.DETAIL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function patchTrackClose(trackId: number) {
  const { data } = await client.patch<DefaultResponseType>(TRACKS.TRACK_CLOSE);
  return data;
}

export async function deleteTrack(trackId: string) {
  const { data } = await client.delete<DefaultResponseType>(TRACKS.DETAIL);
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
