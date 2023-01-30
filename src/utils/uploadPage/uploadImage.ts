import { fileSize } from "../../core/constants/fileSize";
import TrackUploadDefaultImg from "../../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";

export function uploadImage(
  e: React.ChangeEvent<HTMLInputElement>,
  setUploadImg: React.Dispatch<React.SetStateAction<string>>,
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>,
): void {
  const uploadName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
  if (checkImageType(uploadName) && e.target.files) {
    const file = e.target.files[0];
    const fileUrl: string = getFileURL(file);
    const imageSize: number = getFileSize(file);
    if (checkImageSize(imageSize)) {
      setUploadImg(fileUrl);
      setUploadData((prevState) => {
        return { ...prevState, jacketImage: file };
      });
    }
  }
}

export function isDefaultImage(image: string): boolean {
  return image !== (TrackUploadDefaultImg || VocalUploadDefaultImg);
}

function getFileURL(file: File): string {
  return URL.createObjectURL(file);
}

function getFileSize(file: File): number {
  return file.size;
}

function getImageType(uploadName: string): string {
  return uploadName.substring(uploadName.length - 4);
}

function checkImageSize(imageSize: number): boolean {
  if (imageSize > fileSize.LIMIT_IMAGE_SIZE) alert("파일용량 제한은 5MB 입니다.");
  return imageSize < fileSize.LIMIT_IMAGE_SIZE;
}

function checkImageType(uploadName: string): boolean {
  const fileType = getImageType(uploadName);
  !(fileType === ".jpg" || fileType === "jpeg" || fileType === ".png") && alert("확장자명을 확인해 주세요.");
  return fileType === ".jpg" || fileType === "jpeg" || fileType === ".png";
}
