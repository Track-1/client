import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ROLE } from '../../core/common/roleType';
import { UserType } from '../../type/common/userType';

const { persistAtom } = recoilPersist();

export const loginUserType = atom<UserType>({
  key: 'loginUserType',
  default: ROLE.PRODUCER,
  effects_UNSTABLE: [persistAtom],
});

export const loginUserId = atom<number>({
  key: 'loginUserId',
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export const loginUserImage = atom<string>({
  key: 'loginUserImage',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const loginUserName = atom<string>({
  key: 'loginUserName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const loginUserContact = atom<string>({
  key: 'loginUserContact',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
