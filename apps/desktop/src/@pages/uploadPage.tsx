import { useRecoilValue } from 'recoil';
import ProducerUploadBody from '../@components/upload/producerUploadBody';
import VocalUploadBody from '../@components/upload/vocalUploadBody';
import { loginUserData } from '../recoil/common/loginUserData';
import Layout from '../@components/@common/Layout';

export default function UploadPage() {
  const userType = useRecoilValue(loginUserData).userType;

  return (
    <Layout>
      {userType === 'producer' && <ProducerUploadBody isEditPage={false} />}
      {userType === 'vocal' && <VocalUploadBody isEditPage={false} />}
    </Layout>
  );
}
