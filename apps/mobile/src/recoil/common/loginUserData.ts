import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserType } from '../../type/common/userType';

const { persistAtom } = recoilPersist();

export const loginUserType = atom<UserType>({
  key: 'loginUserType',
  default: 'vocal',
  effects_UNSTABLE: [persistAtom],
});

export const loginUserId = atom<number>({
  key: 'loginUserId',
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

interface LoginUserDataType {
  userType: UserType;
  userId: number;
}

export const loginUserData = atom<LoginUserDataType>({
  key: 'loginUserData',
  default: {
    userType: 'vocal',
    userId: -1,
  },
});
