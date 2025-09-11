
import React from 'react';

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A2.5 2.5 0 0 1 8 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21A2.5 2.5 0 0 0 16 22" />
    <path d="M8 12v-5a4 4 0 0 1 8 0v5" />
    <path d="M12 15v-3" />
  </svg>
);

export default TrophyIcon;
   