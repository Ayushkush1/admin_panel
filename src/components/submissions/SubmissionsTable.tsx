import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import StatusBadge from '../shared/StatusBadge';
import SearchFilter from '../shared/SearchFilter';
import { mockSubmissions } from '../../data/mockData';

interface SubmissionsTableProps {
  title?: string;
  description?: string;
  filterByStatus?: string;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ 
  title = "All KYC Submissions", 
  description = "Review and manage all KYC verification submissions",
  filterByStatus
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  
  const itemsPerPage = 10;
  
  // Filter submissions
  const filteredSubmissions = mockSubmissions.filter(submission => {
    // Apply status filter if provided in props
    if (filterByStatus && submission.status !== filterByStatus) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        submission.name.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query) ||
        submission.id.toLowerCase().includes(query)
      );
    }
    
    // Apply active filters
    if (activeFilters.status && submission.status !== activeFilters.status) {
      return false;
    }
    
    if (activeFilters.documentType && submission.documentType !== activeFilters.documentType) {
      return false;
    }
    
    if (activeFilters.dateRange) {
      const today = new Date();
      const submissionDate = new Date(submission.submissionDate);
      
      if (activeFilters.dateRange === 'today') {
        return (
          submissionDate.getDate() === today.getDate() &&
          submissionDate.getMonth() === today.getMonth() &&
          submissionDate.getFullYear() === today.getFullYear()
        );
      } else if (activeFilters.dateRange === 'last7days') {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        return submissionDate >= lastWeek;
      } else if (activeFilters.dateRange === 'last30days') {
        const lastMonth = new Date(today);
        lastMonth.setDate(today.getDate() - 30);
        return submissionDate >= lastMonth;
      } else if (activeFilters.dateRange === 'last90days') {
        const lastQuarter = new Date(today);
        lastQuarter.setDate(today.getDate() - 90);
        return submissionDate >= lastQuarter;
      }
    }
    
    return true;
  });
  
  // Paginate submissions
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset to first page when searching
  };
  
  const handleFilterChange = (filters: Record<string, string>) => {
    setActiveFilters(filters);
    setPage(1); // Reset to first page when filtering
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-heading font-bold">{title}</h2>
        <p className="text-textSecondary">{description}</p>
      </div>
      
      <SearchFilter 
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Document
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubmissions.length > 0 ? (
                paginatedSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-medium text-primary-700">
                          {submission.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-textPrimary">{submission.name}</p>
                          <p className="text-xs text-textSecondary">{submission.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm text-textPrimary">{submission.documentType}</p>
                        <p className="text-xs text-textSecondary">{submission.documentId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                      {format(new Date(submission.submissionDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={submission.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => navigate(`/submissions/${submission.id}`)}
                        className="button-primary flex items-center"
                      >
                        <Eye size={16} className="mr-1" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-textSecondary">
                    No submissions found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-textSecondary">
              Showing <span className="font-medium">{(page - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(page * itemsPerPage, filteredSubmissions.length)}
              </span>{' '}
              of <span className="font-medium">{filteredSubmissions.length}</span> submissions
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-md border border-gray-300 bg-white text-textSecondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="text-sm font-medium">
                Page {page} of {totalPages}
              </div>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-md border border-gray-300 bg-white text-textSecondary hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SubmissionsTable;