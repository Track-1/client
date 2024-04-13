import { atom } from 'recoil';
import { UserType } from 'track-1-shared/src/types/common/userType';

export const role = atom<UserType | null>({
  key: 'role',
  default: null,
});
