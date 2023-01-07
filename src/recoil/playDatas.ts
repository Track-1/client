import { atom } from "recoil";

interface DataTypes {
  beatId: number | undefined;
  jacketImage: string;
  wavFile: string;
  title: string;
  producerName: string;
  wavFileLength: number;
}

export const playDatas = atom<DataTypes>({
  key: "playDatas",
  default: {
    beatId: undefined,
    jacketImage: "",
    wavFile: "",
    title: "string",
    producerName: "string",
    wavFileLength: 0,
  },
});
