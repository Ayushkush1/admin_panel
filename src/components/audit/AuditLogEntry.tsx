import React from 'react';
import { format } from 'date-fns';
import { Check, X, Flag, Eye, User } from 'lucide-react';
import { AuditLog } from '../../types/audit';
import { cn } from '../../utils/cn';

interface AuditLogEntryProps {
  log: AuditLog;
}

const AuditLogEntry: React.FC<AuditLogEntryProps> = ({ log }) => {
  const getActionIcon = () => {
    switch (log.action) {
      case 'approved':
        return <Check size={16} className="text-accent-500" />;
      case 'rejected':
        return <X size={16} className="text-danger-500" />;
      case 'flagged':
        return <Flag size={16} className="text-warning-500" />;
      case 'viewed':
        return <Eye size={16} className="text-primary-500" />;
      default:
        return <User size={16} className="text-gray-500" />;
    }
  };
  
  const getActionText = () => {
    switch (log.action) {
      case 'approved':
        return 'approved a submission';
      case 'rejected':
        return 'rejected a submission';
      case 'flagged':
        return 'flagged a submission';
      case 'viewed':
        return 'viewed a submission';
      default:
        return log.action;
    }
  };
  
  const getActionClass = () => {
    switch (log.action) {
      case 'approved':
        return 'bg-accent-100 text-accent-700';
      case 'rejected':
        return 'bg-danger-100 text-danger-700';
      case 'flagged':
        return 'bg-warning-100 text-warning-700';
      case 'viewed':
        return 'bg-primary-100 text-primary-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
      <div className="flex items-start">
        <div className="mr-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {log.adminInitials}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{log.adminName}</span>
            <span className="text-textSecondary">{getActionText()}</span>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center",
              getActionClass()
            )}>
              {getActionIcon()}
              <span className="ml-1">{log.action}</span>
            </span>
          </div>
          
          <div className="mt-1 text-sm text-textSecondary">
            Submission ID: {log.submissionId.substring(0, 8)} • {log.submissionName}
          </div>
          
          {log.reason && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
              <span className="font-medium">Reason: </span>
              {log.reason}
            </div>
          )}
          
          <div className="mt-2 text-xs text-textSecondary">
            {format(new Date(log.timestamp), 'MMM dd, yyyy - HH:mm:ss')} •
            IP: {log.ipAddress}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogEntry;