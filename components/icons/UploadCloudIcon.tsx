import React from 'react';

const UploadCloudIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="M20 16.2A4.5 4.5 0 0 0 15.5 8H14a6 6 0 0 0-12 0H1.5A4.5 4.5 0 0 0 6 16.2" />
    <line x1="12" y1="12" x2="12" y2="22" />
    <polyline points="8 16 12 12 16 16" />
  </svg>
);

export default UploadCloudIcon;
