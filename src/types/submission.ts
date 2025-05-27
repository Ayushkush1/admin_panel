export interface KYCSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  documentType: string;
  documentId: string;
  issueDate: string;
  expiryDate: string;
  documentFrontUrl: string;
  documentBackUrl: string;
  selfieUrl: string;
}