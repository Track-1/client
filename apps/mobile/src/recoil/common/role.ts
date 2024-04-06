import { atom } from 'recoil';
import { UserType } from '../../type/common/userType';

export const role = atom<UserType | null>({
  key: 'role',
  default: null,
});
