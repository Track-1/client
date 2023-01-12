import UploadHeader from "../@components/@common/uploadHeader";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useRecoilValue } from "recoil";
import { UserType } from "../recoil/main";
import { useParams } from "react-router-dom";

export default function UploadPage() {
  const userType = useRecoilValue(UserType);
  const {producerUploadType}=useParams();


  return (
    <>
      <UploadHeader userType={userType} producerUploadType={producerUploadType} />
      {userType === "producer" ? <TrackUpload /> : <VocalUpload />}
    </>
  );
}
