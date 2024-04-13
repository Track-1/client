import { useQuery } from 'react-query';
import { getRecentTracks } from '../../api';

export function useGetRecentTracks(count: number) {
  const { data: recentTrackInfo } = useQuery(['getRecentTracks'], () => getRecentTracks(count), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return { recentTrackInfo };
}
