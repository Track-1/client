import React, { useState, useEffect } from "react";

export default function useIntersectObserver(intersectRef: any, optionsObject: any) {
  const { root = null, rootMargin = "0px", threshold } = optionsObject;

  const options = {
    root: root,
    rootMargin: rootMargin,
    threshold: threshold,
  };

  const [isIntersect, setIsIntersect] = useState<boolean>(false);

  const handleObserver = (entries: Array<any>) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setIsIntersect(true);
    } else {
      setIsIntersect(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (intersectRef.current) observer.observe(intersectRef.current);
    return () => observer.disconnect();
  }, []);
  return {
    isIntersect,
  };
}
