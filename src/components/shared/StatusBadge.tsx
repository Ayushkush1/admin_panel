import React from 'react';
import { cn } from '../../utils/cn';

type Status = 'pending' | 'approved' | 'rejected' | 'flagged';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'approved':
        return 'bg-accent-100 text-accent-700';
      case 'rejected':
        return 'bg-danger-100 text-danger-700';
      case 'flagged':
        return 'bg-warning-100 text-warning-700 border border-warning-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      case 'flagged':
        return 'Flagged';
      default:
        return status;
    }
  };

  return (
    <span className={cn(
      "inline-flex rounded-full font-medium",
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs',
      getStatusClasses()
    )}>
      {getStatusText()}
    </span>
  );
};

export default StatusBadge;