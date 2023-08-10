import { useState } from "react";
import { uploadImageTypeWarningMessage } from "../../core/common/warningMessage";
import { checkFileSize } from "../../utils/common/checkFileSize";
import { checkImageFileType } from "../../utils/common/checkFileType";

export default function useUploadImageFile() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>("");

  function handleUploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    const imageSize = imageFile && checkFileSize(imageFile.size) ? imageFile.size : 0;
    const imageType = imageFile ? getImageType(imageFile) : "";

    if (imageSize && imageType) {
      setImageFile(imageFile);

      const reader = new FileReader();
      imageFile && reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }

  function getImageType(imageFile: File) {
    const type = imageFile.type.toString().replace("image/", ".");
    return checkImageFileType(type) ? type : alert(uploadImageTypeWarningMessage);
  }

  return { imageFile, previewImage, setPreviewImage, handleUploadImageFile };
}
