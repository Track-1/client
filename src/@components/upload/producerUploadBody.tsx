import styled from "styled-components";
import CategoryInfo from "./categotyInfo";
import FileUploadInfo from "./fileUploadInfo";
import UploadTitle from "./uploadTitle";
import HashtagInfo from "./hashtagInfo";
import DescriptionInfo from "./descriptionInfo";
import { ImageInfo } from "./imageInfo";
import { useSelect } from "../../hooks/common/useSelect";
import { CategoryIdType, UpperCategoryType } from "../../type/common/category";
import { FormProvider, useForm } from "react-hook-form";
import { SelectCategoryContext } from "../../context/formContextWithProps";
import Header from "../@common/header";
import BackButton from "../@common/backButton";
import UploadHeader from "./uploadHeader";
import { UserPortfolioType } from "../../type/profile";
import { useUploadProducerPortfolio } from "../../hooks/queries/mypage";
import { UploadInputType } from "../../type/common/upload";
import UploadProducerDefaultImg from "../../assets/image/uploadProducerDefaultImg.png";
import { useUploadTrack } from "../../hooks/queries/tracks";
import { useParams } from "react-router-dom";
import { CategoryId } from "../../core/common/categories";
import { createFileName } from "../../utils/common/createFileName";
import { TEXT_LIMIT } from "../../core/common/textLimit";

type ProducerUploadBodyyProps =
  | {
      isEditPage: true;
      prevUploadData: UserPortfolioType;
    }
  | {
      isEditPage: false;
      prevUploadData?: never;
    };

const emptyList = new DataTransfer();
const defaultList = new DataTransfer();

export default function ProducerUploadBody(props: ProducerUploadBodyyProps) {
  const { isEditPage, prevUploadData } = props;
  const { uploadType } = useParams();

  const { uploadProducerPortfolio } = useUploadProducerPortfolio();
  const { uploadTrack } = useUploadTrack();
  const { selectedOption, selectOption } = useSelect<CategoryIdType | null>(
    false,
    CategoryId[prevUploadData?.portfolioCategory.toUpperCase() as UpperCategoryType],
  );

  emptyList.items.add(
    new File([prevUploadData?.portfolioAudioFileName ?? ""], prevUploadData?.portfolioAudioFileName ?? "", {
      type: "mp3",
    }),
  );

  const methods = useForm({
    defaultValues: {
      image: isEditPage ? prevUploadData?.portfolioImageFile ?? "" : "",
      title: isEditPage ? prevUploadData?.portfolioTitle ?? "" : "",
      audioFile: isEditPage ? emptyList.files ?? defaultList.files : defaultList.files,
      hashtag: isEditPage ? prevUploadData?.portfolioKeyword ?? [""] : [""],
      description: "",
    },
  });

  function createProducerUploadFormData(data: UploadInputType) {
    if (selectedOption === null) return;

    const formData = new FormData();
    formData.append("portfolioTitle", data.title);
    formData.append("portfolioCategory", selectedOption);
    formData.append("portfolioAudioFile", data.audioFile[0]);
    data.hashtag.forEach((tag, idx) => {
      if (tag.length === 0) return;
      formData.append(`portfolioContent${idx}`, tag);
    });
    formData.append("portfolioImageFile", data.image[0] ?? UploadProducerDefaultImg);
    formData.append("portfolioAudioFileName", createFileName(data.audioFile[0], TEXT_LIMIT.UPLOAD_AUDIO));
    formData.append("portfolioIntroduction", data.description);

    return formData;
  }

  function createTrackUploadFormData(data: UploadInputType) {
    if (selectedOption === null) return;

    const formData = new FormData();
    formData.append("trackTitle", data.title);
    formData.append("trackCategory ", selectedOption);
    formData.append("trackAudioFile", data.audioFile[0]);
    data.hashtag.forEach((tag, idx) => {
      if (tag.length === 0) return;
      formData.append(`trackKeywordt${idx}`, tag);
    });
    formData.append("trackImageFile", data.image[0] ?? UploadProducerDefaultImg);
    formData.append("trackAudioFileName", String(data.audioFile));
    formData.append("trackIntroduction", data.description);

    return formData;
  }

  function upload(data: UploadInputType) {
    if (uploadType === "portfolio") {
      const uploadData = createProducerUploadFormData(data);
      uploadData && uploadProducerPortfolio(uploadData);
      return;
    }

    if (uploadType === "vocal-searching") {
      const uploadData = createTrackUploadFormData(data);
      uploadData && uploadTrack(uploadData);
      return;
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          upload(data);
        })}>
        <SelectCategoryContext.Provider value={{ selectedOption, selectOption }}>
          <Header>
            <BackButton staticPrevURL={-1} />
            <UploadHeader />
          </Header>
          <Container>
            <UploadImage>
              <ImageInfo userType="producer" />
            </UploadImage>
            <UploadDataWrapper>
              <UploadTitle />
              <UploadInfoWrapper>
                <FileUploadInfo />
                <CategoryInfo />
                <HashtagInfo />
                <DescriptionInfo />
              </UploadInfoWrapper>
            </UploadDataWrapper>
          </Container>
        </SelectCategoryContext.Provider>
      </form>
    </FormProvider>
  );
}

const Container = styled.form`
  display: flex;
  align-items: center;

  width: 171rem;
  height: 74.7rem;

  margin-left: 10.8rem;
  margin-top: 4.2rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const UploadImage = styled.div`
  width: 71.9rem;
`;

const UploadDataWrapper = styled.div`
  width: 89.6rem;
  height: 100%;
`;

const UploadInfoWrapper = styled.ul`
  width: 100%;

  margin-top: 2.9rem;
`;
