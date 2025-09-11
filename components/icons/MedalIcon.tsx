import React from 'react';

const MedalIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 20.94c1.5 0 2.75 1.06 4 0" />
    <path d="M12 20.94c-1.5 0-2.75 1.06-4 0" />
    <path d="M12 20.94V12.5" />
    <path d="M12 12.5a3.5 3.5 0 0 0-3.5-3.5V5.5a3.5 3.5 0 1 1 7 0v3.5a3.5 3.5 0 0 0-3.5 3.5z" />
  </svg>
);

export default MedalIcon;