import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import DocumentViewer from '../components/detail/DocumentViewer';
import SubmissionInfo from '../components/detail/SubmissionInfo';
import SubmissionActions from '../components/detail/SubmissionActions';
import { mockSubmissions } from '../data/mockData';
import { KYCSubmission } from '../types/submission';

const SubmissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<KYCSubmission | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<'front' | 'back' | 'selfie'>('front');
  
  useEffect(() => {
    // Find submission by ID from mock data
    const found = mockSubmissions.find(sub => sub.id === id);
    if (found) {
      setSubmission(found);
    }
  }, [id]);
  
  if (!submission) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <p className="text-lg font-medium">Submission not found</p>
          <button 
            onClick={() => navigate('/submissions')}
            className="mt-4 button-primary"
          >
            Back to Submissions
          </button>
        </div>
      </div>
    );
  }
  
  const handleApprove = () => {
    // In a real app, this would call an API to update the submission status
    const updated = { ...submission, status: 'approved' as const };
    setSubmission(updated);
    
    // Show success message and navigate after a delay
    setTimeout(() => {
      navigate('/submissions');
    }, 1500);
  };
  
  const handleReject = (reason: string) => {
    // In a real app, this would call an API to update the submission status
    const updated = { ...submission, status: 'rejected' as const };
    setSubmission(updated);
    
    // Show success message and navigate after a delay
    setTimeout(() => {
      navigate('/submissions');
    }, 1500);
  };
  
  const handleFlag = (reason: string) => {
    // In a real app, this would call an API to update the submission status
    const updated = { ...submission, status: 'flagged' as const };
    setSubmission(updated);
    
    // Show success message and navigate after a delay
    setTimeout(() => {
      navigate('/submissions');
    }, 1500);
  };
  
  const getDocumentTitle = () => {
    switch (selectedDocument) {
      case 'front':
        return `${submission.documentType} (Front)`;
      case 'back':
        return `${submission.documentType} (Back)`;
      case 'selfie':
        return 'Selfie Photo';
      default:
        return '';
    }
  };
  
  const getDocumentUrl = () => {
    switch (selectedDocument) {
      case 'front':
        return submission.documentFrontUrl;
      case 'back':
        return submission.documentBackUrl;
      case 'selfie':
        return submission.selfieUrl;
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/submissions')}
          className="mr-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-heading font-bold">Review Submission</h1>
          <p className="text-textSecondary">Verify KYC documents and applicant information</p>
        </div>
      </div>
      
      {submission.status !== 'pending' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg ${
            submission.status === 'approved' ? 'bg-accent-100 text-accent-700' :
            submission.status === 'rejected' ? 'bg-danger-100 text-danger-700' :
            'bg-warning-100 text-warning-700'
          }`}
        >
          <div className="flex items-center">
            {submission.status === 'approved' && <Check size={20} className="mr-2" />}
            {submission.status === 'rejected' && <X size={20} className="mr-2" />}
            {submission.status === 'flagged' && <Flag size={20} className="mr-2" />}
            <span className="font-medium">
              This submission has been {submission.status}.
            </span>
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 mb-6">
            <div className="mb-4">
              <h2 className="font-heading font-semibold text-lg">Document Verification</h2>
              <p className="text-textSecondary text-sm">Review the uploaded documents</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setSelectedDocument('front')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDocument === 'front' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-textSecondary hover:bg-gray-200'
                }`}
              >
                ID Front
              </button>
              <button
                onClick={() => setSelectedDocument('back')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDocument === 'back' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-textSecondary hover:bg-gray-200'
                }`}
              >
                ID Back
              </button>
              <button
                onClick={() => setSelectedDocument('selfie')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDocument === 'selfie' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-gray-100 text-textSecondary hover:bg-gray-200'
                }`}
              >
                Selfie
              </button>
            </div>
            
            <div className="h-[400px]">
              <DocumentViewer 
                documentUrl={getDocumentUrl()}
                title={getDocumentTitle()}
              />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
            <div className="mb-4">
              <h2 className="font-heading font-semibold text-lg">Side-by-Side Comparison</h2>
              <p className="text-textSecondary text-sm">Compare ID photo with selfie</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[200px] flex items-center justify-center">
                <img 
                  src={submission.documentFrontUrl} 
                  alt="ID Photo" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden h-[200px] flex items-center justify-center">
                <img 
                  src={submission.selfieUrl} 
                  alt="Selfie" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <SubmissionInfo submission={submission} />
          
          {submission.status === 'pending' && (
            <SubmissionActions 
              onApprove={handleApprove}
              onReject={handleReject}
              onFlag={handleFlag}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetail;