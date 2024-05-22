import { useEffect, useRef } from 'react';

export default function useInfiniteScroll(fetchNextPage: any, hasNextPage: any) {
  const observerRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleObserver = (entries: any) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const element = observerRef.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    element && observer.observe(element);
    return () => {
      element && observer.unobserve(element);
    };
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return { observerRef };
}
