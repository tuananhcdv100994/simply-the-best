import React from 'react';

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M21.58 7.19a2.5 2.5 0 0 0-1.75-1.75C18.25 5 12 5 12 5s-6.25 0-7.83.44A2.5 2.5 0 0 0 2.42 7.19C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.75 1.75C5.75 19 12 19 12 19s6.25 0 7.83-.44a2.5 2.5 0 0 0 1.75-1.75C22 15.25 22 12 22 12s0-3.25-.42-4.81zM9.5 15.5V8.5L16 12l-6.5 3.5z" />
  </svg>
);

export default YoutubeIcon;