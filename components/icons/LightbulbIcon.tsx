import React from 'react';

const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.7 10.2 18 9 18 8c0-2.2-1.8-4-4-4-1.5 0-2.8.8-3.5 2" />
    <path d="M9.5 14.5c0 2.5 2 4.5 5 4.5h.5c2.2 0 4-1.8 4-4" />
    <path d="M5 18c0-2.8 2.2-5 5-5" />
    <path d="M5 14c0-2.2 1.8-4 4-4" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

export default LightbulbIcon;