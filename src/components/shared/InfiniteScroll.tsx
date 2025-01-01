import React, { useEffect, useRef, useCallback } from 'react';

interface Props {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll: React.FC<Props> = ({ onLoadMore, hasMore, isLoading, children }) => {
  const observer = useRef<IntersectionObserver>();
  const loadingRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore]
  );

  return (
    <div className="space-y-4">
      {children}
      <div ref={loadingRef} className="h-10">
        {isLoading && <LoadingSkeleton />}
      </div>
    </div>
  );
};