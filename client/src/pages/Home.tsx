import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import Services from '../components/home/Services';
import Statistics from '../components/home/Statistics';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section với theme mới */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 overflow-hidden">
        <Hero />
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-300/20 rounded-full blur-lg"></div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-white">
        <Services />
      </section>
      
      {/* Featured Vehicles Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <FeaturedVehicles />
      </section>
      
      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500">
        <Statistics />
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Bắt đầu dự án của bạn ngay hôm nay
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn và báo giá tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Liên hệ ngay
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300">
              Xem catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;