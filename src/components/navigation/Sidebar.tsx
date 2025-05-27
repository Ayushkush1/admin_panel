import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Flag, 
  CheckCircle, 
  XCircle, 
  ClipboardList, 
  Settings,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/submissions', label: 'All Submissions', icon: <FileText size={20} /> },
    { to: '/flagged', label: 'Flagged', icon: <Flag size={20} /> },
    { to: '/approved', label: 'Approved', icon: <CheckCircle size={20} /> },
    { to: '/rejected', label: 'Rejected', icon: <XCircle size={20} /> },
    { to: '/audit', label: 'Audit Logs', icon: <ClipboardList size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-full bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b">
        {collapsed ? (
          <div className="flex justify-center">
            <ShieldCheck size={32} className="text-primary-500" />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <ShieldCheck size={32} className="text-primary-500" />
            <div>
              <h1 className="font-heading font-bold text-xl text-primary-500">KYC Admin</h1>
              <p className="text-xs text-textSecondary">Verification Portal</p>
            </div>
          </div>
        )}
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-textSecondary hover:bg-primary-50 transition-colors",
                  isActive ? "bg-primary-50 text-primary-500 font-medium border-r-4 border-primary-500" : "",
                  collapsed ? "justify-center" : "space-x-3"
                )}
              >
                <span className={cn(
                  "transition-all", 
                  collapsed ? "transform scale-125" : ""
                )}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        {collapsed ? (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
              JD
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
              JD
            </div>
            <div>
              <p className="font-medium text-sm text-textPrimary">John Doe</p>
              <p className="text-xs text-textSecondary">Admin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;