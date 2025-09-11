import React from 'react';
import Section from './Section';
import { CHALLENGES, FEATURED_BADGES } from '../constants';
import type { Challenge, FeaturedBadge } from '../types';
import MedalIcon from './icons/MedalIcon';

const ChallengeCard: React.FC<{ item: Challenge }> = ({ item }) => (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-colors duration-300">
        <div className="flex items-center space-x-4 mb-4">
            <div className="bg-yellow-400/10 p-3 rounded-lg">
                <item.icon className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
                 <p className="text-xs text-yellow-400 font-semibold">{item.category}</p>
                 <h3 className="text-lg font-bold text-white">{item.title}</h3>
            </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{item.description}</p>
        <div className="bg-gray-900/50 p-3 rounded-lg flex items-center space-x-2">
            <MedalIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Giải thưởng: <strong className="text-white">{item.prize}</strong></span>
        </div>
    </div>
);

const BadgeItem: React.FC<{ item: FeaturedBadge }> = ({ item }) => (
    <div className="flex items-center space-x-3 bg-gray-900/50 p-3 rounded-lg">
        <span className="text-2xl">{item.icon}</span>
        <div>
            <p className="font-semibold text-white">{item.name}</p>
            <p className="text-xs text-gray-400">{item.description}</p>
        </div>
    </div>
);


const Challenges: React.FC = () => {
    return (
        <Section id="challenges" title="Thử Thách & Vinh Danh" subtitle="Tham gia các cuộc thi để giành giải thưởng và thu thập các huy hiệu danh giá.">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {CHALLENGES.map((challenge, index) => (
                        <ChallengeCard key={index} item={challenge} />
                    ))}
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-bold text-white mb-4">Huy hiệu nổi bật</h3>
                    <div className="space-y-4">
                         {FEATURED_BADGES.map((badge, index) => (
                            <BadgeItem key={index} item={badge} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Challenges;