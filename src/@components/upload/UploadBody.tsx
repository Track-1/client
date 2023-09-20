import styled from "styled-components";
import ProducerLayout from "./producer/ProducerLayout";
import VocalLayout from "./vocal/VocalLayout";
import UploadTitle from "./UploadTitle";
import FileUploadInfo from "./FileUploadInfo";
import CategoryInfo from "./CategotyInfo";
import HashtagInfo from "./HashtagInfo";
import DescriptionInfo from "./DescriptionInfo";
import useUploadValue from "../../hooks/common/useUploadValue";
import { ROLE } from "../../core/common/roleType";

interface UploadBodyProps {
  roleType: string;
  initEmptyData: boolean; //true : 초기값 / false : API 데이터로 초기값
}

export default function UploadBody(props: UploadBodyProps) {
  const { roleType, initEmptyData } = props;
  const { title, hashtags, image, audio, description } = useUploadValue(initEmptyData);

  return (
    <Container>
      {roleType === ROLE.PRODUCER ? (
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
              <HashtagInfo
                hashtags={hashtags.hashtags}
                hashtagLength={hashtags.hashtagLength}
                hashtagInputText={hashtags.hashtagInputText}
                handleEnterHashtag={hashtags.handleEnterHashtag}
                handleAddHashtag={hashtags.handleAddHashtag}
                handleRemoveHashtag={hashtags.handleRemoveHashtag}
                handleChangeHashtagInputText={hashtags.handleChangeHashtagInputText}
              />
              <DescriptionInfo
                description={description.description}
                handleChangeDescription={description.handleChangeDescription}
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
              <HashtagInfo
                hashtags={hashtags.hashtags}
                hashtagLength={hashtags.hashtagLength}
                hashtagInputText={hashtags.hashtagInputText}
                handleEnterHashtag={hashtags.handleEnterHashtag}
                handleAddHashtag={hashtags.handleAddHashtag}
                handleRemoveHashtag={hashtags.handleRemoveHashtag}
                handleChangeHashtagInputText={hashtags.handleChangeHashtagInputText}
              />
              <DescriptionInfo
                description={description.description}
                handleChangeDescription={description.handleChangeDescription}
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