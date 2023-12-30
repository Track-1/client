import { useParams } from 'react-router-dom';
import UserProfile from './common/userProfile';
import {
  useGetProducerPortfolio,
  useGetProducerProfile,
  useGetProducerVocalSearching,
} from '../../hooks/queries/mypage';
import ProducerPortfolio from './common/producerPortfolio';
import { useState } from 'react';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import { InfinityObserver } from '../common/Interface';

export default function ProducerProfileContainer() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  const {
    producerPortfolios,
    fetchNextPage: portfolioFetchNextPage,
    hasNextPage: portfolioHasNextPage,
  } = useGetProducerPortfolio({
    limit: 1,
    userId: Number(producerId),
  });
  const { producerVocalSearchings, fetchNextPage, hasNextPage } = useGetProducerVocalSearching({
    limit: 1,
    userId: Number(producerId),
  });

  const { observerRef: portfolioRef } = useInfiniteScroll(portfolioFetchNextPage, portfolioHasNextPage);
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <>
      <UserProfile userType="producer" profileInfo={producerProfile} />
      <ProducerPortfolio
        producerPortfolio={producerPortfolios}
        producerVocalSearchings={producerVocalSearchings}
        userName={producerProfile?.userProfile.userName}
      />
      <InfinityObserver ref={portfolioRef} />
      <InfinityObserver ref={observerRef} />
    </>
  );
}
