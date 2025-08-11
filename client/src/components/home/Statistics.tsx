import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Users, Award, Clock } from 'lucide-react';

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: Truck,
      number: '500+',
      label: 'Xe công trình',
      description: 'Đa dạng loại xe'
    },
    {
      icon: Users,
      number: '2000+',
      label: 'Khách hàng',
      description: 'Tin tưởng sử dụng'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Năm kinh nghiệm',
      description: 'Trong ngành'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Hỗ trợ',
      description: 'Tư vấn và bảo trì'
    }
  ];
  
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23FFD60A%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Những con số <span className="text-yellow-400">ấn tượng</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thành tựu và sự tin tưởng từ khách hàng trong suốt hành trình phát triển
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-yellow-400 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconComponent className="h-10 w-10 text-slate-900" />
                </div>
                <motion.h3
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2"
                >
                  {stat.number}
                </motion.h3>
                <h4 className="text-xl font-semibold mb-1">
                  {stat.label}
                </h4>
                <p className="text-gray-400">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;