import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ShoppingCart, Wrench, Settings } from 'lucide-react';
import { services } from '../../lib/mockData';
import Card from '../ui/Card';

const Services: React.FC = () => {
  const iconMap = {
    calendar: Calendar,
    'shopping-cart': ShoppingCart,
    wrench: Wrench,
    settings: Settings,
  };
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Dịch vụ <span className="text-yellow-400">chuyên nghiệp</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cung cấp giải pháp toàn diện cho mọi nhu cầu xe công trình
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center group h-full">
                  <div className="bg-yellow-400 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent className="h-8 w-8 text-slate-900" />}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;