import Header from "../@common/header";
import UploadBody from "./uploadBody";
import UploadHeader from "./uploadHeader";

export default function UploadContainer() {
  return (
    <>
      <Header backBtn prevURL="-1">
        <UploadHeader />
      </Header>
      <UploadBody />
    </>
  );
}
