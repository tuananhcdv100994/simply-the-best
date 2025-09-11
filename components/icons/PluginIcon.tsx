import React from 'react';

const PluginIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M12 2l-2 7h4l-2 7" />
    <path d="M12 22v-3" />
    <path d="M20 12h-3" />
    <path d="M4 12H1" />
  </svg>
);

export default PluginIcon;