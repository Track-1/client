import { useState } from 'react';
import { TEXT_LIMIT } from '../../core/common/textLimit';
import { uploadAudioTypeWarningMessage } from '../../core/common/warningMessage';
import { checkAudioFileType } from '../../utils/common/check';
import { checkMaxInputLength } from '../../utils/common/check';

export default function useUploadAudioFile() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioFileName, setAudioFileName] = useState('');
  const [audioFileType, setAudioFileType] = useState('');
  const [isTextOverflow, setIsTextOverflow] = useState(false);

  function changeAudioFileName(fileName: string) {
    // const audioOnlyFileName = fileName.substring(fileName.length - 4, -1);
    const audioOnlyFileName = fileName;
    const audioFileType = fileName.substring(fileName.length - 4);

    if (checkMaxInputLength(audioOnlyFileName.length, TEXT_LIMIT.UPLOAD_AUDIO)) {
      setAudioFileName(fileName);
      setIsTextOverflow(false);
    } else {
      setAudioFileName(audioOnlyFileName);
      setIsTextOverflow(true);
      setAudioFileType(audioFileType);
    }
  }

  function resetAudio() {
    setAudioFile(null);
    setAudioFileName('');
    setAudioFileType('');
    setIsTextOverflow(false);
  }

  //오디오 업로드
  function handleUploadAudioFile(e: React.ChangeEvent<HTMLInputElement>) {
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

  return {
    audioFile,
    resetAudio,
    audioFileName,
    changeAudioFileName,
    audioFileType,
    isTextOverflow,
    handleUploadAudioFile,
  };
}
