import { useRef, useEffect, useCallback } from 'react';

const useFetchScroll = (targetEl: React.RefObject<HTMLDivElement>, fetchCallback) => {
  const observerRef = useRef<IntersectionObserver>(null);

  const getObserber = useCallback(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchCallback();
          observerRef.current?.unobserve(targetEl.current.lastElementChild);
        }
      },
      { rootMargin: '0px', threshold: 0 },
    );
  }, [fetchCallback]);

  useEffect(() => {
    if (!targetEl.current?.lastElementChild) return;
    getObserber();
    observerRef.current.observe(targetEl.current.lastElementChild);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [targetEl.current, getObserber]);
};

export default useFetchScroll;
