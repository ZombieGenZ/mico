import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Heart, ArrowRight } from 'lucide-react';
import { vehicles } from '../../lib/mockData';
import { ROUTES } from '../../lib/constants';
import Card from '../ui/Card';
import Button from '../ui/Button';

const FeaturedVehicles: React.FC = () => {
  const featuredVehicles = vehicles.filter(vehicle => vehicle.featured).slice(0, 3);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Xe công trình <span className="text-yellow-400">nổi bật</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá các dòng xe công trình chất lượng cao với công nghệ hiện đại
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group" padding="none">
                <div className="relative">
                  <img
                    src={vehicle.images[0]}
                    alt={vehicle.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      vehicle.condition === 'new' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-400 text-slate-900'
                    }`}>
                      {vehicle.condition === 'new' ? 'Mới' : 'Đã sử dụng'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm opacity-90">{vehicle.location}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-500 transition-colors duration-200">
                      {vehicle.name}
                    </h3>
                    <span className="text-sm text-gray-500">{vehicle.year}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {vehicle.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Công suất:</span>
                      <p className="font-semibold text-slate-900">{vehicle.specs.power}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Trọng lượng:</span>
                      <p className="font-semibold text-slate-900">{vehicle.specs.weight}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-4">
                    <div>
                      <p className="text-2xl font-bold text-yellow-500">
                        {formatPrice(vehicle.price)}
                      </p>
                      {vehicle.rentPrice && (
                        <p className="text-sm text-gray-500">
                          Thuê: {formatPrice(vehicle.rentPrice)}/tháng
                        </p>
                      )}
                    </div>
                    <Link to={`/vehicles/${vehicle.id}`}>
                      <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to={ROUTES.VEHICLES}>
            <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
              Xem tất cả xe công trình
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;