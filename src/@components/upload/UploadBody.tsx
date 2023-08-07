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

export default function UploadBody() {
  const loginUserType = "producer"; // 임시 데이터 (이후에는 recoil값으로 변경할 예정)

  const { title, image, audio, description } = useUploadValue();

  return (
    <Container>
      {loginUserType === USER_DATA.PRODUCER ? (
        <ProducerLayout
          imageFile={image.imageFile}
          previewImage={image.previewImage}
          uploadImageFile={image.uploadImageFile}>
          <UploadDataWrapper>
            <UploadTitle title={title.title} changeTitle={title.changeTitle} />
            <UploadInfoWrapper>
              <FileUploadInfo
                audioFileName={audio.audioFileName}
                audioFileType={audio.audioFileType}
                isTextOverflow={audio.isTextOverflow}
                uploadAudioFile={audio.uploadAudioFile}
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
          uploadImageFile={image.uploadImageFile}>
          <UploadDataWrapper>
            <UploadTitle title={title.title} changeTitle={title.changeTitle} />
            <UploadInfoWrapper>
              <FileUploadInfo
                audioFileName={audio.audioFileName}
                audioFileType={audio.audioFileType}
                isTextOverflow={audio.isTextOverflow}
                uploadAudioFile={audio.uploadAudioFile}
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
