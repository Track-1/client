import { checkIsLogin, checkIsProducer } from 'track-1-shared';
import MainBanner from './mainBanner';
import { useRecoilValue } from 'recoil';
import { loginUserData } from 'src/recoil/common/loginUserData';
import { RecentTrackList } from './recentTrackList';
import RecentVocalList from './recentVocalList';

export default function MainPageContainer() {
  const { userType } = useRecoilValue(loginUserData);

  return (
    <>
      <MainBanner />
      {checkIsLogin() && checkIsProducer(userType) ? (
        <>
          {/* <SectionDivider /> */}
          <RecentVocalList />
          <RecentTrackList />

          {/* <SectionDivider /> */}
        </>
      ) : (
        <>
          <RecentTrackList />
          {/* <SectionDivider /> */}
          <RecentVocalList />
          {/* <SectionDivider />  */}
        </>
      )}
    </>
  );
}
