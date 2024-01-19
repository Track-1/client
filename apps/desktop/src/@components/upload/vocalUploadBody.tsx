import { isSafari } from 'react-device-detect';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UploadVocalDefaultImg from '../../assets/image/uploadVocalDefaultImg.png';
import UploadVocalLayoutImg from '../../assets/image/uploadVocalLayoutImg.png';
import { SelectCategoryContext } from '../../context/selectCategoryContext';
import { CategoryId } from '../../core/common/categories';
import useModalState from '../../hooks/common/useModalState';
import { useSelect } from '../../hooks/common/useSelect';
import { useUploadVocalPortfolio } from '../../hooks/queries/mypage';
import { CategoryIdType, UpperCategoryType } from '../../type/common/category';
import { UploadInputType } from '../../type/common/upload';
import { UserPortfolioType } from '../../type/profile';
import BackButton from '../@common/backButton';
import Header from '../@common/header';
import CategoryInfo from './categotyInfo';
import DescriptionInfo from './descriptionInfo';
import FileUploadInfo from './fileUploadInfo';
import HashtagInfo from './hashtagInfo';
import { ImageInfo } from './imageInfo';
import SafariIssueMdoal from './safariIssueModal';
import UploadHeader from './uploadHeader';
import UploadTitle from './uploadTitle';

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
  const { selectedOption, selectOption } = useSelect<CategoryIdType | null>(
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

    const formData = new FormData();
    formData.append('portfolioTitle', data.title);
    formData.append('portfolioCategory', selectedOption);
    formData.append('portfolioAudioFile', data.audioFile[0]);
    data.hashtag.forEach((tag, idx) => {
      if (tag.length === 0) return;
      formData.append(`portfolioContent${idx}`, tag);
    });
    formData.append('portfolioImageFile', data.image ?? UploadVocalDefaultImg);
    formData.append('portfolioAudioFileName', String(data.audioFile));

    return formData;
  }

  const { isOpen, onClose } = useModalState(true);

  return (
    <FormProvider {...methods}>
      {isSafari && isOpen && <SafariIssueMdoal isOpen={isOpen} onClose={onClose} />}
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
