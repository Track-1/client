export function getAudioFileName(file: string): string {
  return file.substring(file.lastIndexOf("\\") + 1);
}
