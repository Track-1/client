import { useRecoilValue } from 'recoil';
import ProducerProfileEditContainer from '../@components/profileEdit/producerProfileEdit/producerProfileEditContainer';
import VocalProfileEditContainer from '../@components/profileEdit/vocalProfileEdit/vocalProfileEditContainer';
import { loginUserData } from '../recoil/common/loginUserData';
import Layout from '../@components/@common/Layout';

export default function ProfileEditPage() {
  const userType = useRecoilValue(loginUserData).userType;

  return <Layout>{userType === 'producer' ? <ProducerProfileEditContainer /> : <VocalProfileEditContainer />};</Layout>;
}
