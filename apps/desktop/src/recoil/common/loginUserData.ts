import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ROLE } from '../../core/common/roleType';
import { LoginUserDataType } from '../../type/common/userType';

const { persistAtom } = recoilPersist();

export const loginUserData = atom<LoginUserDataType>({
  key: 'loginUserDataKey',
  default: { userImageFile: '', userId: -1, userType: ROLE.PRODUCER, userName: '', userContact: '' },
  effects_UNSTABLE: [persistAtom],
});
