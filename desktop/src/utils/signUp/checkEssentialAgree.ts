import { ConventionChecksType } from "../../type/signUp/conventionChecksType";

export function checkEssentialAgree(checkedConventions: ConventionChecksType[]) {
  return checkedConventions[1].selected === true && checkedConventions[2].selected === true;
}
