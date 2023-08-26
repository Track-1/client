import { ROLE } from "../../core/common/roleType";
import UploadBody from "./UploadBody";
import UploadHeader from "./UploadHeader";

export default function UploadContainer() {
  return (
    <>
      <UploadHeader initEmptyData={true} />
      <UploadBody roleType={ROLE.PRODUCER} initEmptyData={true} />
    </>
  );
}
