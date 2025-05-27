import React from 'react';
import SubmissionsTable from '../components/submissions/SubmissionsTable';

const FlaggedSubmissions: React.FC = () => {
  return (
    <div>
      <SubmissionsTable 
        title="Flagged Submissions"
        description="Review submissions flagged for suspicious activity or inconsistencies"
        filterByStatus="flagged"
      />
    </div>
  );
};

export default FlaggedSubmissions;