import { ROLE } from '../../core/common/roleType';
import { UserType } from '../../type/common/userType';

export function isVocal(userType: UserType): boolean {
  return userType === ROLE.VOCAL;
}

export function isProducer(userType: UserType): boolean {
  return userType === ROLE.PRODUCER;
}
