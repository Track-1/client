import styled from 'styled-components';
import HotTrack from './hotTrack';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import HotEvent from './hotEvent';
import { StyledLined } from '../common/DivisionLine';
import { PlayerProvider } from '../../context/playerContext';

export default function MainContainer() {
  return (
    <>
      <HotTrack />
      <RecentTrackList />
      <SectionDivider />
      <RecentVocalList />
      <SectionDivider />
      <HotEvent />
    </>
  );
}

const SectionDivider = styled(StyledLined)`
  margin: 7rem 0;
`;
