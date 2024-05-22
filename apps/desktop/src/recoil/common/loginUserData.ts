import zizi from '../../assets/image/zizi.jpeg';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ROLE } from '../../core/common/roleType';
import { LoginUserDataType } from '../../type/common/userType';

const { persistAtom } = recoilPersist();

export const loginUserData = atom<LoginUserDataType>({
  key: 'loginUserDataKey',
  default: { userImageFile: zizi, userId: -1, userType: ROLE.PRODUCER, userName: 'nave', userContact: '010-0000-0000' },
  effects_UNSTABLE: [persistAtom],
});
