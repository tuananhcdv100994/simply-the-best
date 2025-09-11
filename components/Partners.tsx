import React from 'react';
import Section from './Section';
import type { Partner } from '../types';

interface PartnersProps {
    partners: Partner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
    return (
        <div className="bg-black py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-400">
                    Đồng hành cùng các đối tác chiến lược
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {partners.map(partner => (
                         <img
                            key={partner.id}
                            className="col-span-1 max-h-12 w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                            src={partner.logoUrl}
                            alt={partner.name}
                            width={158}
                            height={48}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Partners;