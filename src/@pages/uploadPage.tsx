import UploadHeader from "../@components/@common/uploadHeader";
import TrackUpload from "../@components/upload/trackUpload";
import VocalUpload from "../@components/upload/vocalUpload";
import { useRecoilValue } from "recoil";
import { UserType } from "../recoil/main";

export default function UploadPage() {
  const userType = useRecoilValue(UserType);
  const producerUploadState = "Portfolio";
  // const [producerUploadState, setProducerUploadState] = useState<string>("Portfolio");

  return (
    <>
      <UploadHeader userType={userType} producerUploadType={producerUploadState} />
      {userType === "producer" ? <TrackUpload /> : <VocalUpload />}
    </>
  );
}
