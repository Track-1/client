export interface TracksDataType {
  beatId: number;
  jacketImage: string;
  wavFile: string;
  title: string;
  producerName: string;
  producerId: number;
  keyword: string[];
  category: string;
  wavFileLength: number;
}

export interface TrackInfoDataType {
  beatId: number;
  jacketImage: string;
  beatWavFile: string;
  title: string;
  producerName: string;
  producerId: number;
  producerProfileImage: string;
  introduce: string;
  keyword: string[];
  category: string;
  isMe: boolean;
  wavFileLength: number;
  isClosed: boolean; // 마감여부 -> 마감 안함=False
}

export interface AudioFileDataType {
  wavFile: string;
  wavFileLength: number;
  beatId: number;
}
