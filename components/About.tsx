import React from 'react';
import Section from './Section';
import type { CoreValue } from '../types';
import TrophyIcon from './icons/TrophyIcon';
import StarIcon from './icons/StarIcon';
import UsersIcon from './icons/UsersIcon';
import ZapIcon from './icons/ZapIcon';

const CORE_VALUES: CoreValue[] = [
    { title: 'Chất lượng', description: 'Theo đuổi những tiêu chuẩn cao nhất trong mọi việc chúng tôi làm, từ nội dung đến cộng đồng.', icon: TrophyIcon },
    { title: 'Trải nghiệm', description: 'Tạo ra những trải nghiệm đáng nhớ và ý nghĩa cho mỗi thành viên trong cộng đồng.', icon: StarIcon },
    { title: 'Cộng đồng', description: 'Xây dựng một mạng lưới hỗ trợ và gắn kết nơi mọi người đều có thể phát triển.', icon: UsersIcon },
    { title: 'Truyền cảm hứng', description: 'Chia sẻ những câu chuyện về thành công và sự kiên trì để thúc đẩy và truyền cảm hứng.', icon: ZapIcon },
];

const ValueCard: React.FC<{ value: CoreValue }> = ({ value }) => (
    <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-yellow-400 hover:-translate-y-2 transition-all duration-300">
        <div className="mb-4">
            <value.icon className="h-10 w-10 text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
        <p className="text-gray-400">{value.description}</p>
    </div>
);

interface AboutProps {
    title: string;
    subtitle: string;
    isEditing?: boolean;
}

const About: React.FC<AboutProps> = ({ title, subtitle, isEditing }) => {
  return (
    <section id="about" className="py-20 sm:py-24 bg-gray-900">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 
                    id="about-title-editable"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white ${isEditing ? 'ring-2 ring-yellow-400 ring-dashed p-2 rounded-md focus:outline-none focus:ring-solid' : ''}`}
                >
                    {title}
                </h2>
                <p 
                    id="about-subtitle-editable"
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`mt-4 text-lg text-yellow-400 ${isEditing ? 'ring-2 ring-yellow-400 ring-dashed p-2 rounded-md focus:outline-none focus:ring-solid' : ''}`}
                >
                    {subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {CORE_VALUES.map((value, index) => (
                    <ValueCard key={index} value={value} />
                ))}
            </div>
      </div>
    </section>
  );
};

export default About;