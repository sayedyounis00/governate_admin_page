import React from 'react';

const DetailRow = ({ label, value, isPhone = false }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 border-b border-border last:border-0">
      <div className="w-full sm:w-1/3 font-medium text-text-muted mb-1 sm:mb-0">
        {label}
      </div>
      <div className="w-full sm:w-2/3 text-text-main font-semibold">
        {value === null || value === undefined || value === '' ? (
          <span className="text-text-muted italic">غير متاح</span>
        ) : isPhone ? (
          <a href={`tel:${value}`} dir="ltr" className="text-primary hover:underline inline-block">{value}</a>
        ) : (
          value
        )}
      </div>
    </div>
  );
};

export default DetailRow;
