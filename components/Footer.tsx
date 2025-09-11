import React from 'react';
import Logo from './icons/Logo';
import PhoneIcon from './icons/PhoneIcon';
import MapPinIcon from './icons/MapPinIcon';
import MailIcon from './icons/MailIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Slogan */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center space-x-2">
              <Logo className="h-24" />
            </a>
            <p className="text-gray-500 mt-4 text-sm">
              Cùng nhau tôn vinh sự xuất sắc, khát vọng vươn tầm và lan tỏa năng lượng tích cực.
            </p>
          </div>

          {/* Column 2: Quick Links (Placeholder) */}
          <div>
            <h4 className="font-semibold text-white mb-4">Trang</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-gray-400 hover:text-yellow-400">Về chúng tôi</a></li>
              <li><a href="#community" className="text-gray-400 hover:text-yellow-400">Cộng đồng</a></li>
              <li><a href="#events" className="text-gray-400 hover:text-yellow-400">Sự kiện</a></li>
              <li><a href="#merch" className="text-gray-400 hover:text-yellow-400">Cửa hàng</a></li>
            </ul>
          </div>

          {/* Column 3: Legal (Placeholder) */}
          <div>
            <h4 className="font-semibold text-white mb-4">Pháp lý</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Điều khoản Dịch vụ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Chính sách Bảo mật</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <PhoneIcon className="w-5 h-5 mt-0.5 text-yellow-400 flex-shrink-0" />
                <a href="tel:02742221292" className="ml-3 text-gray-400 hover:text-white">0274 222 1292</a>
              </li>
              <li className="flex items-start">
                <MailIcon className="w-5 h-5 mt-0.5 text-yellow-400 flex-shrink-0" />
                <a href="mailto:info@lavisbrothers.com" className="ml-3 text-gray-400 hover:text-white">info@lavisbrothers.com</a>
              </li>
               <li className="flex items-start">
                <MapPinIcon className="w-5 h-5 mt-0.5 text-yellow-400 flex-shrink-0" />
                <p className="ml-3 text-gray-400">92 Đ. Nguyễn Hữu Cảnh, Phường 22, Bình Thạnh, TP.HCM</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Simply The Best!. Một sản phẩm của Lavis Brothers. Đã đăng ký bản quyền.
        </div>
      </div>
    </footer>
  );
};

export default Footer;