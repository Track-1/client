import { atom } from "recoil";
import {recoilPersist} from "recoil-persist";
const {persistAtom}=recoilPersist();

export const categorySelect = atom({
  key: "categorySelect",
  default: "&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8",
  effects_UNSTABLE:[persistAtom],
});

export const trackSearching=atom({
  key: "trackSearching",
  default: false,
})

export const TracksData=atom({
  key:"TracksData",
  default:{
    beatId: -1,
    jacketImage: ``,
    wavFile: ``,
    title: ``,
    producerName: ``,
    keyword: [],
    category: ``,
    wavFileLength: -1
  }
})