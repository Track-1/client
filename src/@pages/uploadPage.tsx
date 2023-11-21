import { useRecoilState } from "recoil";
import ProducerUploadBody from "../@components/upload/producerUploadBody";
import VocalUploadBody from "../@components/upload/vocalUploadBody";
import { loginUserType } from "../recoil/common/loginUserData";

export default function UploadPage() {
  const [user] = useRecoilState(loginUserType);

  if (user === "producer") {
    return <ProducerUploadBody isEditPage={false} />;
  }
  if (user === "vocal") {
    return <VocalUploadBody isEditPage={false} />;
  }

  return null;
}
