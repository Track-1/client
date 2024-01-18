import { useParams } from 'react-router-dom';

import UserProfile from './common/userProfile';
import { useGetVocalPortfolio, useGetVocalProfile } from '../../hooks/queries/mypage';
import VocalPortfolio from './common/vocalPortfolio';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import { InfinityObserver } from '../common/Interface';
import Loading from '../common/Loading';

export default function VocalProfileContainer() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  const { vocalPortfolios, fetchNextPage, hasNextPage } = useGetVocalPortfolio({
    limit: 1,
    userId: Number(vocalId),
  });

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <>
      {Number(vocalId) === vocalProfile?.userProfile.userId ? (
        <>
          <UserProfile userType="vocal" profileInfo={vocalProfile} />
          <VocalPortfolio
            vocalPortfolios={vocalPortfolios}
            userName={vocalProfile?.userProfile.userName}></VocalPortfolio>
          <InfinityObserver ref={observerRef} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
