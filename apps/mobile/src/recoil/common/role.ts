import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { ROLE } from '../../core/common/roleType';

const { persistAtom } = recoilPersist();

export const role = atom({
  key: 'role',
  default: ROLE.PRODUCER,
  effects_UNSTABLE: [persistAtom],
});
