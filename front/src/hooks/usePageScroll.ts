import { useCallback, useRef, useEffect } from 'react';

interface PageScrollRef {
  [page: string]: number;
}

const SCROLL_DEBOUNCE_MS = 200;
const SCROLL_PATH_X = 0;

const usePageScroll = (path: string) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const scrollRef = useRef<PageScrollRef>({});

  const scrollHandler = useCallback(() => {
    scrollRef.current[path] = document.body.scrollTop;
  }, [path]);

  const debounceHandler = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(scrollHandler, SCROLL_DEBOUNCE_MS);
  }, [timerRef.current, scrollHandler]);

  useEffect(() => {
    document.body.scrollTo(SCROLL_PATH_X, scrollRef.current[path]);
    document.body.addEventListener('scroll', debounceHandler);

    return () => {
      document.body.removeEventListener('scroll', debounceHandler);
    };
  }, [path]);
};

export default usePageScroll;
