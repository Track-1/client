import Header from "../@common/header";
import UploadBody from "./ploadBody";
import UploadHeader from "./ploadHeader";

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
