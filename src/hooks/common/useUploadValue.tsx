import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useUploadImageFile from "./useUploadImageFile";
import useUploadAudioFile from "./useUploadAudioFile";
import { useEffect } from "react";

export default function useUploadValue(uploadInitData: any | null) {
  const { imageFile, previewImage, setPreviewImage, uploadImageFile } = useUploadImageFile();
  const [title, changeTitle, setTitle] = useInputText("", TEXT_LIMIT.UPLOAD_TITLE);
  const { audioFile, audioFileName, setAudioFileName, audioFileType, isTextOverflow, uploadAudioFile } =
    useUploadAudioFile();
  const [description, changeDescription, setDescription] = useInputText("", TEXT_LIMIT.DESCRIPTION);

  useEffect(() => {
    if (uploadInitData) {
      //초기값이 있는 경우 초기값 설정
    }
  }, []);

  return {
    title: { title, changeTitle },
    image: { imageFile, previewImage, uploadImageFile },
    audio: { audioFile, audioFileName, audioFileType, isTextOverflow, uploadAudioFile },
    description: { description, changeDescription },
  };
}
