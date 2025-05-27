import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  toggleMobileMenu,
  sidebarOpen
}) => {
  const location = useLocation();
  
  // Get page title from current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/submissions') return 'All KYC Submissions';
    if (path.startsWith('/submissions/')) return 'Review Submission';
    if (path === '/flagged') return 'Flagged Submissions';
    if (path === '/approved') return 'Approved Submissions';
    if (path === '/rejected') return 'Rejected Submissions';
    if (path === '/audit') return 'Audit Logs';
    if (path === '/settings') return 'Settings';
    return 'KYC Admin';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden mr-4 text-textSecondary hover:text-textPrimary"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
          
          {/* Sidebar toggle for desktop */}
          <button 
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-primary-50 text-primary-500 hover:bg-primary-100 transition-colors"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
          
          {/* Page title */}
          <h1 className="ml-4 font-heading font-semibold text-xl">{getPageTitle()}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search size={18} className="text-textSecondary" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none ml-2 text-sm w-40 lg:w-60"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-textSecondary hover:text-textPrimary hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-danger-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;