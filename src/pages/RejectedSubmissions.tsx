import React from 'react';
import SubmissionsTable from '../components/submissions/SubmissionsTable';

const RejectedSubmissions: React.FC = () => {
  return (
    <div>
      <SubmissionsTable 
        title="Rejected Submissions"
        description="View all rejected KYC submissions with reasons"
        filterByStatus="rejected"
      />
    </div>
  );
};

export default RejectedSubmissions;