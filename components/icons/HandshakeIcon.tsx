import React from 'react';

const HandshakeIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.5-3.5a1 1 0 1 0-3 3" />
    <path d="M9 12.5a1 1 0 1 0-3-3" />
    <path d="m12 11 1.5 1.5a1 1 0 1 0 3-3l-4-4a1 1 0 1 0-3 3" />
    <path d="m3 21 3-3" />
    <path d="m19 5-3-3" />
    <path d="m15 9-1.5-1.5" />
  </svg>
);

export default HandshakeIcon;