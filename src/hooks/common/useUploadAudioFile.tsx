import { useState } from "react";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { checkMaxInputLength } from "../../utils/common/checkMaxInputLength";
import { checkAudioFileType } from "../../utils/common/checkFileType";
import { uploadAudioTypeWarningMessage } from "../../core/common/warningMessage";

export default function useUploadAudioFile() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFileName, setAudioFileName] = useState("");
  const [audioFileType, setAudioFileType] = useState("");
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  //오디오 업로드
  function uploadAudioFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const audioFile = e.target.files[0];
    const audioOnlyFileName = audioFile.name.substring(audioFile.name.length - 4, -1);
    const audioFileType = audioFile.name.substring(audioFile.name.length - 4);

    if (checkAudioFileType(audioFileType)) {
      setAudioFile(audioFile);
      setAudioFileType(audioFileType);

      if (checkMaxInputLength(audioOnlyFileName.length, TEXT_LIMIT.UPLOAD_AUDIO)) {
        setAudioFileName(audioFile.name);
        setIsTextOverflow(false);
      } else {
        setAudioFileName(audioOnlyFileName);
        setIsTextOverflow(true);
      }
    } else {
      alert(uploadAudioTypeWarningMessage);
    }
  }

  return { audioFile, audioFileName, audioFileType, isTextOverflow, uploadAudioFile };
}
