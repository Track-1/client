import { LIMIT_IMAGE_SIZE } from "../../core/common/fileSize";

export function checkFileSize(imageSize: number) {
  if (imageSize > LIMIT_IMAGE_SIZE) {
    alert("Only files under 5 MB can be uploaded.\n5MB 이하의 파일만 업로드 가능합니다.");
    return false;
  }
  return true;
}

