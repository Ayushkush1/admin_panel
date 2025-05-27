import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Flag, 
  CheckCircle, 
  XCircle, 
  ClipboardList, 
  Settings,
  ShieldCheck,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface MobileNavigationProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  isOpen, 
  toggleMenu 
}) => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { to: '/submissions', label: 'All Submissions', icon: <FileText size={20} /> },
    { to: '/flagged', label: 'Flagged', icon: <Flag size={20} /> },
    { to: '/approved', label: 'Approved', icon: <CheckCircle size={20} /> },
    { to: '/rejected', label: 'Rejected', icon: <XCircle size={20} /> },
    { to: '/audit', label: 'Audit Logs', icon: <ClipboardList size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  // Fixed bottom navigation for mobile
  const bottomNavItems = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/submissions', label: 'Submissions', icon: <FileText size={20} /> },
    { to: '/flagged', label: 'Flagged', icon: <Flag size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleMenu}
            />
            
            {/* Slide-out panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white z-50 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={28} className="text-primary-500" />
                    <div>
                      <h1 className="font-heading font-bold text-lg text-primary-500">KYC Admin</h1>
                      <p className="text-xs text-textSecondary">Verification Portal</p>
                    </div>
                  </div>
                  <button onClick={toggleMenu}>
                    <X size={24} className="text-textSecondary" />
                  </button>
                </div>
                
                <nav className="flex-1 py-4">
                  <ul className="space-y-1">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={toggleMenu}
                          className={({ isActive }) => cn(
                            "flex items-center px-4 py-3 text-textSecondary hover:bg-primary-50 transition-colors space-x-3",
                            isActive ? "bg-primary-50 text-primary-500 font-medium border-l-4 border-primary-500" : ""
                          )}
                        >
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="p-4 border-t">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-sm text-textPrimary">John Doe</p>
                      <p className="text-xs text-textSecondary">Admin</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Fixed bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden z-30">
        <nav className="flex justify-around py-2">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cn(
                "flex flex-col items-center py-2 px-3 text-textSecondary",
                isActive ? "text-primary-500" : ""
              )}
            >
              <span>{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNavigation;