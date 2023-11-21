export function createFileName(file: File, maxLenth: number) {
  const fileName = file.name;
  const fileType = fileName.slice(-4);

  if (fileName.length < maxLenth) return fileName;

  return fileName.slice(0, maxLenth - 4) + fileType;
}
