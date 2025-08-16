import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: 'Giải pháp xe công trình toàn diện',
      subtitle: 'Cho thuê & mua bán xe công trình chất lượng cao',
      description: 'Hơn 15 năm kinh nghiệm cung cấp xe công trình với dịch vụ chuyên nghiệp, giá cả cạnh tranh',
      image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1600',
      cta: 'Khám phá ngay',
      ctaLink: ROUTES.VEHICLES,
    },
    {
      id: 2,
      title: 'Máy xúc Komatsu hàng đầu',
      subtitle: 'Công nghệ Nhật Bản - Hiệu suất vượt trội',
      description: 'Máy xúc Komatsu PC200-8 mới nhất với công nghệ tiên tiến, tiết kiệm nhiên liệu',
      image: 'https://images.pexels.com/photos/162514/excavators-construction-site-construction-work-162514.jpeg?auto=compress&cs=tinysrgb&w=1600',
      cta: 'Xem chi tiết',
      ctaLink: '/vehicles/1',
    },
    {
      id: 3,
      title: 'Dịch vụ bảo trì chuyên nghiệp',
      subtitle: '24/7 hỗ trợ kỹ thuật',
      description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, phụ tùng chính hãng, bảo hành toàn diện',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1600',
      cta: 'Tìm hiểu thêm',
      ctaLink: ROUTES.SERVICES,
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.p
                  className="text-secondary-400 text-lg font-semibold mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Link to={slides[currentSlide].ctaLink}>
                    <Button variant="primary" size="lg">
                      {slides[currentSlide].cta}
                    </Button>
                  </Link>
                  <Link to={ROUTES.CONTACT}>
                    <Button variant="outline" size="lg" icon={Play}>
                      Xem video giới thiệu
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-gradient-secondary scale-125 shadow-glow' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-gradient-primary text-white p-3 rounded-full transition-all duration-200 hover:shadow-orange"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-gradient-primary text-white p-3 rounded-full transition-all duration-200 hover:shadow-orange"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
};

export default Hero;