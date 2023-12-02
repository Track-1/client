import { FolderUploadIc, UploadFileIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import styled from "styled-components";
import { useFormContext } from "react-hook-form";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { UploadInputType } from "../../type/common/upload";
import { useState } from "react";

export default function FileUploadInfo() {
  const {
    register,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<UploadInputType>();
  const [fileType, setFileType] = useState("");
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadFileIcon />
        </InfoTypeIconWrapper>
        <p>File Upload</p>
      </InfoType>
      <InfoInput>
        <InputWrapper>
          <InputFileTextWrapper isDirty={dirtyFields.audioFile ?? false}>
            <FileName value={getValues("audioFile")?.[0]?.name} isTextOverflow={isTextOverflow} disabled />
            {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{fileType}</FileAttribute>}
            <FileInput
              type="file"
              id="wavFileUpload"
              accept=".wav,.mp3, .WAV, .MP3"
              readOnly
              {...register("audioFile", {
                validate: (value) => {
                  return (
                    (value as unknown as FileList)?.[0] ===
                    ((document.getElementById("wavFileUpload") as unknown as HTMLInputElement)
                      ?.files?.[0] as unknown as File)
                  );
                },
                onChange: (e) => {
                  setFileType(getValues("audioFile")?.[0]?.name.slice(-4));
                  setIsTextOverflow(getValues("audioFile")?.[0]?.name.length > TEXT_LIMIT.UPLOAD_AUDIO);
                },
              })}
            />
          </InputFileTextWrapper>
          <FileLable htmlFor="wavFileUpload">
            <FolderUploadIcon />
          </FileLable>
        </InputWrapper>
      </InfoInput>
    </UploadInfoBox>
  );
}

const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 27.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.cations};
`;

const InfoTypeIconWrapper = styled.div`
  width: 2.23rem;
`;

const UploadFileIcon = styled(UploadFileIc)`
  width: 1.3rem;
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const InputFileTextWrapper = styled.div<{ isDirty: boolean }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid
    ${({ isDirty }) => (isDirty ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const FileName = styled.input<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "16.4rem" : "100%")};

  display: flex;
  align-items: center;

  text-overflow: ${(props) => (props.isTextOverflow ? "ellipsis" : "default")};

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
  cursor: default;
`;

const FileAttribute = styled.div<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "100%" : 0)};
  width: 100%;

  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const FolderUploadIcon = styled(FolderUploadIc)`
  width: 4rem;
  height: 4rem;
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLable = styled.label`
  cursor: pointer;
`;
