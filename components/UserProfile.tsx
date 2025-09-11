import React, { useContext } from 'react';
import Section from './Section';
import { AuthContext } from '../contexts/AuthContext';
import { USER_PROFILE_DATA } from '../constants'; // Fallback data
import TrophyIcon from './icons/TrophyIcon';
import StarIcon from './icons/StarIcon';

const UserProfile: React.FC = () => {
  const auth = useContext(AuthContext);
  const user = auth?.currentUser;

  // Fallback to static data if no user is logged in (for viewing profile section without login)
  const profileData = {
    name: user?.name || USER_PROFILE_DATA.name,
    avatarUrl: user?.avatarUrl || USER_PROFILE_DATA.avatarUrl,
    points: user?.points ?? USER_PROFILE_DATA.points,
    rank: USER_PROFILE_DATA.rank, // Rank calculation would be dynamic
    badges: USER_PROFILE_DATA.badges, // Badges would be dynamic
    activity: USER_PROFILE_DATA.activity, // Activity feed would be dynamic
  };


  return (
    <Section id="profile" title="Hồ Sơ Của Tôi" subtitle="Không gian cá nhân để theo dõi tiến độ và thành tích của bạn." className="bg-gray-900">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <img className="w-40 h-40 rounded-full ring-4 ring-yellow-400 object-cover" src={profileData.avatarUrl} alt={profileData.name} />
            <div className="mt-4 w-full">
                <h3 className="text-3xl font-bold text-white">{profileData.name}</h3>
                <div className="flex justify-center lg:justify-start items-center space-x-6 mt-2 text-gray-400">
                  <span><strong className="text-yellow-400">{profileData.points.toLocaleString()}</strong> Điểm</span>
                  <span>Hạng: <strong className="text-yellow-400">#{profileData.rank}</strong></span>
                </div>
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h4 className="font-semibold text-white mb-3 text-lg">Huy hiệu</h4>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {profileData.badges.map(badge => (
                      <span key={badge.name} className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1.5 rounded-full flex items-center space-x-2" title={badge.name}>
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          </div>
          
          {/* Right Column: Activity Feed */}
          <div className="lg:col-span-2 lg:border-l lg:border-gray-700 lg:pl-8">
            <h4 className="text-2xl font-bold text-white mb-4">Hoạt Động Gần Đây</h4>
            <ul className="space-y-4">
              {profileData.activity.map((act, index) => (
                <li key={index} className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg">
                  <div className="flex-shrink-0 bg-yellow-400/10 text-yellow-400 rounded-full p-2.5">
                    {act.type === 'win' && <TrophyIcon className="w-6 h-6" />}
                    {act.type === 'post' && <StarIcon className="w-6 h-6" />}
                    {act.type === 'badge' && <span className="text-2xl">🏅</span>}
                  </div>
                  <div>
                    <p className="text-white font-medium">{act.description}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{act.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default UserProfile;