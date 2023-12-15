import styled, { CSSProperties } from 'styled-components';
import { SectionForm } from './common/sectionForm';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoForm from '../common/Form/trackInfoForm';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

export default function RecentVocalList() {
  const trackTitle = 'JETT (Deep House TRAP BEAT)';
  const test = ['1', '2', '3', '4'];

  return (
    <SectionForm sectionTitle={VOCAL_SECTION_TITLE}>
      <VocalListWrapper>
        {test.map((e) => (
          <VocalTrackWrapper>
            <PlayTrackForm
              iconProperties={iconProperties}
              shapeProperties={shapeProperties}
              isPlaying={false}
              key={e}
            />
            <TrackInfoForm topItem={'Rock'} topItemColor="neon_pink" middleItem={trackTitle}></TrackInfoForm>
          </VocalTrackWrapper>
        ))}
      </VocalListWrapper>
    </SectionForm>
  );
}

const VocalListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3rem;

  width: 100%;
`;

const VocalTrackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;

  width: 100%;
`;

const shapeProperties: CSSProperties = {
  position: 'relative',

  width: '12rem',
  height: '12rem',

  marginRight: '2.5rem',

  borderRadius: '50%',
};

const iconProperties: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
};
