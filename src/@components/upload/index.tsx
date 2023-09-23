import Header from "../@common/header";
import UploadBody from "./uploadBody";
import UploadHeader from "./uploadHeader";

export default function UploadContainer() {
  return (
    <>
      <Header backBtn>
        <UploadHeader />
      </Header>
      <UploadBody />
    </>
  );
}
