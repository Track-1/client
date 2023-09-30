import { UploadFileIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import { InfoInput, InfoType, InfoTypeIconWrapper, InfoTypeText } from "./categotyInfo";
import AudioFileUpload from "../@common/audioFileUpload";
import styled from "styled-components";

interface FileUploadInfoProps {
  audioFileName: string;
  audioFileType: string;
  isTextOverflow: boolean;
  handleUploadAudioFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUploadInfo(props: FileUploadInfoProps) {
  const { audioFileName, audioFileType, isTextOverflow, handleUploadAudioFile } = props;

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadFileIcon />
        </InfoTypeIconWrapper>
        <InfoTypeText>File Upload</InfoTypeText>
      </InfoType>
      <InfoInput isProfile={false}>
        <AudioFileUpload
          audioFileName={audioFileName}
          audioFileType={audioFileType}
          isTextOverflow={isTextOverflow}
          handleUploadAudioFile={handleUploadAudioFile}
        />
      </InfoInput>
    </UploadInfoBox>
  );
}

const UploadFileIcon = styled(UploadFileIc)`
  width: 1.3rem;
`;
