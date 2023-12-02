import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import ProducerUploadBody from "../@components/upload/producerUploadBody";
import VocalUploadBody from "../@components/upload/vocalUploadBody";
import { loginUserType } from "../recoil/common/loginUserData";

export default function UploadEditPage() {
  const [user] = useRecoilState(loginUserType);
  const { prevUploadData } = useLocation().state;

  if (user === "producer") {
    return <ProducerUploadBody isEditPage prevUploadData={prevUploadData} />;
  }
  if (user === "vocal") {
    return <VocalUploadBody isEditPage prevUploadData={prevUploadData} />;
  }

  return null;
}
