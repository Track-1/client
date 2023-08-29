import { ROLE } from "../../core/common/roleType";
import UploadBody from "../upload/UploadBody";
import UploadHeader from "../upload/UploadHeader";

export default function ProducerPortfolioEditContainer() {
  return (
    <>
      <UploadHeader initEmptyData={false} />
      <UploadBody roleType={ROLE.PRODUCER} initEmptyData={false} />
    </>
  );
}
