import { checkIsLogin, checkIsProducer, getRecentTracks, useGetRecentTracks } from 'track-1-shared';
import { useQuery } from 'react-query';
import MainBanner from './mainBanner';
import AlbumCard from 'src/components/Common/UI/AlbumCard';
import { useRecoilValue } from 'recoil';
import { loginUserData } from 'src/recoil/common/loginUserData';
import { RecentTrackList } from './recentTrackList';
import RecentVocalList from './recentVocalList';

export default function MainPageContainer() {
  const { userType } = useRecoilValue(loginUserData);

  return (
    <>
      <MainBanner />
      {checkIsLogin() && checkIsProducer(userType) ? (
        <>
          {/* <RecentVocalList playingTrack={playingTrack} selectTrack={selectTrack<FilteredVocalType['userId']>} /> */}

          {/* <SectionDivider /> */}
          <RecentVocalList />
          <RecentTrackList />

          {/* <SectionDivider /> */}
        </>
      ) : (
        <>
          {/* <RecentTrackList playingTrack={playingTrack} selectTrack={selectTrack<FilteredTrackType['trackId']>} /> */}
          <RecentTrackList />
          <RecentVocalList />
          {/* <SectionDivider />

          <RecentVocalList playingTrack={playingTrack} selectTrack={selectTrack<FilteredVocalType['userId']>} />
          <SectionDivider /> */}
        </>
      )}
    </>
  );
}
