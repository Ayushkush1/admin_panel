import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AllSubmissions from './pages/AllSubmissions';
import FlaggedSubmissions from './pages/FlaggedSubmissions';
import ApprovedSubmissions from './pages/ApprovedSubmissions';
import RejectedSubmissions from './pages/RejectedSubmissions';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import SubmissionDetail from './pages/SubmissionDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="submissions" element={<AllSubmissions />} />
        <Route path="submissions/:id" element={<SubmissionDetail />} />
        <Route path="flagged" element={<FlaggedSubmissions />} />
        <Route path="approved" element={<ApprovedSubmissions />} />
        <Route path="rejected" element={<RejectedSubmissions />} />
        <Route path="audit" element={<AuditLogs />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;