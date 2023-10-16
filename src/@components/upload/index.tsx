import useUploadAPI from "../../hooks/queries/upload/useUploadAPI";
import BackButton from "../@common/backButton";
import Header from "../@common/header";
import Loading from "../@common/loading";
import UploadBody from "./uploadBody";
import UploadHeader from "./uploadHeader";

export default function UploadContainer() {
  const { uploadAPI, trackLoading, producerLoading, vocalLoaidng } = useUploadAPI();

  return (
    <>
      <Header>
        <BackButton />
        <UploadHeader useUploadAPI={{ uploadAPI, trackLoading, producerLoading, vocalLoaidng }} />
      </Header>
      {(trackLoading || producerLoading || vocalLoaidng) && <Loading />}
      <UploadBody />
    </>
  );
}
