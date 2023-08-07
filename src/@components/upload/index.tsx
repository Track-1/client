import { USER_DATA } from "../../core/common/userData";
import UploadBody from "./UploadBody";
import UploadHeader from "./UploadHeader";

export default function UploadContainer() {
  return (
    <>
      <UploadHeader />
      <UploadBody userType={USER_DATA.PRODUCER} uploadInitData={null} />
    </>
  );
}
