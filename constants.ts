import type { Post, RankItem, EventItem, Product, UserProfileData, AdminStat, User, Plugin, LevelInfo, SiteContent, CommunityStatItem, Challenge, FeaturedBadge, Partner, MediaItem } from './types';
import UsersIcon from './components/icons/UsersIcon';
import DollarSignIcon from './components/icons/DollarSignIcon';
import BarChartIcon from './components/icons/BarChartIcon';
import ZapIcon from './components/icons/ZapIcon';
import TrophyIcon from './components/icons/TrophyIcon';
import GamepadIcon from './components/icons/GamepadIcon';
import LightbulbIcon from './components/icons/LightbulbIcon';
import StarIcon from './components/icons/StarIcon';

export const POSTS: Post[] = [
  { 
    id: 1, 
    author: 'An Nguyễn', 
    category: 'Thể thao', 
    title: 'Chinh phục Marathon lúc bình minh', 
    content: 'Hành trình đầy thử thách và cảm xúc khi tôi hoàn thành cự ly 42km đầu tiên trong đời. Đó là một bài học về sự kiên trì, ý chí và giới hạn của bản thân...',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1600', 
    likes: 125, 
    comments: 12,
    status: 'Xuất bản',
    seoKeywords: 'marathon, chạy bộ, thể thao, ý chí',
    datePublished: '2024-09-15'
  },
  { 
    id: 2, 
    author: 'Bảo Trần', 
    category: 'Nghệ thuật', 
    title: 'Triển lãm nghệ thuật cá nhân đầu tiên', 
    content: 'Sau nhiều tháng chuẩn bị, cuối cùng tôi cũng đã ra mắt triển lãm "Sắc Màu Nội Tâm". Đây là một cột mốc quan trọng trên con đường nghệ thuật của tôi, nơi tôi chia sẻ những góc nhìn sâu thẳm nhất qua từng tác phẩm.',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1600', 
    likes: 230, 
    comments: 34,
    status: 'Xuất bản',
    seoKeywords: 'nghệ thuật, triển lãm, hội họa, sáng tạo',
    datePublished: '2024-09-12'
  },
  { 
    id: 3, 
    author: 'Chi Lê', 
    category: 'Học thuật', 
    title: 'Vô địch Olympic Vật lý Quốc gia', 
    content: 'Cảm giác vỡ òa khi tên mình được xướng lên ở vị trí cao nhất. Huy chương vàng này là thành quả của những đêm không ngủ, những nỗ lực không ngừng nghỉ và sự ủng hộ của gia đình, thầy cô.',
    imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=1600', 
    likes: 540, 
    comments: 68,
    status: 'Xuất bản',
    seoKeywords: 'olympic, vật lý, học thuật, huy chương vàng',
    datePublished: '2024-09-10'
  },
  { 
    id: 4, 
    author: 'Dũng Phạm', 
    category: 'Sự nghiệp', 
    title: 'Ra mắt Startup thành công', 
    content: 'Từ một ý tưởng nhỏ, chúng tôi đã xây dựng nên một sản phẩm được thị trường đón nhận. Chặng đường khởi nghiệp đầy chông gai nhưng cũng thật xứng đáng. Đây chỉ là bước khởi đầu!',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1600', 
    likes: 410, 
    comments: 55,
    status: 'Xuất bản',
    seoKeywords: 'startup, khởi nghiệp, công nghệ, thành công',
    datePublished: '2024-09-08'
  },
  { 
    id: 5, 
    author: 'Hà Mai', 
    category: 'Thể thao', 
    title: 'Huy chương vàng giải Tennis trẻ', 
    content: 'Một giải đấu không thể nào quên. Mỗi trận đấu là một thử thách, và chiến thắng cuối cùng là sự đền đáp cho tất cả những giọt mồ hôi trên sân tập.',
    imageUrl: 'https://images.unsplash.com/photo-1554068533-CF24a8A53b21?q=80&w=1600', 
    likes: 350, 
    comments: 42,
    status: 'Xuất bản',
    seoKeywords: 'tennis, giải đấu, thể thao, chiến thắng',
    datePublished: '2024-09-05'
  },
  { 
    id: 6, 
    author: 'Gia Hân', 
    category: 'Nghệ thuật', 
    title: 'Tác phẩm điêu khắc đoạt giải', 
    content: '"Dòng Chảy" không chỉ là một khối kim loại, mà là cảm xúc, là câu chuyện về sự biến đổi không ngừng của cuộc sống. Thật vinh dự khi tác phẩm được hội đồng nghệ thuật đánh giá cao.',
    imageUrl: 'https://images.unsplash.com/photo-1611762348233-83c4d5b7a2a4?q=80&w=1600', 
    likes: 180, 
    comments: 21,
    status: 'Xuất bản',
    seoKeywords: 'điêu khắc, nghệ thuật, giải thưởng, sáng tạo',
    datePublished: '2024-09-02'
  },
  { 
    id: 7, 
    author: 'Minh Quân', 
    category: 'Học thuật', 
    title: 'Công bố nghiên cứu trên tạp chí quốc tế', 
    content: 'Công trình nghiên cứu về AI trong y học của nhóm chúng tôi cuối cùng đã được xuất bản. Hy vọng nó sẽ góp một phần nhỏ vào sự tiến bộ của khoa học.',
    imageUrl: 'https://images.unsplash.com/photo-1532187643623-dbf2f5a73b15?q=80&w=1600', 
    likes: 620, 
    comments: 88,
    status: 'Xuất bản',
    seoKeywords: 'nghiên cứu khoa học, AI, y học, học thuật',
    datePublished: '2024-08-28'
  },
  { 
    id: 8, 
    author: 'Khánh An', 
    category: 'Sự nghiệp', 
    title: 'Được thăng chức Giám đốc Sáng tạo', 
    content: 'Một vai trò mới, một trách nhiệm mới. Rất hào hứng với chặng đường sắp tới để cùng team tạo ra những chiến dịch đột phá và ấn tượng hơn nữa.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600', 
    likes: 390, 
    comments: 45,
    status: 'Bản nháp',
    seoKeywords: 'sự nghiệp, thăng chức, sáng tạo, marketing',
    datePublished: '2024-08-25'
  },
];

