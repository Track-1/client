import { AUDIO_FILE_TYPE, IMAGE_FILE_TYPE } from "../../core/common/fileType";

export function checkAudioFileType(audioFileType: string) {
  return Object.values(AUDIO_FILE_TYPE).includes(audioFileType);
}

export function checkImageFileType(imageFileType: string){
  return Object.values(IMAGE_FILE_TYPE).includes(imageFileType);
}
