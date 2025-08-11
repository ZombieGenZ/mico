import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ShoppingCart, 
  Wrench, 
  Settings, 
  Phone, 
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Users
} from 'lucide-react';
import { services } from '../lib/mockData';
import { ROUTES } from '../lib/constants';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Services: React.FC = () => {
  const iconMap = {
    calendar: Calendar,
    'shopping-cart': ShoppingCart,
    wrench: Wrench,
    settings: Settings,
  };
  
  const processSteps = [
    {
      step: 1,
      title: 'Tư vấn nhu cầu',
      description: 'Chúng tôi lắng nghe và tư vấn giải pháp phù hợp nhất',
      icon: Users,
    },
    {
      step: 2,
      title: 'Báo giá chi tiết',
      description: 'Cung cấp báo giá minh bạch, cạnh tranh',
      icon: ShoppingCart,
    },
    {
      step: 3,
      title: 'Ký hợp đồng',
      description: 'Thủ tục nhanh chóng, đảm bảo quyền lợi khách hàng',
      icon: CheckCircle,
    },
    {
      step: 4,
      title: 'Giao xe & hỗ trợ',
      description: 'Giao xe tận nơi, hướng dẫn sử dụng và bảo trì',
      icon: Shield,
    },
  ];
  
  const benefits = [
    {
      title: 'Chất lượng đảm bảo',
      description: 'Xe chính hãng, kiểm định chất lượng nghiêm ngặt',
      icon: Shield,
    },
    {
      title: 'Giá cả cạnh tranh',
      description: 'Báo giá minh bạch, không phát sinh chi phí ẩn',
      icon: ShoppingCart,
    },
    {
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ kỹ thuật sẵn sàng hỗ trợ mọi lúc',
      icon: Clock,
    },
    {
      title: 'Bảo hành toàn diện',
      description: 'Chế độ bảo hành và bảo trì định kỳ',
      icon: Wrench,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dịch vụ <span className="text-yellow-400">chuyên nghiệp</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Cung cấp giải pháp toàn diện cho mọi nhu cầu xe công trình của bạn
            </p>
            <Link to={ROUTES.CONTACT}>
              <Button variant="primary" size="lg" icon={Phone}>
                Liên hệ tư vấn
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Từ cho thuê đến bán xe, từ bảo trì đến cung cấp phụ tùng
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                  <Card className="h-full">
                    <div className="flex items-start space-x-6">
                      <div className="bg-yellow-400 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                        {IconComponent && <IconComponent className="h-8 w-8 text-slate-900" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {service.description}
                        </p>
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                          Tìm hiểu thêm
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Tại sao chọn chúng tôi?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những lợi ích vượt trội khi sử dụng dịch vụ của chúng tôi
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full">
                    <div className="bg-yellow-100 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Quy trình <span className="text-yellow-400">làm việc</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              4 bước đơn giản để có được xe công trình phù hợp
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-yellow-400/30 transform -translate-y-1/2" />
                  )}
                  <div className="bg-yellow-400 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center relative z-10">
                    <span className="text-2xl font-bold text-slate-900">{step.step}</span>
                  </div>
                  <div className="bg-slate-800 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={ROUTES.QUOTE}>
                <Button variant="secondary" size="lg">
                  Yêu cầu báo giá
                </Button>
              </Link>
              <Link to={ROUTES.CONTACT}>
                <Button variant="outline" size="lg" icon={Phone}>
                  Gọi ngay: 0123.456.789
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;