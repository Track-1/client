import UploadBody from "../@components/@common/upload/uploadBody";
import UploadHeader from "../@components/@common/upload/uploadHeader";

export default function UploadPage() {
  return (
    <>
      <UploadHeader isUploadActive={true} />
      <UploadBody />
    </>
  );
}
