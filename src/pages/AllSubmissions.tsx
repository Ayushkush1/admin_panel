import React from 'react';
import SubmissionsTable from '../components/submissions/SubmissionsTable';

const AllSubmissions: React.FC = () => {
  return (
    <div>
      <SubmissionsTable 
        title="All KYC Submissions"
        description="Review and manage all KYC verification submissions"
      />
    </div>
  );
};

export default AllSubmissions;