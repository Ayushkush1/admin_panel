import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import MobileNavigation from '../components/navigation/MobileNavigation';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full"
            >
              <Sidebar />
            </motion.div>
          ) : (
            <motion.div
              initial={{ width: 280, opacity: 1 }}
              animate={{ width: 80, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full"
            >
              <Sidebar collapsed={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Navigation */}
      <div className="block md:hidden">
        <MobileNavigation isOpen={mobileMenuOpen} toggleMenu={toggleMobileMenu} />
      </div>
      
      {/* Main Content */}
      <div className={`${sidebarOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'} transition-all duration-300`}>
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleMobileMenu={toggleMobileMenu}
          sidebarOpen={sidebarOpen}
        />
        <main className="p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;