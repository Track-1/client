import { useState } from "react";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { AudioType } from "../../type/common/audioType";

export default function useUploadAudioFile() {
  const [fileName, setFileName] = useState("");
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const [audioType, setAudioType] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  //오디오 업로드
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const filePath = e.target.value;
    const audioFile = e.target.files[0];
    const { audioFullFileName, audioOnlyFileName, audioFileType } = getAudioFileInfo(filePath);

    if (checkAudioFileType(audioFileType)) {
      setAudioFileInfo(audioFullFileName, audioOnlyFileName, audioFileType);
      setAudioFile(audioFile);
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

  function checkMaxInputLength(textLength: number) {
    return textLength <= TEXT_LIMIT[13];
  }

  function checkAudioFileType(audioType: string): audioType is AudioType {
    return [".mp3", ".wav", "MP3", ".WAV"].includes(audioType);
  }

  function setAudioFileInfo(name: string, editName: string, type: string) {
    if (checkMaxInputLength(editName.length)) {
      setIsTextOverflow(false);
      setFileName(name);
    } else {
      setIsTextOverflow(true);
      setFileName(editName);
    }
    setAudioType(type);
  }

  return { audioFile, fileName, audioType, isTextOverflow, uploadAudiofile };
}
