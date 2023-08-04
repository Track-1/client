import { ROLE } from "../../core/common/roleType";

export function isVocal(userType: string): boolean {
  return userType === ROLE.VOCAL;
}

export function isProducer(userType: string): boolean {
  return userType === ROLE.PRODUCER;
}
