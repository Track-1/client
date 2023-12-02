import { atom } from "recoil";
import { ConventionModalType } from "../../type/common/conventionModalType";

export const openConventionModal = atom<ConventionModalType>({
  key: "openConventionModal",
  default: {
    policy: "",
    isOpen: false,
  },
});
