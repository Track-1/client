import { useState } from "react";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { checkMaxInputLength } from "../../utils/common/checkMaxInputLength";
import useUploadInitValue from "../upload/useUploadInitValue";
import { AudioElement } from "../../type/upload/uploadinitType";
import { checkAudioFileType } from "../../utils/common/checkAudioFileType";

export default function useUploadAudioFile() {
  const [uploadInit] = useUploadInitValue();
  const [audioInit, setAudioInit] = useState<AudioElement>({ ...uploadInit.audio });

  //오디오 업로드
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const filePath = e.target.value;
    const audioFile = e.target.files[0];
    const { audioFullFileName, audioOnlyFileName, audioFileType } = getAudioFileInfo(filePath);

    if (checkAudioFileType(audioFileType)) {
      setAudioInit((prev) => ({
        ...prev,
        audioFile: audioFile,
        fileName: checkMaxInputLength(audioOnlyFileName.length, TEXT_LIMIT.UPLOAD_AUDIO)
          ? audioFullFileName
          : audioOnlyFileName,
        audioType: audioFileType,
      }));
    } else {
      alert("Only wav, mp3 format audio can be uploaded.\nwav, mp3형식의 오디오만 업로드할 수 있습니다.");
    }
  }

  function getAudioFileInfo(file: string) {
    const audioFullFileName = file.substring(file.lastIndexOf("\\") + 1);
    const audioOnlyFileName = audioFullFileName.substring(audioFullFileName.length - 4, -1);
    const audioFileType = audioFullFileName.substring(audioFullFileName.length - 4);

    return { audioFullFileName, audioOnlyFileName, audioFileType };
  }

  return { audioInit, uploadAudiofile };
}
