import ProducerUploadBody from '../@components/upload/producerUploadBody';
import VocalUploadBody from '../@components/upload/vocalUploadBody';
import Layout from '../@components/@common/layout/layout';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../recoil/common/loginUserData';

export default function UploadPage() {
  const userType = useRecoilValue(loginUserData).userType;

  return (
    <Layout>
      {userType === 'producer' && <ProducerUploadBody isEditPage={false} />}
      {userType === 'vocal' && <VocalUploadBody isEditPage={false} />}
    </Layout>
  );
}
