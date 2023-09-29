import { UploadFileIc } from "../../assets";
import AudioFileUpload from "../@common/audioFileUpload";
import { InfoInput, InfoType, InfoTypeText } from "./categotyInfo";
import UploadInfoBox from "./uploadInfoBox";

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
        <UploadFileIc />
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
