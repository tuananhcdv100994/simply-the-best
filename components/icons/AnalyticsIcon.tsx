import React from 'react';

const AnalyticsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="M18.7 8a2 2 0 0 1 0 2.8l-6 6a2 2 0 0 1-2.8 0l-4-4a2 2 0 0 1 0-2.8l6-6a2 2 0 0 1 2.8 0l4 4z" />
  </svg>
);

export default AnalyticsIcon;