import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Building
} from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();
  
  const onSubmit = async (data: ContactForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccess('Thành công!', 'Tin nhắn đã được gửi thành công!');
      reset();
    } catch (error) {
      showError('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
    }
  };
  
  const contactInfo = [
    {
      icon: Phone,
      title: 'Điện thoại',
      details: ['Hotline: 0123.456.789', 'Fax: (028) 1234.5678'],
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@xecongtrinhvn.com', 'sales@xecongtrinhvn.com'],
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      details: ['123 Đường Nguyễn Văn Linh', 'Quận 7, TP. Hồ Chí Minh'],
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      details: ['Thứ 2 - Thứ 6: 8:00 - 17:30', 'Thứ 7: 8:00 - 12:00'],
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-orange-100',
    },
  ];
  
  const branches = [
    {
      name: 'Chi nhánh TP. Hồ Chí Minh',
      address: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
      phone: '0123.456.789',
      manager: 'Nguyễn Văn A',
    },
    {
      name: 'Chi nhánh Hà Nội',
      address: '456 Giải Phóng, Hai Bà Trưng, Hà Nội',
      phone: '0987.654.321',
      manager: 'Trần Thị B',
    },
    {
      name: 'Chi nhánh Đà Nẵng',
      address: '789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
      phone: '0369.258.147',
      manager: 'Lê Văn C',
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Liên hệ <span className="text-yellow-200">với chúng tôi</span>
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <div className={`${info.bgColor} w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md`}>
                      <IconComponent className={`h-8 w-8 ${info.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-3 rounded-lg shadow-md">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gửi tin nhắn</h2>
                    <p className="text-gray-600">Chúng tôi sẽ phản hồi trong 24h</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Họ và tên *"
                      icon={User}
                      placeholder="Nhập họ và tên"
                      {...register('name', {
                        required: 'Vui lòng nhập họ và tên',
                      })}
                      error={errors.name?.message}
                    />
                    
                    <Input
                      label="Số điện thoại *"
                      icon={Phone}
                      placeholder="Nhập số điện thoại"
                      {...register('phone', {
                        required: 'Vui lòng nhập số điện thoại',
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: 'Số điện thoại không hợp lệ',
                        },
                      })}
                      error={errors.phone?.message}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email *"
                      type="email"
                      icon={Mail}
                      placeholder="Nhập email"
                      {...register('email', {
                        required: 'Vui lòng nhập email',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email không hợp lệ',
                        },
                      })}
                      error={errors.email?.message}
                    />
                    
                    <Input
                      label="Công ty"
                      icon={Building}
                      placeholder="Tên công ty (tùy chọn)"
                      {...register('company')}
                    />
                  </div>
                  
                  <Input
                    label="Tiêu đề *"
                    placeholder="Tiêu đề tin nhắn"
                    {...register('subject', {
                      required: 'Vui lòng nhập tiêu đề',
                    })}
                    error={errors.subject?.message}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nội dung *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Nhập nội dung tin nhắn..."
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 focus:outline-none resize-none"
                      {...register('message', {
                        required: 'Vui lòng nhập nội dung',
                        minLength: {
                          value: 10,
                          message: 'Nội dung phải có ít nhất 10 ký tự',
                        },
                      })}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    loading={isSubmitting}
                    icon={Send}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </Button>
                </form>
              </Card>
            </motion.div>
            
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card padding="none" className="h-full">
                <div className="h-full min-h-[500px] bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Bản đồ</h3>
                    <p className="text-gray-600">
                      123 Đường Nguyễn Văn Linh<br />
                      Quận 7, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Branches */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Hệ thống chi nhánh
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chúng tôi có mặt tại các thành phố lớn trên toàn quốc
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <div className="text-center mb-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {branch.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600">{branch.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <p className="text-gray-600">{branch.phone}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-orange-500 flex-shrink-0" />
                      <p className="text-gray-600">Quản lý: {branch.manager}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Cần hỗ trợ ngay?
            </h2>
            <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
              Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                icon={Phone}
                className="bg-white text-orange-600 hover:bg-gray-100 border-2 border-white hover:border-gray-200"
              >
                Gọi ngay: 0123.456.789
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                icon={Mail}
                className="bg-transparent text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white"
              >
                Email: info@xecongtrinhvn.com
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;