import { useState } from "react";

export default function useUploadAudioFile() {
  const [fileName, setFileName] = useState("");
  const [isTextOverflow, setIsTextOverflow] = useState(false);
  const [audioType, setAudioType] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  //오디오 업로드
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    const filePath = e.target.value;
    const audioFile = e.target.files && e.target.files[0];
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
    const audioOnlyFileName = file.substring(file.lastIndexOf("\\") + 1, file.length - 4);
    const audioFileType = file.substring(file.lastIndexOf("\\") + 1).substring(audioFullFileName.length - 4);

    return { audioFullFileName, audioOnlyFileName, audioFileType };
  }

  function checkMaxInputLength(length: number, limit: number): boolean {
    return length <= limit;
  }

  function checkAudioFileType(type: string) {
    return type === ".mp3" || type === ".wav" || type === ".MP3" || type === ".WAV";
  }

  function setAudioFileInfo(name: string, editName: string, type: string) {
    if (checkMaxInputLength(editName.length, 13)) {
      setIsTextOverflow(false);
      setFileName(name);
    } else {
      setIsTextOverflow(true);
      setFileName(editName);
    }
    setAudioType(type);
  }

  return [audioFile, fileName, audioType, isTextOverflow, uploadAudiofile] as const;
}
