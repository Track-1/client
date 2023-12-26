import { useParams } from 'react-router-dom';
import UserProfile from './common/userProfile';
import { useGetProducerProfile } from '../../hooks/queries/mypage';
import TrackProfile from './common/trackProfile';

export default function ProducerProfileContainer() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  return (
    <>
      <UserProfile userType="producer" profileInfo={producerProfile} />
      <TrackProfile userType="producer" profileInfo={producerProfile} />
    </>
  );
}
