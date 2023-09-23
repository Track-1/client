import Header from "../@common/header";
import UploadBody from "../upload/ploadBody";
import UploadHeader from "../upload/ploadHeader";

export default function UploadEditContainer() {
  return (
    <>
      <Header backBtn>
        <UploadHeader />
      </Header>
      <UploadBody />
    </>
  );
}
