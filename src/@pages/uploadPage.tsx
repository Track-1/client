import UploadBody from "../@components/upload/uploadBody";
import UploadHeader from "../@components/upload/uploadHeader";

export default function UploadPage() {
  return (
    <>
      <UploadHeader isUploadActive={true} />
      <UploadBody />
    </>
  );
}
