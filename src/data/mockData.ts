import { KYCSubmission } from "../types/submission";
import { AuditLog } from "../types/audit";

// Helper functions to generate random dates within a range
const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const formatDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Generate 20 mock KYC submissions
export const mockSubmissions: KYCSubmission[] = Array.from({ length: 20 }, (_, i) => {
  const id = `SUB${String(1000 + i).padStart(4, '0')}`;
  const names = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Olivia Davis', 'William Wilson',
    'Sophia Martinez', 'James Taylor', 'Isabella Anderson', 'Benjamin Thomas', 'Mia Moore',
    'Lucas Jackson', 'Charlotte White', 'Henry Harris', 'Amelia Martin', 'Alexander Thompson',
    'Abigail Garcia', 'Daniel Martinez', 'Emily Robinson', 'Matthew Clark', 'Elizabeth Lewis'
  ];
  
  const statuses: ('pending' | 'approved' | 'rejected' | 'flagged')[] = ['pending', 'approved', 'rejected', 'flagged'];
  const documentTypes = ['Passport', 'National ID', 'Driver\'s License', 'Utility Bill'];
  
  const submissionDate = getRandomDate(new Date('2023-01-01'), new Date());
  const dob = getRandomDate(new Date('1970-01-01'), new Date('2000-01-01'));
  const issueDate = getRandomDate(new Date('2018-01-01'), new Date('2022-01-01'));
  const expiryDate = getRandomDate(new Date('2023-01-01'), new Date('2030-01-01'));
  
  const name = names[i];
  const email = `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@example.com`;
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const documentType = documentTypes[Math.floor(Math.random() * documentTypes.length)];
  
  return {
    id,
    name,
    email,
    phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    address: `${Math.floor(Math.random() * 9000) + 1000} Main St, Suite ${Math.floor(Math.random() * 900) + 100}, New York, NY 10001`,
    dateOfBirth: formatDateString(dob),
    submissionDate: submissionDate.toISOString(),
    status,
    documentType,
    documentId: `${documentType.substring(0, 1)}${Math.floor(Math.random() * 9000000) + 1000000}`,
    issueDate: formatDateString(issueDate),
    expiryDate: formatDateString(expiryDate),
    documentFrontUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    documentBackUrl: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg',
    selfieUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
  };
});

// Generate 30 mock audit logs
export const mockAuditLogs: AuditLog[] = Array.from({ length: 30 }, (_, i) => {
  const actions: ('approved' | 'rejected' | 'flagged' | 'viewed')[] = ['approved', 'rejected', 'flagged', 'viewed'];
  const action = actions[Math.floor(Math.random() * actions.length)];
  
  const adminNames = [
    'Alex Williams', 'Sarah Johnson', 'Daniel Cooper', 'Rebecca Liu', 'James Thompson'
  ];
  const adminName = adminNames[Math.floor(Math.random() * adminNames.length)];
  const adminInitials = adminName.split(' ').map(n => n[0]).join('');
  
  const submission = mockSubmissions[Math.floor(Math.random() * mockSubmissions.length)];
  
  const reasons = {
    rejected: [
      'Invalid document',
      'Expired document',
      'Poor image quality',
      'Information mismatch',
      'Suspected forgery',
      'Incomplete information'
    ],
    flagged: [
      'Suspicious activity',
      'Possible identity theft',
      'Document inconsistency',
      'Multiple submission attempts',
      'Unusual pattern detected',
      'Requires additional verification'
    ]
  };
  
  let reason = '';
  if (action === 'rejected') {
    reason = reasons.rejected[Math.floor(Math.random() * reasons.rejected.length)];
  } else if (action === 'flagged') {
    reason = reasons.flagged[Math.floor(Math.random() * reasons.flagged.length)];
  }
  
  const timestamp = getRandomDate(new Date('2023-06-01'), new Date()).toISOString();
  
  return {
    id: `LOG${String(10000 + i).padStart(5, '0')}`,
    action,
    adminName,
    adminInitials,
    submissionId: submission.id,
    submissionName: submission.name,
    timestamp,
    ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    reason: (action === 'rejected' || action === 'flagged') ? reason : '',
  };
});

// Sort audit logs by timestamp, newest first
mockAuditLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());