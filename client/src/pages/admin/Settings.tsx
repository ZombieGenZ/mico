import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'Thông tin chung', icon: SettingsIcon },
    { id: 'contact', label: 'Liên hệ', icon: Phone },
    { id: 'social', label: 'Mạng xã hội', icon: Globe },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <p className="text-gray-600">Quản lý cài đặt và cấu hình website</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Card>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-yellow-400 text-slate-900 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>
        
        {/* Content */}
        <div className="lg:w-3/4">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin chung</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Tên công ty"
                      defaultValue="Xe Công Trình VN"
                      placeholder="Nhập tên công ty"
                    />
                    <Input
                      label="Slogan"
                      defaultValue="Đại lý xe công trình uy tín"
                      placeholder="Nhập slogan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mô tả công ty
                    </label>
                    <textarea
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none resize-none"
                      defaultValue="Chúng tôi là đơn vị hàng đầu trong lĩnh vực cung cấp và cho thuê xe công trình với hơn 15 năm kinh nghiệm phục vụ khách hàng trên toàn quốc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Logo công ty
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="bg-yellow-400 text-slate-900 p-4 rounded-lg">
                        <span className="font-bold text-2xl">XE</span>
                      </div>
                      <Button variant="outline" icon={Upload}>
                        Tải lên logo mới
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Mã số thuế"
                      defaultValue="0123456789"
                      placeholder="Nhập mã số thuế"
                    />
                    <Input
                      label="Giấy phép kinh doanh"
                      defaultValue="0123456789-001"
                      placeholder="Nhập số GPKD"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="primary" icon={Save}>
                    Lưu thay đổi
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Contact Settings */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin liên hệ</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Hotline"
                      icon={Phone}
                      defaultValue="0123.456.789"
                      placeholder="Nhập số hotline"
                    />
                    <Input
                      label="Email chính"
                      icon={Mail}
                      type="email"
                      defaultValue="info@xecongtrinhvn.com"
                      placeholder="Nhập email chính"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email bán hàng"
                      icon={Mail}
                      type="email"
                      defaultValue="sales@xecongtrinhvn.com"
                      placeholder="Nhập email bán hàng"
                    />
                    <Input
                      label="Email hỗ trợ"
                      icon={Mail}
                      type="email"
                      defaultValue="support@xecongtrinhvn.com"
                      placeholder="Nhập email hỗ trợ"
                    />
                  </div>
                  
                  <div>
                    <Input
                      label="Địa chỉ trụ sở chính"
                      icon={MapPin}
                      defaultValue="123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Giờ làm việc (T2-T6)"
                      defaultValue="8:00 - 17:30"
                      placeholder="Nhập giờ làm việc"
                    />
                    <Input
                      label="Giờ làm việc (T7)"
                      defaultValue="8:00 - 12:00"
                      placeholder="Nhập giờ làm việc"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="primary" icon={Save}>
                    Lưu thay đổi
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Mạng xã hội</h2>
                
                <div className="space-y-4">
                  <Input
                    label="Facebook"
                    icon={Facebook}
                    defaultValue="https://facebook.com/xecongtrinhvn"
                    placeholder="Nhập link Facebook"
                  />
                  <Input
                    label="Twitter"
                    icon={Twitter}
                    defaultValue="https://twitter.com/xecongtrinhvn"
                    placeholder="Nhập link Twitter"
                  />
                  <Input
                    label="Instagram"
                    icon={Instagram}
                    defaultValue="https://instagram.com/xecongtrinhvn"
                    placeholder="Nhập link Instagram"
                  />
                  <Input
                    label="LinkedIn"
                    icon={Linkedin}
                    defaultValue="https://linkedin.com/company/xecongtrinhvn"
                    placeholder="Nhập link LinkedIn"
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="primary" icon={Save}>
                    Lưu thay đổi
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Other tabs content would go here */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt thông báo</h2>
                <p className="text-gray-600">Tính năng đang được phát triển...</p>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt bảo mật</h2>
                <p className="text-gray-600">Tính năng đang được phát triển...</p>
              </Card>
            </motion.div>
          )}
          
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt giao diện</h2>
                <p className="text-gray-600">Tính năng đang được phát triển...</p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;