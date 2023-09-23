import { UploadFileIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import { InfoInput, InfoType, InfoTypeText } from "./categotyInfo";
import AudioFileUpload from "../@common/audioFileUpload";

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
      <InfoInput>
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
