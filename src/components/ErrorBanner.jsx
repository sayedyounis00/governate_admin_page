import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorBanner = ({ message, onRetry }) => {
  return (
    <div className="bg-danger/10 border border-danger/30 p-4 md:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm my-6 md:my-8">
      <div className="text-danger font-bold flex items-center gap-3 text-sm md:text-base">
        <AlertCircle size={20} className="shrink-0" />
        <span>{message || 'حدث خطأ أثناء جلب البيانات.'}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-5 py-2.5 bg-danger text-white rounded-lg text-sm font-bold hover:bg-red-600 transition-colors shrink-0"
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;
