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

export default function MainContainer() {
  const userType = useRecoilValue(loginUserType);

  return (
    <>
      <HotTrack />
      {checkIsLogin() && isProducer(userType) ? (
        <>
          <RecentVocalList />
          <SectionDivider />
          <RecentTrackList />
          <SectionDivider />
        </>
      ) : (
        <>
          <RecentTrackList />
          <SectionDivider />
          <RecentVocalList />
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
