import { currentUser } from "../../core/constants/userType";

export function isMaker(userType: string): boolean {
  return userType === currentUser.PRODUCER;
}
