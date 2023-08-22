export function getAudioFileType(file: string, fileLength: number): string {
  return file.substring(file.lastIndexOf("\\") + 1).substring(fileLength - 4);
}
