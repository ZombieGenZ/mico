import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, User, LogOut } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { useAuthStore } from '../../stores/authStore';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const navigation = [
    { name: 'Trang chủ', href: ROUTES.HOME },
    { name: 'Xe công trình', href: ROUTES.VEHICLES },
    { name: 'Dịch vụ', href: ROUTES.SERVICES },
    { name: 'Tin tức', href: ROUTES.NEWS },
    { name: 'Về chúng tôi', href: ROUTES.ABOUT },
    { name: 'Liên hệ', href: ROUTES.CONTACT },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-slate-900 text-white shadow-xl relative z-50">
      {/* Top Bar */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3 text-yellow-400" />
                <span>0123.456.789</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3 text-yellow-400" />
                <span>info@xecongtrinhvn.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-yellow-400" />
                <span>TP. Hồ Chí Minh</span>
              </div>
            </div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center space-x-1 hover:text-yellow-400">
                  <User className="h-3 w-3" />
                  <span>{user?.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-yellow-400"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <Link to={ROUTES.LOGIN} className="hover:text-yellow-400">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="bg-yellow-400 text-slate-900 p-2 rounded-lg">
              <span className="font-bold text-xl">XE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">XE CÔNG TRÌNH VN</h1>
              <p className="text-xs text-gray-400">Đại lý xe công trình uy tín</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-yellow-400'
                    : 'text-white hover:text-yellow-400'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to={ROUTES.QUOTE}>
              <Button variant="primary" size="md">
                Yêu cầu báo giá
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-yellow-400 bg-slate-700 rounded-lg'
                      : 'text-white hover:text-yellow-400 hover:bg-slate-700 rounded-lg'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-700">
                <Link to={ROUTES.QUOTE}>
                  <Button variant="primary" size="md" className="w-full">
                    Yêu cầu báo giá
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;