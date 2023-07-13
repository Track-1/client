export interface ImageElement {
  imageFile: File | Blob | null;
  previewImage: string | ArrayBuffer | null;
}

export interface AudioElement {
  fileName: string;
  audioType: string;
  audioFile: File | null;
}

export interface UploadInitType {
  image: ImageElement;
  title: string;
  audio: AudioElement;
  category: string;
  hashtags: Array<string>;
  description: string;
}
