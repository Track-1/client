import { currentUser } from "../../core/constants/userType";

export function checkUserType(userType: string): boolean {
  return userType === currentUser.PRODUCER;
}
