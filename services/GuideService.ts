import type { GuideStep } from '../types';

const GUIDES: Record<string, GuideStep[]> = {
    'create_post': [
        {
            elementId: 'admin-nav-posts',
            title: 'Bước 1: Mở Quản lý Bài viết',
            description: 'Đầu tiên, hãy nhấp vào tab "Bài viết" để xem danh sách tất cả các bài viết hiện có.',
            action: 'click',
        },
        {
            elementId: 'post-manager-add-new',
            title: 'Bước 2: Bắt đầu viết bài mới',
            description: 'Bây giờ, hãy nhấp vào nút "Viết bài mới" để mở trình soạn thảo.',
            action: 'click',
        },
        {
            elementId: 'post-editor-title',
            title: 'Bước 3: Nhập Tiêu đề',
            description: 'Hãy điền một tiêu đề thật hấp dẫn cho bài viết của bạn tại đây.',
            action: 'type',
        },
        {
            elementId: 'post-editor-content',
            title: 'Bước 4: Soạn thảo Nội dung',
            description: 'Đây là nơi bạn chia sẻ câu chuyện của mình. Bạn cũng có thể dùng Trợ lý AI ở dưới để hỗ trợ.',
            action: 'type',
        },
        {
            elementId: 'post-editor-image',
            title: 'Bước 5: Thêm ảnh đại diện',
            description: 'Dán một URL hình ảnh vào đây để bài viết thêm phần sinh động.',
            action: 'type',
        },
        {
            elementId: 'post-editor-publish',
            title: 'Bước 6: Xuất bản',
            description: 'Khi đã hoàn tất, hãy nhấp vào đây để chia sẻ bài viết của bạn với cộng đồng!',
            action: 'click',
        },
    ],
    // Future guides can be added here
    // 'edit_product': [ ... ]
};


export const getGuide = (guideName: string): GuideStep[] | null => {
    return GUIDES[guideName] || null;
};
