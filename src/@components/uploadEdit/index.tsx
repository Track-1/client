import useUploadAPI from "../../hooks/queries/upload/useUploadAPI";
import BackButton from "../@common/backButton";
import Header from "../@common/header";
import Loading from "../@common/loading";
import UploadBody from "../upload/uploadBody";
import UploadHeader from "../upload/uploadHeader";

export default function UploadEditContainer() {
  const { uploadAPI, trackLoading, producerLoading, vocalLoaidng } = useUploadAPI();

  return (
    <>
      <Header>
        <BackButton staticPrevURL={-1} />
        <UploadHeader useUploadAPI={{ uploadAPI, trackLoading, producerLoading, vocalLoaidng }} />
      </Header>
      {(trackLoading || producerLoading || vocalLoaidng) && <Loading />}
      <UploadBody />
    </>
  );
}
