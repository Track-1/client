import { USER_DATA } from "../../core/common/userData";
import UploadBody from "../upload/UploadBody";
import UploadHeader from "../upload/UploadHeader";

export default function ProducerPortfolioEditContainer() {
  return (
    <>
      <UploadHeader />
      <UploadBody userType={USER_DATA.PRODUCER} uploadInitData={"data"} />
    </>
  );
}
