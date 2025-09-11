import React from 'react';

const GamepadIcon: React.FC<{ className?: string }> = ({ className }) => (
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
    <line x1="6" y1="11" x2="10" y2="11" />
    <line x1="8" y1="9" x2="8" y2="13" />
    <path d="M13 12h.01" />
    <path d="M17 12h.01" />
    <path d="M17.32 5H6.68a4 4 0 0 0-3.97 3.59c-.2 1.65.9 3.21 2.39 4.19.9.58 1.4 1.73 1.4 2.82V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.4c0-1.1.5-2.24 1.4-2.82 1.5-1 2.6-2.55 2.4-4.2A4 4 0 0 0 17.32 5z" />
  </svg>
);

export default GamepadIcon;