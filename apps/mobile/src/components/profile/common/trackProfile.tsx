import styled from 'styled-components';
import { UserType } from '../../../type/common/userType';
import TrackProfileToggleBtn from './trackProfileToggleBtn';
import TrackInfoForm from '../../common/Form/trackInfoForm';
import { ProducerInfoType, VocalProfileType } from '../../../type/profile';

interface TrackProfileProps {
  userType: UserType;
  profileInfo: VocalProfileType | ProducerInfoType | undefined;
}
export default function TrackProfile(props: TrackProfileProps) {
  const { userType, profileInfo } = props;

  const test = ['1', '2'];
  return (
    <>
      <TrackProfileToggleBtn userType={userType} />

      <Container>
        {}
        {test.map((key) => (
          <TrackInfoForm imageSrc="" />
        ))}
      </Container>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5rem;

  width: 100%;

  margin-top: 3rem;
`;
