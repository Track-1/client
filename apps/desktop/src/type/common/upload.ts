import { PRODUCER_UPLOAD_TYPE } from "../../core/common/uploadType";

export type ProducerUploadType = typeof PRODUCER_UPLOAD_TYPE[keyof typeof PRODUCER_UPLOAD_TYPE];

export type UploadInputType = {
  image: string;
  title: string;
  audioFile: FileList;
  hashtag: string[];
  description: string;
};

export type UploadPageType = "track" | "vocal" | "producer";
