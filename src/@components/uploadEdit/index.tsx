import BackButton from "../@common/backButton";
import Header from "../@common/header";
import UploadBody from "../upload/uploadBody";
import UploadHeader from "../upload/uploadHeader";

export default function UploadEditContainer() {
  return (
    <>
      <Header>
        <BackButton />
        <UploadHeader />
      </Header>
      <UploadBody />
    </>
  );
}
