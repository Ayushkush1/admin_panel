import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';
import StatusBadge from '../shared/StatusBadge';
import { KYCSubmission } from '../../types/submission';

interface SubmissionInfoProps {
  submission: KYCSubmission;
}

const SubmissionInfo: React.FC<SubmissionInfoProps> = ({ submission }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-card border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-lg font-medium text-primary-700">
            {submission.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-4">
            <h3 className="font-heading font-semibold text-lg">{submission.name}</h3>
            <div className="flex items-center text-textSecondary text-sm">
              <span>Application ID: {submission.id.substring(0, 8)}</span>
              <span className="mx-2">•</span>
              <StatusBadge status={submission.status} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-sm mb-3 text-textSecondary uppercase">Personal Information</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <Mail size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Email Address</p>
                <p className="font-medium">{submission.email}</p>
              </div>
            </li>
            <li className="flex items-start">
              <Phone size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Phone Number</p>
                <p className="font-medium">{submission.phone}</p>
              </div>
            </li>
            <li className="flex items-start">
              <MapPin size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Address</p>
                <p className="font-medium">{submission.address}</p>
              </div>
            </li>
            <li className="flex items-start">
              <Calendar size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Date of Birth</p>
                <p className="font-medium">{submission.dateOfBirth}</p>
              </div>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm mb-3 text-textSecondary uppercase">Document Information</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <FileText size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Document Type</p>
                <p className="font-medium">{submission.documentType}</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="h-5 w-5 flex items-center justify-center mr-3 mt-0.5">
                <span className="text-sm font-bold text-textSecondary">#</span>
              </div>
              <div>
                <p className="text-sm text-textSecondary">Document ID</p>
                <p className="font-medium">{submission.documentId}</p>
              </div>
            </li>
            <li className="flex items-start">
              <Calendar size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Issue Date</p>
                <p className="font-medium">{submission.issueDate}</p>
              </div>
            </li>
            <li className="flex items-start">
              <Calendar size={18} className="mt-0.5 mr-3 text-textSecondary" />
              <div>
                <p className="text-sm text-textSecondary">Expiry Date</p>
                <p className="font-medium">{submission.expiryDate}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium text-sm mb-3 text-textSecondary uppercase">Submission History</h4>
        <ul className="space-y-3">
          <li className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-accent-500 mr-2"></span>
              <span>Submission Created</span>
            </div>
            <span className="text-textSecondary">
              {format(new Date(submission.submissionDate), 'MMM dd, yyyy - HH:mm')}
            </span>
          </li>
          <li className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-warning-500 mr-2"></span>
              <span>Assigned to Reviewer</span>
            </div>
            <span className="text-textSecondary">
              {format(new Date(submission.submissionDate), 'MMM dd, yyyy - HH:mm')}
            </span>
          </li>
          {submission.status !== 'pending' && (
            <li className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full ${
                  submission.status === 'approved' ? 'bg-accent-500' : 
                  submission.status === 'rejected' ? 'bg-danger-500' : 'bg-warning-500'
                } mr-2`}></span>
                <span>{
                  submission.status === 'approved' ? 'Approved' : 
                  submission.status === 'rejected' ? 'Rejected' : 'Flagged'
                }</span>
              </div>
              <span className="text-textSecondary">
                {format(new Date(), 'MMM dd, yyyy - HH:mm')}
              </span>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default SubmissionInfo;