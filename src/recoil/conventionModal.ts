import { atom } from "recoil";

export const openConventionModal = atom({
  key: "openConventionModal",
  default: false,
});

export const openConventionPolicy = atom({
    key: "openConventionPolicy",
    default: '',
  });

  export const openEventModal = atom({
    key: "openEventModal",
    default: true,
  });