export const RANK_PLAYERS: RankItem[] = [
  { rank: 1, name: 'Linh "Tia Chớp" Nguyễn', score: '9,850 điểm', avatarUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=200' },
  { rank: 2, name: 'Minh "Chiến Lược" Hoàng', score: '9,500 điểm', avatarUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=200' },
  { rank: 3, name: 'Khánh "Bền Bỉ" Lê', score: '9,200 điểm', avatarUrl: 'https://images.unsplash.com/photo-1560089023-745c1a1f50a2?q=80&w=200' },
];

export const RANK_TEAMS: RankItem[] = [
  { rank: 1, name: 'Saigon Heat', score: '15 Thắng', avatarUrl: 'https://plus.unsplash.com/premium_photo-1661505085442-39c8a77a7019?q=80&w=200' },
  { rank: 2, name: 'Hanoi Buffaloes', score: '12 Thắng', avatarUrl: 'https://images.unsplash.com/photo-1594434354350-934273c586e6?q=80&w=200' },
  { rank: 3, name: 'Thang Long Warriors', score: '10 Thắng', avatarUrl: 'https://images.unsplash.com/photo-1562426509-e822e848a213?q=80&w=200' },
];

export const RANK_PROJECTS: RankItem[] = [
    { rank: 1, name: 'Dự án Chân trời xanh', score: '98% Tác động', avatarUrl: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=200' },
    { rank: 2, name: 'Sáng kiến Công nghệ vì Cộng đồng', score: '95% Tác động', avatarUrl: 'https://images.unsplash.com/photo-1521791136064-79c2920216?q=80&w=200' },
    { rank: 3, name: 'Tranh tường Nghệ thuật Cộng đồng', score: '92% Tác động', avatarUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=200' },
];

export const EVENTS: EventItem[] = [
  { date: '26/10, 2024', title: 'Giải Tennis Mở Rộng STB Cup', description: 'Giải đấu thường niên dành cho các tay vợt bán chuyên và chuyên nghiệp.', status: 'Sắp diễn ra', category: 'Tennis' },
  { date: '02/11, 2024', title: 'Golf Charity Classic 2024', description: 'Sự kiện golf gây quỹ từ thiện, quy tụ các doanh nhân và người nổi tiếng.', status: 'Sắp diễn ra', category: 'Golf' },
  { date: '15/11, 2024', title: 'Buổi Gặp Gỡ Cộng Đồng Simply The Best!', description: 'Một buổi gặp gỡ offline để kết nối, chia sẻ câu chuyện và truyền cảm hứng.', status: 'Sắp diễn ra', category: 'Cộng đồng' },
  { date: '23/11, 2024', title: 'Pickleball Festival For All', description: 'Ngày hội Pickleball dành cho mọi lứa tuổi, từ người mới bắt đầu đến nâng cao.', status: 'Sắp diễn ra', category: 'Pickleball' },
  { date: '31/12, 2024', title: 'Lễ Trao Giải Simply The Best! 2024', description: 'Lễ trao giải hàng năm vinh danh những cá nhân và đội nhóm xuất sắc nhất.', status: 'Sắp diễn ra', category: 'Cộng đồng' },
  { date: '01/09, 2024', title: 'Giải Tennis Mùa Hè', description: 'Giải đấu đã kết thúc thành công với những trận cầu đỉnh cao.', status: 'Đã qua', category: 'Tennis' },
  { date: '15/08, 2024', title: 'Giao hữu Golf Doanh nhân', description: 'Buổi giao lưu và kết nối trên sân golf giữa các thành viên.', status: 'Đã qua', category: 'Golf' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Áo thun STB "Excellence"', price: '699.000₫', imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800', description: 'Chất liệu cotton cao cấp, thoáng mát, mang lại sự thoải mái tối đa trong mọi hoạt động.' },
  { id: 2, name: 'Vợt Tennis STB "Champion"', price: '2.499.000₫', imageUrl: 'https://images.unsplash.com/photo-1553974102-1a45e94116c4?q=80&w=800', description: 'Thiết kế trợ lực, khung carbon siêu nhẹ, phù hợp cho người chơi có lối đánh tấn công.' },
  { id: 3, name: 'Quần short thể thao STB "Flow"', price: '899.000₫', imageUrl: 'https://images.unsplash.com/photo-1588665353363-c3575b3415f3?q=80&w=800', description: 'Công nghệ vải co giãn 4 chiều, thấm hút mồ hôi hiệu quả, lý tưởng cho mọi môn thể thao.' },
  { id: 4, name: 'Poster STB "Simply The Best"', price: '399.000₫', imageUrl: 'https://images.unsplash.com/photo-1542156996-0428d7525492?q=80&w=800', description: 'In trên chất liệu giấy cao cấp, màu sắc sống động, là nguồn cảm hứng cho không gian của bạn.' },
  { id: 5, name: 'Bóng Golf STB "Pro-Flight"', price: '1.299.000₫', imageUrl: 'https://images.unsplash.com/photo-1593826938253-9983938541ce?q=80&w=800', description: 'Bộ 12 bóng golf hiệu suất cao, tối ưu hóa đường bay và cảm giác khi tiếp xúc.' },
  { id: 6, name: 'Mũ Lưỡi Trai STB "Icon"', price: '499.000₫', imageUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882ba36?q=80&w=800', description: 'Thiết kế classic, logo thêu nổi, chất liệu Kaki bền đẹp và thoáng khí.' },
  { id: 7, name: 'Balo Thể Thao STB "Venture"', price: '1.899.000₫', imageUrl: 'https://images.unsplash.com/photo-1577983120164-33d95ddc2892?q=80&w=800', description: 'Nhiều ngăn tiện dụng, có ngăn đựng giày riêng, chất liệu chống thấm nước.' },
  { id: 8, name: 'Vợt Pickleball STB "Spark"', price: '1.599.000₫', imageUrl: 'https://images.unsplash.com/photo-1621599427429-0f2d7a229864?q=80&w=800', description: 'Lõi composite và bề mặt sợi carbon, mang lại sự cân bằng hoàn hảo giữa sức mạnh và kiểm soát.' },
];

export const USER_LEVELS: readonly LevelInfo[] = [
    { name: 'Thành viên mới', badge: '🥉', minPoints: 0 },
    { name: 'Người đóng góp', badge: '🥈', minPoints: 250 },
    { name: 'Chuyên gia', badge: '🥇', minPoints: 1000 },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
    heroTitle: "Simply The Best!",
    heroSlogan: "“Chỉ đơn giản là tốt nhất – Simply The Best!”",
    heroSubtitle: "Tôn vinh sự xuất sắc, khát vọng vươn tầm và lan tỏa năng lượng tích cực.",
    heroImageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1920',
    aboutTitle: "Giá Trị Cốt Lõi Của Chúng Tôi",
    aboutSubtitle: "Những nguyên tắc dẫn lối sứ mệnh tôn vinh sự xuất sắc."
};


export const USERS: User[] = [
    { id: 1, name: 'Linh Nguyễn', email: 'linh.nguyen@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=200', role: 'User', joined: '2024-08-01', status: 'Hoạt động', points: 1250, level: 'Chuyên gia', onlineStatus: 'Online' },
    { id: 2, name: 'Minh Hoàng', email: 'minh.hoang@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=200', role: 'User', joined: '2024-07-25', status: 'Hoạt động', points: 550, level: 'Người đóng góp', onlineStatus: 'Offline' },
    { id: 3, name: 'Tuấn Anh Trần', email: 'tuananhtran@lavisbrothers.com', password: 'tuananhtran@lavisbrothers.com', avatarUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded794825?q=80&w=200', role: 'Admin', joined: '2024-01-15', status: 'Hoạt động', points: 9999, level: 'Chuyên gia', onlineStatus: 'Online' },
    { id: 4, name: 'Bảo Trần', email: 'bao.tran@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1519714013440-34d281e5a51a?q=80&w=200', role: 'User', joined: '2024-06-10', status: 'Hoạt động', points: 120, level: 'Thành viên mới', onlineStatus: 'Online' },
    { id: 5, name: 'Khánh An', email: 'khanh.an@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1560089023-745c1a1f50a2?q=80&w=200', role: 'User', joined: '2024-09-01', status: 'Hoạt động', points: 800, level: 'Người đóng góp', onlineStatus: 'Online' },
    { id: 6, name: 'Gia Hân', email: 'gia.han@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200', role: 'User', joined: '2024-08-15', status: 'Hoạt động', points: 200, level: 'Thành viên mới', onlineStatus: 'Offline' },
    { id: 7, name: 'Dũng Phạm', email: 'dung.pham@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200', role: 'User', joined: '2024-05-02', status: 'Hoạt động', points: 1500, level: 'Chuyên gia', onlineStatus: 'Online' },
    { id: 8, name: 'Hà Mai', email: 'ha.mai@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200', role: 'User', joined: '2024-07-30', status: 'Hoạt động', points: 450, level: 'Người đóng góp', onlineStatus: 'Offline' },
    { id: 9, name: 'Minh Quân', email: 'minh.quan@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200', role: 'User', joined: '2024-09-05', status: 'Hoạt động', points: 80, level: 'Thành viên mới', onlineStatus: 'Offline' },
    { id: 10, name: 'Người Dùng Bị Cấm', email: 'suspended@example.com', password: 'password123', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200', role: 'User', joined: '2024-05-20', status: 'Bị cấm', points: 0, level: 'Thành viên mới', onlineStatus: 'Offline' },
];

export const USER_PROFILE_DATA: UserProfileData = {
  name: 'Linh "Tia Chớp" Nguyễn',
  avatarUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=400',
  points: 1250,
  rank: 1,
  badges: [
    { name: 'Tiên phong', icon: '🚀' },
    { name: 'Đóng góp hàng đầu', icon: '✍️' },
    { name: 'Nhà vô địch', icon: '🏆' },
    { name: 'Trưởng cộng đồng', icon: '👑' },
  ],
  activity: [
    { type: 'win', description: 'Thắng thử thách "Khoảnh Khắc Tuyệt Vời Nhất"', date: '3 ngày trước' },
    { type: 'post', description: 'Đăng bài "Chinh phục Marathon lúc bình minh"', date: '5 ngày trước' },
    { type: 'badge', description: 'Nhận huy hiệu "Tiên phong"', date: '1 tuần trước' },
    { type: 'post', description: 'Chia sẻ kinh nghiệm "Vô địch Olympic Vật lý Quốc gia"', date: '2 tuần trước' },
    { type: 'badge', description: 'Nhận huy hiệu "Người Kể Chuyện"', date: '2 tuần trước' },
    { type: 'win', description: 'Đạt giải nhất cuộc thi "Giải đố Logic" tuần 3', date: '3 tuần trước' },
    { type: 'post', description: 'Báo cáo tiến độ "Dự án Chân trời xanh"', date: '1 tháng trước' },
  ]
};

export const ADMIN_STATS: AdminStat[] = [
    { title: 'Tổng Người Dùng', value: '1,250', change: '+12%', icon: UsersIcon },
    { title: 'Doanh Thu Tháng', value: '112.500.000₫', change: '+5.5%', icon: DollarSignIcon },
    { title: 'Tỷ Lệ Tham Gia', value: '78%', change: '+3%', icon: BarChartIcon },
    { title: 'Bài Viết Mới', value: '312', change: '+20%', icon: ZapIcon },
];

export const PLUGINS: Plugin[] = [
    { id: 'seo-toolkit', name: 'Bộ công cụ SEO', description: 'Các công cụ nâng cao để tối ưu thẻ meta, sơ đồ trang web và nội dung cho các công cụ tìm kiếm.', author: 'STB Core Team', active: true },
    { id: 'advanced-analytics', name: 'Phân tích Nâng cao', description: 'Tích hợp bảng điều khiển phân tích mạnh mẽ để theo dõi sự tương tác của người dùng và các chỉ số KPI.', author: 'STB Core Team', active: true },
    { id: 'email-marketing', name: 'Tiếp thị qua Email', description: 'Kết nối với Mailchimp hoặc các dịch vụ khác để gửi bản tin và email giao dịch.', author: 'Đóng góp từ cộng đồng', active: false },
    { id: 'gamification-pro', name: 'Gamification Pro', description: 'Mở khóa các tính năng nâng cao như nhiệm vụ, thử thách hàng ngày và huy hiệu sự kiện đặc biệt.', author: 'STB Core Team', active: false },
];

export const COMMUNITY_STATS: CommunityStatItem[] = [
    { value: "1,250", label: "Tổng thành viên", icon: UsersIcon },
    { value: "315", label: "Đang trực tuyến", icon: ZapIcon },
    { value: "890", label: "Thành tích được chia sẻ", icon: StarIcon },
];

export const CHALLENGES: Challenge[] = [
    { category: "Cuộc thi Thể thao", title: "Vua tốc độ", description: "Ghi lại và chia sẻ video về cú ace tennis mạnh nhất của bạn.", prize: "Vợt STB 'Champion'", icon: TrophyIcon },
    { category: "Mini-game Sáng tạo", title: "Nghệ thuật Tái chế", description: "Tạo ra một tác phẩm nghệ thuật độc đáo từ vật liệu tái chế.", prize: "Voucher Cửa hàng 500k", icon: LightbulbIcon },
    { category: "Thử thách Học thuật", title: "Giải đố Logic", description: "Tham gia giải câu đố logic hàng tuần và leo lên bảng xếp hạng trí tuệ.", prize: "Huy hiệu 'Bộ óc Vĩ đại'", icon: GamepadIcon },
];

export const FEATURED_BADGES: FeaturedBadge[] = [
    { name: 'Người Kể Chuyện', description: 'Chia sẻ 10 câu chuyện thành tích.', icon: '✍️' },
    { name: 'Nhà Vô Địch Bền Bỉ', description: 'Tham gia 5 thử thách liên tiếp.', icon: '🏅' },
    { name: 'Ngôi Sao Cộng Đồng', description: 'Nhận 500 lượt thích cho các bài đăng.', icon: '🌟' },
];

export const PARTNERS: Partner[] = [
    { id: 1, name: 'Sportify Gear', logoUrl: 'https://tailwindui.com/img/logos/158x48/statickit-logo-white.svg' },
    { id: 2, name: 'Artisan Creations', logoUrl: 'https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg' },
    { id: 3, name: 'Tech Innovators', logoUrl: 'https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg' },
    { id: 4, name: 'Academy Excellence', logoUrl: 'https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg' },
    { id: 5, name: 'Community Builders', logoUrl: 'https://tailwindui.com/img/logos/158x48/reform-logo-white.svg' },
];

export const MEDIA_ITEMS: MediaItem[] = [
    { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400', name: 'marathon-sunrise.jpg', size: '1.2 MB' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400', name: 'art-exhibition.jpg', size: '980 KB' },
    { id: 3, type: 'video', url: 'https://videos.pexels.com/video-files/3209828/3209828-sd_640_360_30fps.mp4', name: 'tennis-match.mp4', size: '5.6 MB' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=400', name: 'startup-launch.jpg', size: '2.1 MB' },
];

export const NEWS_POSTS: Post[] = [
  { 
    id: 101, 
    author: 'STB News', 
    category: 'Thông báo', 
    title: 'Ra mắt tính năng Bảng xếp hạng Mùa giải mới', 
    content: 'Mùa giải mới đã chính thức bắt đầu! Hãy cùng xem ai sẽ là người dẫn đầu trong các hạng mục năm nay.',
    imageUrl: 'https://images.unsplash.com/photo-1599334394218-c68196f1947b?q=80&w=800', 
    likes: 320, 
    comments: 15,
    status: 'Xuất bản',
    seoKeywords: 'bảng xếp hạng, mùa giải, thông báo',
    datePublished: '2024-10-01'
  },
  { 
    id: 102, 
    author: 'STB News', 
    category: 'Sự kiện', 
    title: 'Đăng ký Giải Tennis STB Cup Mở Rộng ngay hôm nay!', 
    content: 'Cổng đăng ký cho giải đấu tennis lớn nhất năm đã mở. Đừng bỏ lỡ cơ hội tranh tài và nhận những phần thưởng giá trị.',
    imageUrl: 'https://images.unsplash.com/photo-1560089023-745c1a1f50a2?q=80&w=800', 
    likes: 180, 
    comments: 9,
    status: 'Xuất bản',
    seoKeywords: 'tennis, giải đấu, STB Cup, đăng ký',
    datePublished: '2024-09-30'
  },
  { 
    id: 103, 
    author: 'STB News', 
    category: 'Đối tác', 
    title: 'Chào mừng Sportify Gear - Đối tác trang phục chính thức', 
    content: 'Chúng tôi vui mừng thông báo Sportify Gear sẽ là nhà tài trợ và cung cấp trang phục chính thức cho các sự kiện của Simply The Best!',
    imageUrl: 'https://images.unsplash.com/photo-1511285560991-702963444747?q=80&w=800', 
    likes: 250, 
    comments: 22,
    status: 'Xuất bản',
    seoKeywords: 'đối tác, tài trợ, Sportify Gear',
    datePublished: '2024-09-28'
  },
  { 
    id: 104, 
    author: 'STB News', 
    category: 'Cộng đồng', 
    title: 'Câu chuyện truyền cảm hứng: Từ con số 0 đến startup triệu đô', 
    content: 'Lắng nghe chia sẻ từ Dũng Phạm, một thành viên của cộng đồng, về hành trình khởi nghiệp đầy gian nan nhưng cũng rất ngọt ngào.',
    imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f991767def?q=80&w=800', 
    likes: 560, 
    comments: 45,
    status: 'Xuất bản',
    seoKeywords: 'câu chuyện, truyền cảm hứng, startup',
    datePublished: '2024-09-25'
  },
  { 
    id: 105, 
    author: 'STB News', 
    category: 'Cập nhật', 
    title: 'Nâng cấp hệ thống điểm thưởng và huy hiệu mới', 
    content: 'Hệ thống gamification đã được làm mới với nhiều cách kiếm điểm và bộ sưu tập huy hiệu độc đáo đang chờ bạn khám phá.',
    imageUrl: 'https://images.unsplash.com/photo-1587393438459-a583a21312b9?q=80&w=800', 
    likes: 190, 
    comments: 18,
    status: 'Xuất bản',
    seoKeywords: 'cập nhật, điểm thưởng, huy hiệu',
    datePublished: '2024-09-22'
  },
  { 
    id: 106, 
    author: 'STB News', 
    category: 'Sản phẩm', 
    title: 'Bộ sưu tập Thu-Đông 2024 đã có mặt tại cửa hàng!', 
    content: 'Khám phá những mẫu áo, quần và phụ kiện mới nhất được thiết kế để mang lại sự thoải mái và phong cách cho các nhà vô địch.',
    imageUrl: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800', 
    likes: 410, 
    comments: 31,
    status: 'Xuất bản',
    seoKeywords: 'sản phẩm, bộ sưu tập, thời trang',
    datePublished: '2024-09-20'
  },
  { 
    id: 107, 
    author: 'STB News', 
    category: 'Nghệ thuật', 
    title: 'Workshop Nhiếp ảnh Thể thao cùng chuyên gia', 
    content: 'Một buổi workshop độc quyền dành cho các thành viên yêu thích nhiếp ảnh, học hỏi kinh nghiệm bắt trọn những khoảnh khắc đỉnh cao.',
    imageUrl: 'https://images.unsplash.com/photo-1516245388339-29a341b31508?q=80&w=800', 
    likes: 280, 
    comments: 25,
    status: 'Xuất bản',
    seoKeywords: 'workshop, nhiếp ảnh, nghệ thuật',
    datePublished: '2024-09-18'
  },
  { 
    id: 108, 
    author: 'STB News', 
    category: 'Thông báo', 
    title: 'Bảo trì hệ thống định kỳ vào cuối tuần', 
    content: 'Để nâng cao trải nghiệm người dùng, chúng tôi sẽ tiến hành bảo trì hệ thống vào lúc 2h sáng Chủ Nhật. Xin cảm ơn sự thông cảm của bạn.',
    imageUrl: 'https://images.unsplash.com/photo-1585776245865-b92df54d6b2b?q=80&w=800', 
    likes: 90, 
    comments: 7,
    status: 'Xuất bản',
    seoKeywords: 'bảo trì, hệ thống, thông báo',
    datePublished: '2024-09-17'
  },
];
