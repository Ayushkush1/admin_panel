import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck } from 'lucide-react';
import AuditLogEntry from '../components/audit/AuditLogEntry';
import { mockAuditLogs } from '../data/mockData';

const AuditLogs: React.FC = () => {
  const [filter, setFilter] = useState('all');
  
  // Filter logs by action type
  const filteredLogs = filter === 'all' 
    ? mockAuditLogs 
    : mockAuditLogs.filter(log => log.action === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Audit Logs</h1>
        <p className="text-textSecondary">Track all admin actions on KYC submissions</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ClipboardCheck size={20} className="text-primary-500 mr-2" />
            <h2 className="font-heading font-semibold">Activity Log</h2>
          </div>
          
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Activities</option>
              <option value="approved">Approvals</option>
              <option value="rejected">Rejections</option>
              <option value="flagged">Flags</option>
              <option value="viewed">Views</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4 p-3 bg-primary-50 rounded-lg text-sm text-primary-700">
          <p>Showing {filteredLogs.length} audit log entries {filter !== 'all' ? `for "${filter}" actions` : ''}</p>
        </div>
        
        <div>
          {filteredLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AuditLogEntry log={log} />
            </motion.div>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-6 text-textSecondary">
              No audit logs found for the selected filter
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;