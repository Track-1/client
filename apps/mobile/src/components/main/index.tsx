import styled from 'styled-components';
import Layout from '../layout';
import HotTrack from './hotTrack';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import HotEvent from './hotEvent';

export default function MainContainer() {
  return (
    <>
      <HotTrack />
      <RecentTrackList />
      <RecentVocalList />
      <HotEvent />
    </>
  );
}
