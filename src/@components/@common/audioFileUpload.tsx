import styled from "styled-components";
import { FolderUploadIc } from "../../assets";

interface AudioFileUploadProps {
  audioFileName: string;
  audioFileType: string;
  isTextOverflow: boolean;
  handleUploadAudioFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AudioFileUpload(props: AudioFileUploadProps) {
  const { audioFileName, audioFileType, isTextOverflow, handleUploadAudioFile } = props;
  return (
    <InputWrapper>
      <InputFileTextWrapper fileName={audioFileName}>
        <FileName value={audioFileName} isTextOverflow={isTextOverflow} disabled />
        {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioFileType}</FileAttribute>}
        <FileInput
          type="file"
          id="wavFileUpload"
          accept=".wav,.mp3, .WAV, .MP3"
          onChange={handleUploadAudioFile}
          readOnly
        />
      </InputFileTextWrapper>
      <FileLable htmlFor="wavFileUpload">
        <FolderUploadIcon />
      </FileLable>
    </InputWrapper>
  );
}

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
