import { useCallback, useEffect, useRef } from "react";

export default function useInfiniteScroll(fetchNextPage: any, hasNextPage: any) {
  const observerRef = useRef(null);

  const handleObserver = useCallback(
    (entries: any) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

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
