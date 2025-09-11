'use client';

import React, { useState } from 'react';
import Section from './Section';
import { EVENTS } from '../constants';
import type { EventItem } from '../types';

type EventCategory = 'all' | 'Tennis' | 'Golf' | 'Pickleball' | 'Cộng đồng';

const EventCard: React.FC<{ item: EventItem }> = ({ item }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 flex items-start space-x-6">
        <div className="flex-shrink-0 text-center w-20">
            <p className="text-yellow-400 font-bold text-2xl">{item.date.split(',')[0]}</p>
            <p className="text-gray-400 text-sm">{item.date.split(',')[1]}</p>
        </div>
        <div className="border-l border-gray-600 pl-6 flex-grow">
            <div className="flex justify-between items-start">
                <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${item.status === 'Sắp diễn ra' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {item.status}
                </span>
                 <span className="text-xs font-semibold bg-yellow-400/10 text-yellow-400 px-2 py-1 rounded">{item.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
            <p className="text-gray-400 mt-1">{item.description}</p>
        </div>
    </div>
);

const Events: React.FC = () => {
    const [activeTab, setActiveTab] = useState<EventCategory>('all');
    
    const tabs: { id: EventCategory, label: string }[] = [
        { id: 'all', label: 'Tất cả' },
        { id: 'Tennis', label: 'Tennis' },
        { id: 'Golf', label: 'Golf' },
        { id: 'Pickleball', label: 'Pickleball' },
    ];

    const filteredEvents = activeTab === 'all' ? EVENTS : EVENTS.filter(e => e.category === activeTab);
    const upcomingEvents = filteredEvents.filter(e => e.status === 'Sắp diễn ra');
    const pastEvents = filteredEvents.filter(e => e.status === 'Đã qua');

    return (
        <Section id="events" title="Giải Đấu & Sự Kiện" subtitle="Tham gia các cuộc thi, buổi gặp gỡ và lễ trao giải của chúng tôi.">
            <div className="max-w-5xl mx-auto">
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
                
                <div className="space-y-8">
                    {upcomingEvents.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 border-b-2 border-yellow-400 pb-2 inline-block">Sắp diễn ra</h3>
                            <div className="space-y-6">
                                {upcomingEvents.map((event, index) => (
                                    <EventCard key={`upcoming-${index}`} item={event} />
                                ))}
                            </div>
                        </div>
                    )}

                    {pastEvents.length > 0 && (
                         <div>
                            <h3 className="text-2xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2 inline-block">Đã diễn ra</h3>
                            <div className="space-y-6">
                                {pastEvents.map((event, index) => (
                                    <EventCard key={`past-${index}`} item={event} />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400">Không có sự kiện nào trong danh mục này.</p>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Events;