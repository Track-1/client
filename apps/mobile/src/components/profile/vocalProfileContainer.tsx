import { useParams } from 'react-router-dom';
import TrackProfile from './common/trackProfile';
import UserProfile from './common/userProfile';
import { useGetVocalProfile } from '../../hooks/queries/mypage';

export default function VocalProfileContainer() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));

  return (
    <>
      <UserProfile userType="vocal" profileInfo={vocalProfile} />
      <TrackProfile userType="vocal" profileInfo={vocalProfile} />
    </>
  );
}
