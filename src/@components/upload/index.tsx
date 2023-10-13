import BackButton from "../@common/backButton";
import Header from "../@common/header";
import UploadBody from "./uploadBody";
import UploadHeader from "./uploadHeader";

export default function UploadContainer() {
  return (
    <>
      <Header>
        <BackButton staticPrevURL={-1} />
        <UploadHeader />
      </Header>

      <UploadBody />
    </>
  );
}
