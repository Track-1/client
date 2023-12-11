import styled, { CSSProperties } from 'styled-components';
import { SectionForm } from './common/sectionForm';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoForm from '../common/Form/trackInfoForm';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

export default function RecentTrackList() {
  const trackTitle = 'JETT (Deep House TRAP BEAT)';
  const test = ['1', '2', '3', '4'];

  return (
    <SectionForm sectionTitle={TRACK_SECTION_TITLE}>
      <TrackListWrapper>
        {test.map((e) => (
          <TrackWrapper>
            <PlayTrackForm iconProperties={iconProperties} shapeProperties={shapeProperties} isPlaying={true} key={e} />
            <TrackInfoForm topItem={'Rock'} topItemColor="neon_green" middleItem={trackTitle}></TrackInfoForm>
          </TrackWrapper>
        ))}
      </TrackListWrapper>
    </SectionForm>
  );
}

const TrackListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  gap: 3rem 2rem;

  width: 100%;
`;

const TrackWrapper = styled.li`
  width: 16rem;
`;

const shapeProperties: CSSProperties = {
  position: 'relative',

  width: '16rem',
  height: '16rem',

  marginBottom: '1rem',
};

const iconProperties: CSSProperties = {
  position: 'absolute',

  right: '1rem',
  bottom: '1rem',
};
