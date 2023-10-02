import { useEffect } from "react";
import styled from "styled-components";
import { ROLE } from "../../core/common/roleType";
import useUploadImageFile from "../../hooks/common/useUploadImageFile";
import CategoryInfo from "./categotyInfo";
import DescriptionInfo from "./descriptionInfo";
import FileUploadInfo from "./fileUploadInfo";
import HashtagInfo from "./hashtagInfo";
import ProducerLayout from "./producer/producerLayout";
import UploadTitle from "./uploadTitle";
import VocalLayout from "./vocal/vocalLayout";

import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useHashtagInput from "../../hooks/common/useHashtagInput";
import useInputText from "../../hooks/common/useInputText";
import useUploadAudioFile from "../../hooks/common/useUploadAudioFile";
import { UploadData } from "../../recoil/upload/uploadData";
import useDropCategory from "../../hooks/common/useDropCategory";

export default function UploadBody() {
  const { imageFile, previewImage, changePreviewImage, handleUploadImageFile } = useUploadImageFile();
  const [title, handleChangeTitle, changeTitle] = useInputText("", TEXT_LIMIT.UPLOAD_TITLE);
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    changeHashtags,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();
  const { categories, setCategories, isSelectedNothing, selectedCategoryNumber, isSelected, categoryText } =
    useDropCategory();
  const { audioFile, audioFileName, changeAudioFileName, audioFileType, isTextOverflow, handleUploadAudioFile } =
    useUploadAudioFile();
  const [description, handleChangeDescription, changeDescription] = useInputText("", TEXT_LIMIT.DESCRIPTION);

  const pathName = useLocation().pathname;
  const roleType = pathName.includes(ROLE.PRODUCER) ? ROLE.PRODUCER : ROLE.VOCAL;
  const setUploadData = useSetRecoilState(UploadData);

  useEffect(() => {
    setUploadData((prev) => ({
      ...prev,
      title: title,
      imageFile: imageFile,
      audioFile: audioFile,
      category: selectedCategoryNumber(),
      keyword: hashtags,
      introduction: description,
      audioFileName: audioFileName,
    }));
  }, [imageFile, hashtags, title, audioFile, description, categories]);

  useEffect(() => {
    if (!pathName.includes("upload")) {
      changeTitle("테스트 타이틀");
      changeAudioFileName("테스트오디오파일입니다.mp3");
      changeHashtags(["안녕", "반가워이짜식아ㅋㅋㅋ"]);
      changePreviewImage("https://blog.kakaocdn.net/dn/cly62b/btraEfAAMcX/u7O4EDAJk4YlSp47gk5gk0/img.png");
      changeDescription("ㅋㅋ커ㅏㅓㅇ라어라어라어라ㅓㅇ굿굿굿");
    }
  }, []);

  function commonComponent() {
    return (
      <UploadDataWrapper>
        <UploadTitle title={title} handleChangeTitle={handleChangeTitle} />
        <UploadInfoWrapper>
          <FileUploadInfo
            audioFileName={audioFileName}
            audioFileType={audioFileType}
            isTextOverflow={isTextOverflow}
            handleUploadAudioFile={handleUploadAudioFile}
          />
          <CategoryInfo
            categories={categories}
            setCategories={setCategories}
            isSelectedNothing={isSelectedNothing}
            isSelected={isSelected}
            categoryText={categoryText}
          />
          <HashtagInfo
            hashtags={hashtags}
            hashtagLength={hashtagLength}
            hashtagInputText={hashtagInputText}
            handleEnterHashtag={handleEnterHashtag}
            handleAddHashtag={handleAddHashtag}
            handleRemoveHashtag={handleRemoveHashtag}
            handleChangeHashtagInputText={handleChangeHashtagInputText}
          />
          <DescriptionInfo
            description={description}
            handleChangeDescription={handleChangeDescription}
            isProfile={false}
          />
        </UploadInfoWrapper>
      </UploadDataWrapper>
    );
  }

  return (
    <Container>
      {roleType === ROLE.PRODUCER ? (
        <ProducerLayout imageFile={imageFile} previewImage={previewImage} handleUploadImageFile={handleUploadImageFile}>
          {commonComponent()}
        </ProducerLayout>
      ) : (
        <VocalLayout imageFile={imageFile} previewImage={previewImage} handleUploadImageFile={handleUploadImageFile}>
          {commonComponent()}
        </VocalLayout>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 4.2rem;
`;

const UploadDataWrapper = styled.div`
  width: 89.6rem;
  height: 100%;
`;

const UploadInfoWrapper = styled.div`
  width: 100%;

  margin-top: 2.9rem;
`;
