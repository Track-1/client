import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserType } from 'track-1-shared/src/types/common/userType';

const { persistAtom } = recoilPersist();

interface LoginUserDataType {
  userType: UserType;
  userId: number;
  userImageFile: string;
  userName: string;
}

export const loginUserData = atom<LoginUserDataType>({
  key: 'loginUserData',
  default: {
    userType: 'vocal',
    userId: -1,
    userImageFile: '',
    userName: '',
  },
  effects_UNSTABLE: [persistAtom],
});
