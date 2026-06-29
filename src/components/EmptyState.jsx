import React from 'react';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4 opacity-50">🔍</div>
      <h3 className="text-xl font-medium text-text-main">{message}</h3>
    </div>
  );
};

export default EmptyState;
