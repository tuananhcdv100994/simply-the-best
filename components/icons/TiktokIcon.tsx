import React from 'react';

const TiktokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0a.08.08 0 0 1 .09.08v11.5a.08.08 0 0 1-.09.08h-2.9v-1.1a4.06 4.06 0 1 0-4.06-4.06h1.1a.09.09 0 0 1 .09.08v2.9a.09.09 0 0 1-.09.08h-1.1a.08.08 0 0 1-.08-.08V.08a.08.08 0 0 1 .08-.08h1.1Z" />
  </svg>
);

export default TiktokIcon;