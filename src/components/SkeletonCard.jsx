import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border/40 rounded-2xl p-6 shadow-sm animate-pulse relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="h-7 w-28 bg-border/50 rounded-lg"></div>
        <div className="h-8 w-8 bg-border/50 rounded-full"></div>
      </div>
      <div className="h-8 w-3/4 bg-border/60 rounded-md mb-8"></div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-border/50 rounded-md shrink-0"></div>
          <div className="h-4 w-1/2 bg-border/50 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-border/50 rounded-md shrink-0"></div>
          <div className="h-4 w-1/3 bg-border/50 rounded"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-border/50 rounded-md shrink-0"></div>
          <div className="h-4 w-1/3 bg-border/50 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
