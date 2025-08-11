import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Trang chủ', href: ROUTES.HOME },
    { name: 'Xe công trình', href: ROUTES.VEHICLES },
    { name: 'Dịch vụ', href: ROUTES.SERVICES },
    { name: 'Tin tức', href: ROUTES.NEWS },
    { name: 'Về chúng tôi', href: ROUTES.ABOUT },
    { name: 'Liên hệ', href: ROUTES.CONTACT },
  ];
  
  const services = [
    'Cho thuê xe công trình',
    'Mua bán xe công trình',
    'Bảo trì & Sửa chữa',
    'Cung cấp phụ tùng',
    'Tư vấn kỹ thuật',
    'Hỗ trợ 24/7',
  ];
  
  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' },
  ];
  
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-slate-900 p-2 rounded-lg">
                <span className="font-bold text-lg">XE</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400">XE CÔNG TRÌNH VN</h3>
                <p className="text-xs text-gray-400">Đại lý xe công trình uy tín</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chúng tôi là đơn vị hàng đầu trong lĩnh vực cung cấp và cho thuê xe công trình 
              với hơn 15 năm kinh nghiệm phục vụ khách hàng trên toàn quốc.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="bg-slate-800 p-2 rounded-lg hover:bg-yellow-400 hover:text-slate-900 transition-colors duration-200"
                  aria-label={name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Dịch vụ</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-gray-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-400">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-400">
                    123 Đường Nguyễn Văn Linh, Quận 7<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-yellow-400" />
                <p className="text-sm text-gray-400">0123.456.789</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-yellow-400" />
                <p className="text-sm text-gray-400">info@xecongtrinhvn.com</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Xe Công Trình VN. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;