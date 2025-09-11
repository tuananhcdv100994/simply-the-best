
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = 'bg-gray-900' }) => {
  return (
    <section id={id} className={`py-20 sm:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-4 text-lg text-yellow-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  );
};

export default Section;
   