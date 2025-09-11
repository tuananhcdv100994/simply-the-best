import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src="https://levispaints.com/wp-content/uploads/2025/09/z6993884557561_a7f5bc5422dd21542c97f50de2965bda-Photoroom.png" 
    alt="Simply The Best! Logo" 
    className={className} 
  />
);

export default Logo;