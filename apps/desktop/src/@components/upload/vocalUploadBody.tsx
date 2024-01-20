import styled from 'styled-components';
import UploadVocalLayoutImg from '../../assets/image/uploadVocalLayoutImg.png';
import CategoryInfo from './categotyInfo';
import FileUploadInfo from './fileUploadInfo';
import UploadTitle from './uploadTitle';
import HashtagInfo from './hashtagInfo';
import DescriptionInfo from './descriptionInfo';
import { useUploadVocalPortfolio } from '../../hooks/queries/mypage';
import { FormProvider, useForm } from 'react-hook-form';
import { SelectCategoryContext } from '../../context/selectCategoryContext';
import Header from '../@common/header';
import BackButton from '../@common/backButton';
import UploadHeader from './uploadHeader';
import { useSelect } from '../../hooks/common/useSelect';
import { CategoryIdType, EventCategoryIdType, UpperCategoryType } from '../../type/common/category';
import { ImageInfo } from './imageInfo';
import { UserPortfolioType } from '../../type/profile';
import { UploadInputType } from '../../type/common/upload';

import { CategoryId } from '../../core/common/categories';
import { useParams } from 'react-router-dom';
import { createFileName } from '../../utils/common/createFileName';
import { TEXT_LIMIT } from '../../core/common/textLimit';

type VocalUploadBodyProps =
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

export default function VocalUploadBody(props: VocalUploadBodyProps) {
  const { isEditPage, prevUploadData } = props;
  const { uploadType } = useParams();

  const { uploadVocalPortfolio } = useUploadVocalPortfolio();
  const { selectedOption, selectOption } = useSelect<EventCategoryIdType | null>(
    false,
    CategoryId[prevUploadData?.portfolioCategory.toUpperCase() as UpperCategoryType]
  );

  emptyList.items.add(
    new File([prevUploadData?.portfolioAudioFileName ?? ''], prevUploadData?.portfolioAudioFileName ?? '', {
      type: 'mp3',
    })
  );

  const methods = useForm({
    defaultValues: {
      image: isEditPage ? prevUploadData?.portfolioImageFile ?? '' : '',
      title: isEditPage ? prevUploadData?.portfolioTitle ?? '' : '',
      audioFile: isEditPage ? emptyList.files ?? defaultList.files : defaultList.files,
      hashtag: isEditPage ? prevUploadData?.portfolioKeyword ?? [] : [],
      description: '',
    },
  });

  function createVocalUploadFormData(data: UploadInputType) {
    if (selectedOption === null) return;
    if (selectedOption === null) return;

    const formData = new FormData();

    const audioFile = data.audioFile[0] && new Blob([data.audioFile[0]], { type: data.audioFile[0]?.type });
    const imageFile = typeof data.image !== 'string' ? new Blob([data?.image[0]], { type: data.image[0]?.type }) : '';

    formData.append('portfolioAudioFileName', createFileName(data.audioFile[0], TEXT_LIMIT.UPLOAD_AUDIO));
    formData.append('portfolioTitle', data.title);
    formData.append('portfolioCategory', selectedOption);
    formData.append('portfolioContent', data.description);
    for (let i = 0; i < data.hashtag.length; i++) {
      formData.append(`portfolioKeyword[${i}]`, data.hashtag[i]);
    }
    formData.append('portfolioIntroduction', data.description);
    audioFile && formData.append('portfolioAudioFile', audioFile);
    imageFile && formData.append('portfolioImageFile', imageFile);

    return formData;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          const uploadData = createVocalUploadFormData(data);
          uploadData && uploadVocalPortfolio(uploadData);
        })}>
        <SelectCategoryContext.Provider value={{ selectedOption, selectOption }}>
          <Header>
            <BackButton staticPrevURL={-1} />
            <UploadHeader />
          </Header>
          <Container>
            <ImageInfo userType="vocal" />
            <UploadDataWrapper>
              <UploadTitle />
              <UploadInfoWrapper>
                <FileUploadInfo />
                <CategoryInfo />
                <HashtagInfo />
                <DescriptionInfo />
              </UploadInfoWrapper>
            </UploadDataWrapper>
            <UploadVocalLayout src={UploadVocalLayoutImg} />
          </Container>
        </SelectCategoryContext.Provider>
      </form>
    </FormProvider>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;

  margin-left: 6.8rem;
  margin-top: 7.5rem;

  width: 171rem;
  height: 74.7rem;
`;

const UploadVocalLayout = styled.img`
  position: absolute;

  width: 185rem;
  height: 74.6rem;

  margin-top: 7.5rem;

  z-index: -1;
`;

const UploadDataWrapper = styled.div`
  width: 89.6rem;
  height: 100%;

  margin-left: 3.5rem;
`;

const UploadInfoWrapper = styled.ul`
  width: 100%;

  margin-top: 2.9rem;
`;
