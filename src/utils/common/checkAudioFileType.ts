import { AudioFileType } from "../../type/common/audioFileType";

export function checkAudioFileType(audioFileType: string): audioFileType is AudioFileType {
  return [".mp3", ".wav", "MP3", ".WAV"].includes(audioFileType);
}
