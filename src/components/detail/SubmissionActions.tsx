import React, { useState } from 'react';
import { CheckCircle, XCircle, Flag, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SubmissionActionsProps {
  onApprove: () => void;
  onReject: (reason: string) => void;
  onFlag: (reason: string) => void;
}

const SubmissionActions: React.FC<SubmissionActionsProps> = ({
  onApprove,
  onReject,
  onFlag,
}) => {
  const [action, setAction] = useState<'approve' | 'reject' | 'flag' | null>(null);
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  
  const handleApprove = () => {
    setAction('approve');
    setTimeout(() => {
      onApprove();
      setAction(null);
    }, 500);
  };
  
  const handleReject = () => {
    if (action !== 'reject') {
      setAction('reject');
      return;
    }
    if (reason) {
      onReject(reason);
      setAction(null);
      setReason('');
    }
  };
  
  const handleFlag = () => {
    if (action !== 'flag') {
      setAction('flag');
      return;
    }
    if (reason) {
      onFlag(reason);
      setAction(null);
      setReason('');
    }
  };
  
  const reasonOptions = {
    reject: [
      'Invalid document',
      'Expired document',
      'Poor image quality',
      'Information mismatch',
      'Suspected forgery',
      'Incomplete information'
    ],
    flag: [
      'Suspicious activity',
      'Possible identity theft',
      'Document inconsistency',
      'Multiple submission attempts',
      'Unusual pattern detected',
      'Requires additional verification'
    ]
  };
  
  const getOptions = () => action === 'reject' ? reasonOptions.reject : reasonOptions.flag;

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <h3 className="font-heading font-semibold text-lg mb-4">Review Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <button
          onClick={handleApprove}
          className={cn(
            "flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium",
            action === 'approve' ? "bg-accent-600" : "bg-accent-500 hover:bg-accent-600"
          )}
        >
          <CheckCircle size={18} className="mr-2" />
          <span>Approve</span>
        </button>
        
        <button
          onClick={handleReject}
          className={cn(
            "flex items-center justify-center py-3 px-4 rounded-lg font-medium",
            action === 'reject' 
              ? "bg-danger-600 text-white" 
              : "bg-danger-100 text-danger-600 hover:bg-danger-200"
          )}
        >
          <XCircle size={18} className="mr-2" />
          <span>Reject</span>
        </button>
        
        <button
          onClick={handleFlag}
          className={cn(
            "flex items-center justify-center py-3 px-4 rounded-lg font-medium",
            action === 'flag' 
              ? "bg-warning-600 text-white" 
              : "bg-warning-100 text-warning-600 hover:bg-warning-200"
          )}
        >
          <Flag size={18} className="mr-2" />
          <span>Flag</span>
        </button>
      </div>
      
      {(action === 'reject' || action === 'flag') && (
        <div className="mt-4 mb-6">
          <h4 className="font-medium text-sm mb-2">
            {action === 'reject' ? 'Rejection Reason' : 'Flag Reason'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
            {getOptions().map((option) => (
              <button
                key={option}
                onClick={() => setReason(option)}
                className={cn(
                  "text-sm py-2 px-3 rounded-lg border text-left",
                  reason === option 
                    ? "border-primary-500 bg-primary-50 text-primary-700" 
                    : "border-gray-300 hover:border-primary-300 hover:bg-gray-50"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <textarea
            value={reason === getOptions().find(opt => opt === reason) ? '' : reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Or enter custom reason..."
            className="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          ></textarea>
          
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => action === 'reject' ? handleReject() : handleFlag()}
              disabled={!reason}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium text-white",
                !reason ? "bg-gray-300 cursor-not-allowed" : 
                  action === 'reject' ? "bg-danger-500 hover:bg-danger-600" : "bg-warning-500 hover:bg-warning-600"
              )}
            >
              {action === 'reject' ? 'Confirm Rejection' : 'Confirm Flag'}
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center mb-2">
          <MessageSquare size={16} className="text-textSecondary mr-2" />
          <h4 className="font-medium text-sm">Internal Comment</h4>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add an internal note (not visible to applicant)..."
          className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        ></textarea>
        
        <div className="mt-2 flex justify-end">
          <button
            className="px-4 py-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 text-textPrimary font-medium"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionActions;