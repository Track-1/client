import { useState } from "react";
import { IMAGE_FILE_TYPE } from "../../core/common/fileType";
import { uploadImageTypeWarningMessage } from "../../core/common/warningMessage";
import { checkFileSize } from "../../utils/common/checkFileSize";

export default function useUploadImageFile() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>("");

  
  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    const imageSize = imageFile && checkFileSize(imageFile.size) ? imageFile.size : 0;
    const imageType = imageFile ? getImageType(imageFile.name) : "";

    if (imageSize && imageType) {
      setImageFile(imageFile);

      const reader = new FileReader();
      imageFile && reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }

  function getImageType(uploadName: string) {
    const type = uploadName.substring(uploadName.length - 4);
    console.log(type);
    return checkImageType(type) ? type : alert(uploadImageTypeWarningMessage);
  }

  function checkImageType(fileType: string) {
    return Object.keys(IMAGE_FILE_TYPE).includes(fileType);
  }

  return { imageFile, previewImage, uploadImageFile };
}
