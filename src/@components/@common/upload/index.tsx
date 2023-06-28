import UploadBody from "./uploadBody";
import UploadHeader from "./uploadHeader";

export default function Upload() {
  
  return (
    <>
      <UploadHeader isUploadActive={true} />
      <UploadBody />
    </>
  );
}
