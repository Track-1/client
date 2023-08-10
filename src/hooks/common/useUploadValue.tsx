import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useUploadImageFile from "./useUploadImageFile";
import useUploadAudioFile from "./useUploadAudioFile";
import { useEffect } from "react";

export default function useUploadValue(uploadInitData: any | null) {
  const { imageFile, previewImage, setPreviewImage, handleUploadImageFile } = useUploadImageFile();
  const [title, changeTitle, setTitle] = useInputText("", TEXT_LIMIT.UPLOAD_TITLE);
  const { audioFile, audioFileName, setAudioFileName, audioFileType, isTextOverflow, handleUploadAudioFile } =
    useUploadAudioFile();
  const [description, changeDescription, setDescription] = useInputText("", TEXT_LIMIT.DESCRIPTION);

  useEffect(() => {
    if (uploadInitData) {
      //초기값이 있는 경우 초기값 설정
    }
  }, []);

  return {
    title: { title, changeTitle },
    image: { imageFile, previewImage, handleUploadImageFile },
    audio: { audioFile, audioFileName, audioFileType, isTextOverflow, handleUploadAudioFile },
    description: { description, changeDescription },
  };
}
