export interface AuditLog {
  id: string;
  action: 'approved' | 'rejected' | 'flagged' | 'viewed';
  adminName: string;
  adminInitials: string;
  submissionId: string;
  submissionName: string;
  timestamp: string;
  ipAddress: string;
  reason: string;
}