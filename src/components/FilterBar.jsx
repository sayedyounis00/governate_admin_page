import React from 'react';
import { FilterX, Map, MapPin } from 'lucide-react';

const FilterBar = ({ 
  governorates, 
  centers, 
  selectedGovernorate, 
  selectedCenter, 
  onGovernorateChange, 
  onCenterChange, 
  onClearFilters 
}) => {
  const hasActiveFilters = selectedGovernorate || selectedCenter;

  return (
    <div className="bg-surface/80 backdrop-blur-xl border border-border/80 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-lg shadow-black/10 mb-6 md:mb-10 flex flex-col md:flex-row gap-4 md:gap-5 items-end relative z-10">
      <div className="flex-1 w-full relative">
        <label className="block text-sm md:text-base font-semibold text-text-main mb-2 md:mb-3 flex items-center gap-2">
          <Map size={18} className="text-primary" /> المحافظة
        </label>
        <div className="relative">
          <select
            value={selectedGovernorate}
            onChange={(e) => onGovernorateChange(e.target.value)}
            className="w-full appearance-none bg-background/50 border border-border/80 rounded-xl px-4 py-3 md:py-3.5 pr-12 text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer hover:bg-background/80 text-sm md:text-base"
          >
            <option value="">كل المحافظات</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <label className="block text-sm md:text-base font-semibold text-text-main mb-2 md:mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-primary" /> المركز
        </label>
        <div className="relative">
          <select
            value={selectedCenter}
            onChange={(e) => onCenterChange(e.target.value)}
            disabled={!selectedGovernorate}
            className="w-full appearance-none bg-background/50 border border-border/80 rounded-xl px-4 py-3 md:py-3.5 pr-12 text-text-main font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-background/80 text-sm md:text-base"
          >
            <option value="">كل المراكز</option>
            {centers.map((center) => (
              <option key={center} value={center}>{center}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="w-full md:w-auto px-6 py-3.5 bg-danger/10 text-danger border border-danger/20 rounded-xl font-semibold hover:bg-danger hover:text-white transition-all flex items-center justify-center gap-2 text-sm md:text-base mt-2 md:mt-0 shrink-0"
        >
          <FilterX size={18} /> مسح الفلتر
        </button>
      )}
    </div>
  );
};

export default FilterBar;
