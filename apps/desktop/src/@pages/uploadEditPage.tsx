import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ProducerUploadBody from '../@components/upload/producerUploadBody';
import VocalUploadBody from '../@components/upload/vocalUploadBody';
import { loginUserData } from '../recoil/common/loginUserData';
import Layout from '../@components/@common/Layout';

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
