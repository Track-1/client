import styled from "styled-components";
import { FolderUploadIc, UploadFileIc } from "../../assets";
import UploadInfoBox from "./UploadInfoBox";
import useUploadAudioFile from "../../hooks/common/useUploadAudioFile";

export default function FileUploadInfo() {
  const [audioFile, fileName, audioType, isTextOverflow, uploadAudiofile] = useUploadAudioFile();

  return (
    <UploadInfoBox>
      <InfoType>
        <UploadFileIc />
        <InfoTypeText>File Upload</InfoTypeText>
      </InfoType>
      <InfoInput>
        <InputWrapper>
          <InputFileTextWrapper fileName={fileName}>
            <FileName value={fileName} isTextOverflow={isTextOverflow} disabled />
            {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioType}</FileAttribute>}
            <FileInput
              type="file"
              id="wavFileUpload"
              accept=".wav,.mp3, .WAV, .MP3"
              onChange={uploadAudiofile}
              readOnly
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

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

const InfoTypeText = styled.div`
  margin-left: 1rem;
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

// -------여기까지 공통----------

const InputWrapper = styled.div`
  display: flex;
`;

const InputFileTextWrapper = styled.div<{ fileName: string }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid
    ${(props) => (props.fileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
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
