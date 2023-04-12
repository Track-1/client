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
  if (e.target.files?.length===0) {
    //alert("사진삽입이 취소되었습니다.")
  }else{
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
}

export function isDefaultImage(image: string): boolean {
  return image === TrackUploadDefaultImg || image === VocalUploadDefaultImg;
}

export function getFileURL(file: File): string {
  return URL.createObjectURL(file);
}

export function getFileSize(file: File): number {
  return file.size;
}

export function getImageType(uploadName: string): string {
  return uploadName.substring(uploadName.length - 4);
}

export function checkImageSize(imageSize: number): boolean {
  if (imageSize > fileSize.LIMIT_IMAGE_SIZE) alert("Only files under 5 MB can be uploaded.\n5MB 이하의 파일만 업로드 가능합니다.");
  return imageSize < fileSize.LIMIT_IMAGE_SIZE;
}

export function checkImageType(uploadName: string): boolean {
  const fileType = getImageType(uploadName);
  !(fileType === ".jpg" || fileType === "jpeg" || fileType === ".png" || fileType === ".JPG" || fileType === ".JPEG" || fileType === ".PNG") && alert("You can only upload images in jpg, jpeg, and png formats.\njpg, jpeg, png형식의 이미지만 업로드할 수 있습니다.");
  return fileType === ".jpg" || fileType === "jpeg" || fileType === ".png" || fileType === ".JPG" || fileType === ".JPEG" || fileType === ".PNG";
}
