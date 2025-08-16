import React, { useState, useEffect } from 'react';
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
  
  // Đóng mobile menu khi route thay đổi
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Đóng menu khi click vào nav item
  const handleNavClick = () => {
    setIsOpen(false);
  };
  
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
    <motion.header 
      className="bg-slate-900 text-white shadow-xl relative z-50 sticky top-0"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Top Bar */}
      <motion.div 
        className="bg-slate-800 py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-3 w-3 text-yellow-400" />
                <span>0123.456.789</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="h-3 w-3 text-yellow-400" />
                <span>info@xecongtrinhvn.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="h-3 w-3 text-yellow-400" />
                <span>TP. Hồ Chí Minh</span>
              </motion.div>
            </div>
            {isAuthenticated ? (
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center space-x-1 hover:text-yellow-400 transition-colors">
                  <User className="h-3 w-3" />
                  <span>{user?.name}</span>
                </Link>
                <motion.button
                  onClick={logout}
                  className="flex items-center space-x-1 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-3 w-3" />
                  <span>Đăng xuất</span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to={ROUTES.LOGIN} className="hover:text-yellow-400 transition-colors">
                    Đăng nhập
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link 
              to={ROUTES.HOME} 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <motion.div 
                className="bg-yellow-400 text-slate-900 p-2 rounded-lg"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-bold text-xl">XE</span>
              </motion.div>
              <div>
                <motion.h1 
                  className="text-xl font-bold text-yellow-400"
                  whileHover={{ scale: 1.05 }}
                >
                  XE CÔNG TRÌNH VN
                </motion.h1>
                <p className="text-xs text-gray-400">Đại lý xe công trình uy tín</p>
              </div>
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + (index * 0.1) 
                }}
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  onClick={handleNavClick}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-yellow-400'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"
                      initial={false}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* CTA Button */}
          <motion.div 
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to={ROUTES.QUOTE}>
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="md" className="transform transition-transform duration-200">
                  Yêu cầu báo giá
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                duration: 0.2,
                ease: "easeInOut"
              }
            }}
            className="lg:hidden bg-slate-800 overflow-hidden border-t border-slate-700"
          >
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <motion.div
                    whileHover={{ 
                      x: 8,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                        isActive(item.href)
                          ? 'text-yellow-400 bg-slate-700 shadow-inner'
                          : 'text-white hover:text-yellow-400 hover:bg-slate-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
              <motion.div 
                className="pt-4 border-t border-slate-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.1, duration: 0.3 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Link to={ROUTES.QUOTE}> 
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="primary" size="md" className="w-full">
                      Yêu cầu báo giá
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;