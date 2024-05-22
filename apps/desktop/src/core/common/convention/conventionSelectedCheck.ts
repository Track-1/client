import { ConventionChecksType } from "../../../type/signUp/conventionChecksType";
import { CONVENTION_TYPE } from "./conventionType";

export const CONVENTION_SELECTED_CHECK: ConventionChecksType[] = [
  { id: 0, selected: false, text: "전체 동의하기", policy: "" },
  { id: 1, selected: false, text: "(필수) 개인정보처리방침 동의", policy: CONVENTION_TYPE.PERSONAL },
  { id: 2, selected: false, text: "(필수) 사이트 이용약관 동의", policy: CONVENTION_TYPE.USINGSITE },
  { id: 3, selected: false, text: "(선택) 마케팅 정보 수신 동의", policy: CONVENTION_TYPE.MARKETING },
];
