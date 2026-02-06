import React from 'react';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  animalFilter: string;
  onAnimalChange: (v: string) => void;
  animalTypes: string[];
  statusFilter: string;
  onStatusChange: (v: string) => void;
  conditionFilter: string;
  onConditionChange: (v: string) => void;
  cityFilter: string;
  onCityChange: (v: string) => void;
  siteNames: string[];
  sortOrder: 'recent' | 'oldest';
  onSortChange: (v: 'recent' | 'oldest') => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

const FilterPill: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
      active
        ? 'bg-red-600 text-white shadow-sm'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
    }`}
  >
    {label}
  </button>
);

const STATUS_OPTIONS = ['All', 'Completed', 'On The Way', 'Animal Not Found'];
const CONDITION_OPTIONS = ['All', 'Normal', 'Moderate', 'Critical'];

const FilterBar: React.FC<FilterBarProps> = ({
  search, onSearchChange,
  animalFilter, onAnimalChange, animalTypes,
  statusFilter, onStatusChange,
  conditionFilter, onConditionChange,
  cityFilter, onCityChange, siteNames,
  sortOrder, onSortChange,
  resultCount, hasActiveFilters, onClearAll,
}) => {
  return (
    <div className="sticky top-[57px] z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 space-y-3">
        {/* Search + Sort row */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search cases, locations, observations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as 'recent' | 'oldest')}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 shrink-0"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Filter pills */}
        <div className="space-y-2">
          {/* Animal type */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider self-center shrink-0 mr-1">Animal</span>
            {animalTypes.map(t => (
              <FilterPill key={t} label={t} active={animalFilter === t} onClick={() => onAnimalChange(t)} />
            ))}
          </div>

          {/* Status */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider self-center shrink-0 mr-1">Status</span>
            {STATUS_OPTIONS.map(s => (
              <FilterPill key={s} label={s} active={statusFilter === s} onClick={() => onStatusChange(s)} />
            ))}
          </div>

          {/* Condition */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider self-center shrink-0 mr-1">Condition</span>
            {CONDITION_OPTIONS.map(c => (
              <FilterPill key={c} label={c} active={conditionFilter === c} onClick={() => onConditionChange(c)} />
            ))}
          </div>

          {/* City dropdown + results counter */}
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={cityFilter}
              onChange={(e) => onCityChange(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {siteNames.map(s => (
                <option key={s} value={s}>{s === 'All' ? 'All Cities' : s}</option>
              ))}
            </select>
            <span className="text-xs text-slate-500 font-medium">{resultCount} results</span>
            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
              >
                <X size={12} /> Clear all filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
