'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  children: React.ReactNode[];
  className?: string;
}

const TabNavigation = ({ tabs, children, className = '' }: TabNavigationProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex justify-center mb-8 md:mb-12">
        <div className="inline-flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 gap-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`
                relative px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300
                flex items-center gap-2 text-sm md:text-base whitespace-nowrap
                ${activeTab === index 
                  ? 'text-white' 
                  : 'text-muted hover:text-light'
                }
              `}
            >
              {/* Active background */}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Tab content */}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabNavigation;
