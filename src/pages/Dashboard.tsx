import React from 'react';
import { Users, FileCheck, AlertTriangle, Calendar } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import SubmissionsChart from '../components/dashboard/SubmissionsChart';
import StatusDistributionChart from '../components/dashboard/StatusDistributionChart';
import RecentSubmissionsTable from '../components/dashboard/RecentSubmissionsTable';
import { mockSubmissions } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Calculate statistics
  const totalSubmissions = mockSubmissions.length;
  const pendingSubmissions = mockSubmissions.filter(sub => sub.status === 'pending').length;
  const flaggedSubmissions = mockSubmissions.filter(sub => sub.status === 'flagged').length;
  const verifiedToday = 5; // Mock value - in a real app would be calculated
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
        <p className="text-textSecondary">Welcome back, here's your KYC verification overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Submissions"
          value={totalSubmissions}
          icon={<Users size={20} />}
          trend={{ value: 12, isPositive: true }}
          colorClass="from-primary-500 to-primary-600"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingSubmissions}
          icon={<Calendar size={20} />}
          trend={{ value: 5, isPositive: true }}
          colorClass="from-warning-500 to-warning-600"
        />
        <StatCard
          title="Flagged Entries"
          value={flaggedSubmissions}
          icon={<AlertTriangle size={20} />}
          trend={{ value: 3, isPositive: false }}
          colorClass="from-warning-600 to-danger-500"
        />
        <StatCard
          title="Verified Today"
          value={verifiedToday}
          icon={<FileCheck size={20} />}
          trend={{ value: 8, isPositive: true }}
          colorClass="from-accent-500 to-accent-600"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SubmissionsChart />
        <StatusDistributionChart />
      </div>
      
      <div className="mb-6">
        <RecentSubmissionsTable />
      </div>
    </div>
  );
};

export default Dashboard;