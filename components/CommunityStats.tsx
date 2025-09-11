import React from 'react';
import { COMMUNITY_STATS } from '../constants';
import type { CommunityStatItem } from '../types';

const StatItem: React.FC<{ item: CommunityStatItem }> = ({ item }) => (
    <div className="flex items-center space-x-4">
        <div className="bg-gray-800 p-3 rounded-full">
            <item.icon className="h-7 w-7 text-yellow-400" />
        </div>
        <div>
            <p className="text-3xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-gray-400">{item.label}</p>
        </div>
    </div>
);

const CommunityStats: React.FC = () => {
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            {COMMUNITY_STATS.map((stat, index) => (
                <div key={index} className="flex justify-center pt-6 md:pt-0">
                    <StatItem item={stat} />
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;