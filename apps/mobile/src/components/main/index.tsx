import styled from 'styled-components';
import HotTrack from './hotTrack';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import HotEvent from './hotEvent';
// import DivisionLine from '../common/DivisionLine';
import { StyledLined } from '../common/DivisionLine';

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
