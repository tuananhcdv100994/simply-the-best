'use client';

import React, { useState } from 'react';
import Section from './Section';
import { RANK_PLAYERS, RANK_TEAMS, RANK_PROJECTS } from '../constants';
import type { RankItem } from '../types';

type LeaderboardTab = 'players' | 'teams' | 'projects';

const RankListItem: React.FC<{ item: RankItem }> = ({ item }) => (
  <li className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700/50 transition-colors duration-300">
    <span className={`text-2xl font-bold w-12 text-center ${item.rank === 1 ? 'text-yellow-400' : 'text-gray-400'}`}>{item.rank}</span>
    <img src={item.avatarUrl} alt={item.name} className="w-12 h-12 rounded-full mx-4 object-cover" />
    <div className="flex-grow">
      <p className="font-semibold text-white">{item.name}</p>
    </div>
    <span className="font-bold text-lg text-yellow-400">{item.score}</span>
  </li>
);

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('players');

  const tabs: { id: LeaderboardTab; label: string; data: RankItem[] }[] = [
    { id: 'players', label: 'Cá Nhân Xuất Sắc', data: RANK_PLAYERS },
    { id: 'teams', label: 'Đội Nhóm Hàng Đầu', data: RANK_TEAMS },
    { id: 'projects', label: 'Dự Án Nổi Bật', data: RANK_PROJECTS },
  ];

  const activeData = tabs.find(tab => tab.id === activeTab)?.data || [];

  return (
    <Section id="leaderboard" title="Bảng Xếp Hạng Cộng Đồng" subtitle="Ghi danh những cá nhân và tập thể có thành tích tốt nhất.">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center bg-gray-800 rounded-full p-1 border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 ${activeTab === tab.id ? 'bg-yellow-400 text-gray-900' : 'text-gray-300 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ul className="space-y-4">
          {activeData.map((item) => (
            <RankListItem key={item.rank + item.name} item={item} />
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Leaderboard;