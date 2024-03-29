import styled from 'styled-components';
import HotTrack from './hotTrack';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import HotEvent from './hotEvent';
import { StyledDivisionLine } from '../common/DivisionLine';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';
import { checkIsLogin, isProducer } from '../../utils/common/check';
import { FilteredVocalType } from '../../type/vocals';
import { useState } from 'react';
import { FilteredTrackType } from '../../type/tracks';

export default function MainContainer() {
  const { userType } = useRecoilValue(loginUserData);
  const [playingTrack, setPlayingTrack] = useState<FilteredTrackType['trackId'] | FilteredVocalType['userId'] | null>(
    null
  );

  function selectTrack<T extends FilteredTrackType['trackId'] | FilteredVocalType['userId']>(trackId: T) {
    setPlayingTrack(trackId);
  }

  return (
    <>
      <HotTrack />
      {checkIsLogin() && isProducer(userType) ? (
        <>
          <RecentVocalList playingTrack={playingTrack} selectTrack={selectTrack<FilteredVocalType['userId']>} />
          <SectionDivider />
          <RecentTrackList playingTrack={playingTrack} selectTrack={selectTrack<FilteredTrackType['trackId']>} />
          <SectionDivider />
        </>
      ) : (
        <>
          <RecentTrackList playingTrack={playingTrack} selectTrack={selectTrack<FilteredTrackType['trackId']>} />
          <SectionDivider />
          <RecentVocalList playingTrack={playingTrack} selectTrack={selectTrack<FilteredVocalType['userId']>} />
          <SectionDivider />
        </>
      )}

      <HotEvent />
    </>
  );
}

const SectionDivider = styled(StyledDivisionLine)`
  margin-top: 7rem;
  margin-bottom: 7rem;
`;
