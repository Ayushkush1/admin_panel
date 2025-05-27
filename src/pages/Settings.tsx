import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '../utils/cn';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('light');
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'security', label: 'Security', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'appearance', label: 'Appearance', icon: <Monitor size={16} /> },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-textSecondary">Manage your profile and preferences</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-64 border-b sm:border-b-0 sm:border-r border-gray-100">
            <nav className="p-4">
              <ul className="space-y-1">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center px-4 py-3 text-sm rounded-lg",
                        activeTab === tab.id 
                          ? "bg-primary-50 text-primary-600 font-medium" 
                          : "text-textSecondary hover:bg-gray-50"
                      )}
                    >
                      <span className="mr-3">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-heading font-semibold mb-6">Profile Settings</h2>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-medium mr-4">
                      JD
                    </div>
                    <button className="button-secondary text-sm">
                      Change Picture
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      className="input-field"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      className="input-field"
                      defaultValue="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="input-field"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">
                      Role
                    </label>
                    <select className="input-field">
                      <option>Admin</option>
                      <option>Moderator</option>
                      <option>Reviewer</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="button-primary">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-heading font-semibold mb-6">Security Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1">
                        Current Password
                      </label>
                      <input 
                        type="password" 
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1">
                        New Password
                      </label>
                      <input 
                        type="password" 
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-textSecondary mb-1">
                        Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="button-primary">
                      Update Password
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Protect your account with 2FA</p>
                      <p className="text-sm text-textSecondary mt-1">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="button-secondary">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-heading font-semibold mb-6">Notification Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">New Submission Alerts</p>
                      <p className="text-sm text-textSecondary mt-1">
                        Get notified when a new KYC submission is received
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Flagged Submission Alerts</p>
                      <p className="text-sm text-textSecondary mt-1">
                        Get notified when a submission is flagged as suspicious
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-textSecondary mt-1">
                        Receive notifications via email
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">System Notifications</p>
                      <p className="text-sm text-textSecondary mt-1">
                        Get notified about system updates and maintenance
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="button-primary">
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-heading font-semibold mb-6">Appearance Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                        theme === 'light' ? "border-primary-500" : "border-gray-200"
                      )}
                    >
                      <Sun size={24} className="mb-2" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                        theme === 'dark' ? "border-primary-500" : "border-gray-200"
                      )}
                    >
                      <Moon size={24} className="mb-2" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                    
                    <button
                      onClick={() => setTheme('system')}
                      className={cn(
                        "flex flex-col items-center justify-center p-4 rounded-lg border-2",
                        theme === 'system' ? "border-primary-500" : "border-gray-200"
                      )}
                    >
                      <Monitor size={24} className="mb-2" />
                      <span className="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Density</h3>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="radio" name="density" className="mr-2" defaultChecked />
                      <span>Comfortable</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="density" className="mr-2" />
                      <span>Compact</span>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className="button-primary">
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;