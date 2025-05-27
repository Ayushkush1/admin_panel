import React from 'react';
import SubmissionsTable from '../components/submissions/SubmissionsTable';

const ApprovedSubmissions: React.FC = () => {
  return (
    <div>
      <SubmissionsTable 
        title="Approved Submissions"
        description="View all verified and approved KYC submissions"
        filterByStatus="approved"
      />
    </div>
  );
};

export default ApprovedSubmissions;