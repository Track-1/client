import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const role = atom({
  key: 'role',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
