import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from "../types";

// IMPORTANT: API key is hardcoded as per user's explicit request to bypass standard security practices.
const apiKey = 'AIzaSyDzMOeUW-zDXSeejjr4y6NT23ZOj_BHd2Y';

if (!apiKey) {
    console.error("API_KEY has not been set.");
}
const ai = new GoogleGenAI({ apiKey });

const getSystemInstruction = (role: 'Admin' | 'User', name: string) => `Bạn là một trợ lý AI thân thiện và chuyên nghiệp cho nền tảng "Simply The Best!".
Vai trò của bạn là hỗ trợ, hướng dẫn và truyền cảm hứng cho người dùng.
Người dùng hiện tại là ${name}, có vai trò là ${role}.
- Hãy luôn trả lời bằng tiếng Việt.
- Khi người dùng hỏi về cách thực hiện một tác vụ (ví dụ: "làm sao để đăng bài?", "cách sửa sản phẩm?"), hãy trả lời ngắn gọn và thêm một lệnh đặc biệt vào cuối câu trả lời của bạn. Lệnh này sẽ kích hoạt chế độ hướng dẫn trực quan.
  - Để hướng dẫn tạo bài viết, dùng lệnh: [GUIDE:create_post]
- Khi người dùng hỏi về cách tính điểm, hãy giải thích ngắn gọn: Đăng bài (+50), nhận like (+5), nhận bình luận (+10).
- Nếu người dùng hỏi các câu hỏi chung, hãy trả lời một cách hữu ích và tích cực, phù hợp với tinh thần của "Simply The Best!".
- Nếu bạn không biết câu trả lời, hãy nói rằng bạn sẽ kết nối họ với đội ngũ hỗ trợ.`;


export async function getChatbotResponse(history: ChatMessage[], newMessage: string, userRole: 'Admin' | 'User' = 'User', userName: string = 'Bạn'): Promise<string> {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: getSystemInstruction(userRole, userName),
            },
        });
        const response = await chat.sendMessage({ message: newMessage });
        return response.text;

    } catch (error) {
        console.error("Gemini API Error (getChatbotResponse):", error);
        return "Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.";
    }
}

// AI Content Generation Functions for PostEditor
export async function generatePostTitle(content: string): Promise<string> {
    try {
        const prompt = `Dựa vào nội dung sau, hãy đề xuất 5 tiêu đề bài viết thật hấp dẫn, phù hợp với tinh thần "Simply The Best!". Chỉ trả về tiêu đề hay nhất, không giải thích gì thêm:\n\n"${content.substring(0, 500)}..."`;
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
        return response.text.trim().replace(/"/g, ''); // Clean up response
    } catch (error) {
        console.error("Gemini API Error (generatePostTitle):", error);
        return "Không thể tạo tiêu đề lúc này.";
    }
}

export async function optimizePostSEO(title: string, content: string): Promise<string> {
    try {
        const prompt = `Phân tích tiêu đề và nội dung bài viết sau đây để đề xuất 5-7 từ khóa SEO (keywords) phù hợp nhất. Các từ khóa nên tập trung vào chủ đề chính và có khả năng thu hút tìm kiếm. Chỉ trả về danh sách các từ khóa, cách nhau bằng dấu phẩy, không giải thích gì thêm.\n\nTiêu đề: ${title}\nNội dung: "${content.substring(0, 500)}..."`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Gemini API Error (optimizePostSEO):", error);
        return "";
    }
}

export async function expandPostContent(content: string): Promise<string> {
     try {
        const prompt = `Hãy đóng vai một cây viết đầy cảm hứng. Dựa vào đoạn văn sau, hãy viết tiếp khoảng 2-3 câu để làm cho nội dung trở nên sâu sắc và hấp dẫn hơn, giữ nguyên văn phong gốc. Chỉ trả về phần viết thêm, không lặp lại nội dung đã có.\n\nNội dung gốc:\n"${content}"`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return content + "\n\n" + response.text.trim();
    } catch (error) {
        console.error("Gemini API Error (expandPostContent):", error);
        return content;
    }
}