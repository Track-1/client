import styled from 'styled-components';
import HotTrack from './hotTrack';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import HotEvent from './hotEvent';
import { StyledLined } from '../common/DivisionLine';
import { PlayerProvider } from '../../context/playerContext';
import { useRecoilValue } from 'recoil';
import { loginUserType } from '../../recoil/common/loginUserData';
import { checkIsLogin, isProducer } from '../../utils/common/check';
import Player from '../common/Player/player';
import { FilteredVocalType } from '../../type/vocals';
import { useState } from 'react';
import { FilteredTrackType } from '../../type/tracks';

export default function MainContainer() {
  const userType = useRecoilValue(loginUserType);
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

const SectionDivider = styled(StyledLined)`
  margin: 7rem 0;
`;
