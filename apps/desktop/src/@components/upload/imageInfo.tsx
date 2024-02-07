import { useFormContext } from 'react-hook-form';
import styled, { css } from 'styled-components';
import useFileHover from '../../hooks/common/useFileHover';
import useUploadImageFile from '../../hooks/common/useUploadImageFile';
import { UserType } from '../../type/common/userType';
import UploadVocalDefaultImg from '../../assets/image/uploadVocalDefaultImg.png';
import { UploadFileChangeIc } from '../../assets';
import UploadProducerDefaultImg from '../../assets/image/uploadProducerDefaultImg.png';
import { useEffect } from 'react';

interface ImageInfoProps {
  userType: UserType;
}
export function ImageInfo(props: ImageInfoProps) {
  const { userType } = props;
  const { register, getValues } = useFormContext();
  const { fileHoverState, changeFileHoverState } = useFileHover();
  const { previewImage, changePreviewImage, handleUploadImageFile } = useUploadImageFile(getValues('image'));

  useEffect(() => {
    if (typeof getValues('image') === 'string') {
      changePreviewImage(getValues('image'));
    }
  }, [getValues('image')]);

  return (
    <UploadImage>
      {userType === 'vocal' && (
        <UploadImageContainer>
          <VocalUploadImageContainer>
            <VocalImageFrame onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
              <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
                <VocalUploadImageLayout
                  src={getValues('image') ? previewImage : UploadVocalDefaultImg}
                  alt="썸네일 이미지"
                  fileHoverState={fileHoverState}
                  previewImage={previewImage}
                />
                {previewImage && fileHoverState && <FileChangeIcon />}
                <FileInput
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  readOnly
                  {...register('image', {
                    onChange: handleUploadImageFile,
                  })}
                />
              </Label>
            </VocalImageFrame>
          </VocalUploadImageContainer>
        </UploadImageContainer>
      )}
      {userType === 'producer' && (
        <ProducerUploadImageContainer>
          <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
            <ProducerUploadImageLayout
              src={getValues('image') ? previewImage : UploadProducerDefaultImg}
              alt="썸네일 이미지"
              fileHoverState={fileHoverState}
              previewImage={previewImage}
            />
            {previewImage && fileHoverState && <FileChangeIcon />}
            <FileInput
              type="file"
              accept=".jpg,.jpeg,.png"
              readOnly
              {...register('image', {
                onChange: handleUploadImageFile,
              })}
            />
          </Label>
        </ProducerUploadImageContainer>
      )}
    </UploadImage>
  );
}

//vocal

const UploadImageContainer = styled.div`
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 75.5rem;
  height: 100%;

  margin-top: 7.5rem;
`;

const VocalUploadImageContainer = styled.section`
  width: 59.8rem;

  display: flex;
  align-items: center;
  transform: rotate(0deg);

  margin-left: 7.3rem;
  margin-right: 7.5rem;
`;

const VocalImageFrame = styled.div`
  height: 45.1rem;
  width: 45.1rem;

  margin-left: 7.8rem;
  margin-bottom: 2rem;

  border-radius: 5rem;
  transform: rotate(45deg);

  overflow: hidden;
  object-fit: cover;
`;

const VocalUploadImageLayout = styled.img<{ fileHoverState: boolean; previewImage: string | ArrayBuffer | null }>`
  width: 59.8rem;
  height: 59.8rem;

  margin-left: -7.4rem;
  margin-top: -7.4rem;

  transform: rotate(-45deg);
  object-fit: cover;

  ${(props) =>
    props.fileHoverState && props.previewImage
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

//producer

const ProducerUploadImageContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-left: 6.5rem;
  margin-right: 4.9rem;

  border-radius: 50%;

  overflow: hidden;
  cursor: pointer;
`;

const ProducerUploadImageLayout = styled.img<{ fileHoverState: boolean; previewImage: string | ArrayBuffer | null }>`
  position: relative;

  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  border-radius: 50%;

  ${(props) =>
    props.fileHoverState && props.previewImage !== ''
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

//common

const UploadImage = styled.div`
  width: 71.9rem;
`;

const FileChangeIcon = styled(UploadFileChangeIc)`
  position: absolute;

  top: 50.9rem;
  left: 37.8rem;

  width: 18.9rem;

  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;
