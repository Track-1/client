import ProducerUploadBody from '../@components/upload/producerUploadBody';
import VocalUploadBody from '../@components/upload/vocalUploadBody';
import Layout from '../@components/@common/layout/layout';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../recoil/common/loginUserData';

export default function UploadEditPage() {
  const userType = useRecoilValue(loginUserData).userType;
  const { prevUploadData } = useLocation().state;

  return (
    <Layout>
      {userType === 'producer' && <ProducerUploadBody isEditPage prevUploadData={prevUploadData} />}
      {userType === 'vocal' && <VocalUploadBody isEditPage prevUploadData={prevUploadData} />}
    </Layout>
  );
}
