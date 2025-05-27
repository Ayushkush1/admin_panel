import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { mockSubmissions } from '../../data/mockData';
import StatusBadge from '../shared/StatusBadge';

const RecentSubmissionsTable: React.FC = () => {
  const navigate = useNavigate();
  const recentSubmissions = mockSubmissions.slice(0, 5);
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="card overflow-hidden"
    >
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="font-heading font-semibold text-lg">Recent Submissions</h3>
          <p className="text-textSecondary text-sm">Latest KYC submissions</p>
        </div>
        <button 
          className="button-secondary text-sm"
          onClick={() => navigate('/submissions')}
        >
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Document
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-textSecondary uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentSubmissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-medium text-primary-700">
                      {submission.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-textPrimary">{submission.name}</p>
                      <p className="text-xs text-textSecondary">{submission.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-textPrimary">
                  {submission.documentType}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-textSecondary">
                  {format(new Date(submission.submissionDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={submission.status} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => navigate(`/submissions/${submission.id}`)}
                    className="text-primary-500 hover:text-primary-700 p-1 rounded-full hover:bg-primary-50"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentSubmissionsTable;