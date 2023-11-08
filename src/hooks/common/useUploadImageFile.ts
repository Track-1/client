import { useState } from "react";
import { LIMIT_IMAGE_SIZE } from "../../core/common/fileSize";
import { uploadImageTypeWarningMessage } from "../../core/common/warningMessage";
import { checkFileSize } from "../../utils/common/checkFileSize";
import { checkImageFileType } from "../../utils/common/checkFileType";

export default function useUploadImageFile(prevUserImage?: string) {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(prevUserImage ?? "");

  function changePreviewImage(image: string) {
    setPreviewImage(image);
  }

  function handleUploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    const imageSize = imageFile && checkFileSize(imageFile.size) ? imageFile.size : 0;
    const imageType = imageFile ? getImageType(imageFile) : "";

    if (imageSize && imageType) {
      setImageFile(imageFile);

      const reader = new FileReader();
      imageFile && reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
    }
  }

  function getImageType(imageFile: File) {
    const type = imageFile.type.toString().replace("image/", ".");
    return checkImageFileType(type) ? type : alert(uploadImageTypeWarningMessage);
  }

  function checkImageSize(imageSize: number | undefined) {
    if (imageSize) {
      if (imageSize > LIMIT_IMAGE_SIZE)
        alert("Only files under 5 MB can be uploaded.\n5MB 이하의 파일만 업로드 가능합니다.");
      return imageSize < LIMIT_IMAGE_SIZE;
    }
  }

  function checkImageType(fileType: string | undefined) {
    !(
      fileType === ".jpg" ||
      fileType === ".jpeg" ||
      fileType === ".png" ||
      fileType === ".JPG" ||
      fileType === ".JPEG" ||
      fileType === ".PNG"
    ) &&
      alert(
        "You can only upload images in jpg, jpeg, and png formats.\njpg, jpeg, png형식의 이미지만 업로드할 수 있습니다.",
      );
    return (
      fileType === ".jpg" ||
      fileType === ".jpeg" ||
      fileType === ".png" ||
      fileType === ".JPG" ||
      fileType === ".JPEG" ||
      fileType === ".PNG"
    );
  }

  function getFileURL(file: File): string {
    return URL.createObjectURL(file);
  }

  function getFileSize(file: File): number {
    return file.size;
  }

  return {
    imageFile,
    previewImage,
    changePreviewImage,
    handleUploadImageFile,
    checkImageType,
    checkImageSize,
    getFileURL,
    getFileSize,
  };
}
