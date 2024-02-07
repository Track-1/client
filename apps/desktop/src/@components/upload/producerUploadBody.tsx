import styled from 'styled-components';
import CategoryInfo from './categotyInfo';
import FileUploadInfo from './fileUploadInfo';
import UploadTitle from './uploadTitle';
import HashtagInfo from './hashtagInfo';
import DescriptionInfo from './descriptionInfo';
import { ImageInfo } from './imageInfo';
import { useSelect } from '../../hooks/common/useSelect';
import {
  CategoryIdType,
  EventCategoryIdType,
  EventUpperCategoryType,
  UpperCategoryType,
} from '../../type/common/category';
import { FormProvider, useForm } from 'react-hook-form';
import { SelectCategoryContext } from '../../context/selectCategoryContext';
import Header from '../@common/header';
import BackButton from '../@common/backButton';
import UploadHeader from './uploadHeader';
import { UserPortfolioType } from '../../type/profile';
import { useEditProducerPortfolio, useUploadProducerPortfolio } from '../../hooks/queries/mypage';
import { UploadInputType } from '../../type/common/upload';
import { useEditTrack, useUploadTrack } from '../../hooks/queries/tracks';
import { useLocation, useParams } from 'react-router-dom';
import { CategoryId, EventCategoryId } from '../../core/common/categories';
import { createFileName } from '../../utils/common/createFileName';
import { TEXT_LIMIT } from '../../core/common/textLimit';
import { useEffect } from 'react';

type ProducerUploadBodyyProps =
  | {
      isEditPage: true;
      prevUploadData: any;
    }
  | {
      isEditPage: false;
      prevUploadData?: never;
    };

const emptyList = new DataTransfer();
const defaultList = new DataTransfer();

export default function ProducerUploadBody(props: ProducerUploadBodyyProps) {
  const { isEditPage, prevUploadData } = props;

  const pathname = useLocation().pathname;

  const { uploadProducerPortfolio } = useUploadProducerPortfolio();
  const { editProducerPortfolio } = useEditProducerPortfolio();
  const { editTrack } = useEditTrack();
  const { uploadTrack } = useUploadTrack();
  const { selectedOption, selectOption } = useSelect<EventCategoryIdType | null>(
    false,
    EventCategoryId[prevUploadData?.portfolioCategory as EventUpperCategoryType]
  );

  emptyList.items.add(
    new File([prevUploadData?.portfolioAudioFileName ?? ''], prevUploadData?.portfolioAudioFileName ?? '', {
      type: 'mp3',
    })
  );

  const methods = useForm<UploadInputType>({
    defaultValues: {
      image: '',
      title: '',
      audioFile: defaultList.files,
      hashtag: [],
      description: '',
    },
  });

  useEffect(() => {
    if (prevUploadData && isEditPage) {
      if (pathname.includes('portfolio-edit')) {
        methods.setValue('image', prevUploadData.portfolioImageFile);
        methods.setValue('title', prevUploadData.portfolioTitle);
        methods.setValue('hashtag', prevUploadData.portfolioKeyword);
        methods.setValue('description', prevUploadData.portfolioContent);
      } else {
        methods.setValue('image', prevUploadData.trackImageFile);
        methods.setValue('title', prevUploadData.trackTitle);
        methods.setValue('hashtag', prevUploadData.trackKeyword);
        methods.setValue('description', prevUploadData.trackContent);
      }
    }
  }, []);

  function createProducerUploadFormData(data: UploadInputType) {
    if (selectedOption === null) return;

    const formData = new FormData();

    const audioFile = data.audioFile[0] && new Blob([data.audioFile[0]], { type: data.audioFile[0]?.type });
    const imageFile = typeof data.image !== 'string' ? new Blob([data?.image[0]], { type: data.image[0]?.type }) : '';

    data.audioFile.length > 0 &&
      formData.append('portfolioAudioFileName', createFileName(data.audioFile[0], TEXT_LIMIT.UPLOAD_AUDIO));
    formData.append('portfolioTitle', data.title);
    formData.append('portfolioCategory', selectedOption);
    formData.append('portfolioContent', data.description);
    for (let i = 0; i < data.hashtag.length; i++) {
      if (data.hashtag[i] === '') continue;
      formData.append(`portfolioKeyword[${i}]`, data.hashtag[i]);
    }

    audioFile && formData.append('portfolioAudioFile', audioFile);
    imageFile && formData.append('portfolioImageFile', imageFile);

    if (isEditPage && typeof data.image === 'string') {
      formData.append('portfolioImageFileSame', 'true');
    }

    return formData;
  }

  function createTrackUploadFormData(data: UploadInputType) {
    if (selectedOption === null) return;

    const formData = new FormData();

    const audioFile = data.audioFile[0] && new Blob([data.audioFile[0]], { type: data.audioFile[0]?.type });
    const imageFile = typeof data.image !== 'string' ? new Blob([data?.image[0]], { type: data.image[0]?.type }) : '';

    formData.append('trackTitle', data.title);
    formData.append('trackCategory', selectedOption);
    formData.append('trackIntroduction', data.description);
    data.audioFile.length > 0 &&
      formData.append('trackAudioFileName', createFileName(data.audioFile[0], TEXT_LIMIT.UPLOAD_AUDIO));

    for (let i = 0; i < data.hashtag.length; i++) {
      if (data.hashtag[i] === '') continue;
      formData.append(`trackKeyword[${i}]`, data.hashtag[i]);
    }
    audioFile && formData.append('trackAudioFile', audioFile);
    imageFile && formData.append('trackImageFile', imageFile);

    if (isEditPage && typeof data.image === 'string') {
      formData.append('trackImageFileSame', 'true');
    }

    return formData;
  }

  function upload(data: UploadInputType) {
    let trackId;
    if (prevUploadData) {
      trackId = pathname.includes('portfolio') ? prevUploadData.portfolioId : prevUploadData.trackId;
    }

    if (pathname.includes('portfolio') || pathname.includes('portfolio-edit')) {
      const uploadData = createProducerUploadFormData(data);
      if (uploadData) {
        isEditPage ? editProducerPortfolio({ trackId, uploadData }) : uploadProducerPortfolio(uploadData);
      }
      return;
    }

    if (pathname.includes('vocal-searching')) {
      const uploadData = createTrackUploadFormData(data);

      if (uploadData) {
        isEditPage ? editTrack({ trackId, uploadData }) : uploadTrack(uploadData);
      }
      return;
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log(data);
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
