import { atom } from "recoil";

import { PageType } from "../../type/common/pageType";

export const trackSearchPageType = atom<PageType>({
  key: "trackSearchPageType",
  default: "tracks",
});
