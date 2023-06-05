import { useState } from "react";
import { LIMIT_IMAGE_SIZE } from "../../core/common/fileSize";

export default function useUploadImageFile() {
  const [imageFile, setImageFile] = useState<File | Blob | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>("");

  //오디오 업로드
  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFile = e.target.files && e.target.files[0];
    const imageSize = imageFile?.size;
    const imageType = getImageType(imageFile?.type);

    if (checkImageSize(imageSize) && checkImageType(imageType)) {
      setImageFile(imageFile);

      const reader = new FileReader();
      imageFile && reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }

  function getImageType(uploadName: string | undefined) {
    if (uploadName) {
      return uploadName.substring(uploadName.length - 4);
    }
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
      fileType === "jpeg" ||
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
      fileType === "jpeg" ||
      fileType === ".png" ||
      fileType === ".JPG" ||
      fileType === ".JPEG" ||
      fileType === ".PNG"
    );
  }

  return [imageFile, previewImage, uploadImageFile] as const;
}
