import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: Record<string, string>) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    documentType: '',
    dateRange: '',
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };
  
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearFilters = () => {
    setFilters({
      status: '',
      documentType: '',
      dateRange: '',
    });
    onFilterChange({});
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-textSecondary" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, email or ID..."
            className="input-field pl-10"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`button-secondary flex items-center gap-2 ${showFilters ? 'bg-primary-50 text-primary-600' : ''}`}
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="mt-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Filter Submissions</h4>
            <button
              onClick={clearFilters}
              className="text-sm text-textSecondary hover:text-primary-500 flex items-center gap-1"
            >
              <X size={14} />
              <span>Clear all</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-textSecondary mb-1">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="input-field"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="documentType" className="block text-sm font-medium text-textSecondary mb-1">
                Document Type
              </label>
              <select
                id="documentType"
                value={filters.documentType}
                onChange={(e) => handleFilterChange('documentType', e.target.value)}
                className="input-field"
              >
                <option value="">All</option>
                <option value="Passport">Passport</option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Utility Bill">Utility Bill</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-textSecondary mb-1">
                Date Range
              </label>
              <select
                id="dateRange"
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="input-field"
              >
                <option value="">All time</option>
                <option value="today">Today</option>
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="last90days">Last 90 days</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;