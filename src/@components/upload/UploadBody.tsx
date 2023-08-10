import styled from "styled-components";
import ProducerLayout from "./producer/ProducerLayout";
import VocalLayout from "./vocal/VocalLayout";
import { USER_DATA } from "../../core/common/userData";
import UploadTitle from "./UploadTitle";
import FileUploadInfo from "./FileUploadInfo";
import CategoryInfo from "./CategotyInfo";
import HashtagInfo from "./HashtagInfo";
import DescriptionInfo from "./DescriptionInfo";
import useUploadValue from "../../hooks/common/useUploadValue";

interface UploadBodyProps {
  userType: string;
  uploadInitData: any | null; //타입설정할 예정
}

export default function UploadBody(props: UploadBodyProps) {
  const { userType, uploadInitData } = props;
  const { title, image, audio, description } = useUploadValue(uploadInitData);

  return (
    <Container>
      {userType === USER_DATA.PRODUCER ? (
        <ProducerLayout
          imageFile={image.imageFile}
          previewImage={image.previewImage}
          handleUploadImageFile={image.handleUploadImageFile}>
          <UploadDataWrapper>
            <UploadTitle title={title.title} changeTitle={title.changeTitle} />
            <UploadInfoWrapper>
              <FileUploadInfo
                audioFileName={audio.audioFileName}
                audioFileType={audio.audioFileType}
                isTextOverflow={audio.isTextOverflow}
                handleUploadAudioFile={audio.handleUploadAudioFile}
              />
              <CategoryInfo />
              <HashtagInfo />
              <DescriptionInfo
                description={description.description}
                changeDescription={description.changeDescription}
              />
            </UploadInfoWrapper>
          </UploadDataWrapper>
        </ProducerLayout>
      ) : (
        <VocalLayout
          imageFile={image.imageFile}
          previewImage={image.previewImage}
          handleUploadImageFile={image.handleUploadImageFile}>
          <UploadDataWrapper>
            <UploadTitle title={title.title} changeTitle={title.changeTitle} />
            <UploadInfoWrapper>
              <FileUploadInfo
                audioFileName={audio.audioFileName}
                audioFileType={audio.audioFileType}
                isTextOverflow={audio.isTextOverflow}
                handleUploadAudioFile={audio.handleUploadAudioFile}
              />
              <CategoryInfo />
              <HashtagInfo />
              <DescriptionInfo
                description={description.description}
                changeDescription={description.changeDescription}
              />
            </UploadInfoWrapper>
          </UploadDataWrapper>
        </VocalLayout>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadDataWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const UploadInfoWrapper = styled.div`
  width: 100%;

  margin-top: 3.9rem;
`;
