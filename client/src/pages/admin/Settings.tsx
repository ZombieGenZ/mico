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
  Palette,
  Key,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailComments: true,
    emailPromotions: false,
    smsOrders: true,
    smsPromotions: false,
    pushNotifications: true,
    systemAlerts: true,
    securityAlerts: true
  });
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('vi');
  
  const tabs = [
    { id: 'general', label: 'Thông tin chung', icon: SettingsIcon },
    { id: 'contact', label: 'Liên hệ', icon: Phone },
    { id: 'social', label: 'Mạng xã hội', icon: Globe },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'appearance', label: 'Giao diện', icon: Palette },
  ];

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
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
          
          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt thông báo</h2>
                
                <div className="space-y-8">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-yellow-400" />
                      Thông báo qua Email
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Đơn hàng mới</p>
                          <p className="text-sm text-gray-500">Nhận thông báo khi có đơn hàng mới</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.emailOrders}
                            onChange={(e) => handleNotificationChange('emailOrders', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Bình luận mới</p>
                          <p className="text-sm text-gray-500">Nhận thông báo khi có bình luận mới</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.emailComments}
                            onChange={(e) => handleNotificationChange('emailComments', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Khuyến mãi</p>
                          <p className="text-sm text-gray-500">Nhận thông báo về các chương trình khuyến mãi</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.emailPromotions}
                            onChange={(e) => handleNotificationChange('emailPromotions', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* SMS Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Smartphone className="h-5 w-5 mr-2 text-yellow-400" />
                      Thông báo qua SMS
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Đơn hàng quan trọng</p>
                          <p className="text-sm text-gray-500">Nhận SMS cho các đơn hàng giá trị cao</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.smsOrders}
                            onChange={(e) => handleNotificationChange('smsOrders', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Khuyến mãi đặc biệt</p>
                          <p className="text-sm text-gray-500">Nhận SMS về các chương trình khuyến mãi đặc biệt</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.smsPromotions}
                            onChange={(e) => handleNotificationChange('smsPromotions', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* System Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-yellow-400" />
                      Thông báo hệ thống
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Thông báo đẩy</p>
                          <p className="text-sm text-gray-500">Nhận thông báo đẩy trên trình duyệt</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.pushNotifications}
                            onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Cảnh báo hệ thống</p>
                          <p className="text-sm text-gray-500">Nhận cảnh báo về tình trạng hệ thống</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.systemAlerts}
                            onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Cảnh báo bảo mật</p>
                          <p className="text-sm text-gray-500">Nhận cảnh báo về các vấn đề bảo mật</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notifications.securityAlerts}
                            onChange={(e) => handleNotificationChange('securityAlerts', e.target.checked)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
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
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt bảo mật</h2>
                
                <div className="space-y-8">
                  {/* Password Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Key className="h-5 w-5 mr-2 text-yellow-400" />
                      Đổi mật khẩu
                    </h3>
                    <div className="space-y-4 pl-7">
                      <Input
                        label="Mật khẩu hiện tại"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu hiện tại"
                        icon={Lock}
                      />
                      <Input
                        label="Mật khẩu mới"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        icon={Lock}
                      />
                      <Input
                        label="Xác nhận mật khẩu mới"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập lại mật khẩu mới"
                        icon={Lock}
                      />
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span>{showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}</span>
                        </button>
                      </div>
                      <Button variant="primary">
                        Cập nhật mật khẩu
                      </Button>
                    </div>
                  </div>
                  
                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Smartphone className="h-5 w-5 mr-2 text-yellow-400" />
                      Xác thực 2 yếu tố (2FA)
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-700">Xác thực qua SMS</p>
                            <p className="text-sm text-gray-500">Nhận mã xác thực qua tin nhắn SMS</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Đã bật
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Tắt SMS 2FA
                        </Button>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-700">Google Authenticator</p>
                            <p className="text-sm text-gray-500">Sử dụng ứng dụng Google Authenticator</p>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                            Chưa bật
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Bật Google 2FA
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Management */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-yellow-400" />
                      Quản lý phiên đăng nhập
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-700">Phiên hiện tại</p>
                            <p className="text-sm text-gray-500">Chrome trên Windows - 192.168.1.100</p>
                            <p className="text-xs text-gray-400">Đăng nhập lúc 15:30 - 16/08/2025</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Đang hoạt động
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-700">Phiên khác</p>
                            <p className="text-sm text-gray-500">Safari trên iPhone - 192.168.1.105</p>
                            <p className="text-xs text-gray-400">Đăng nhập lúc 09:15 - 16/08/2025</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Đăng xuất
                          </Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <Button variant="secondary">
                          Đăng xuất tất cả thiết bị khác
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Login History */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-yellow-400" />
                      Lịch sử đăng nhập
                    </h3>
                    <div className="space-y-3 pl-7">
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Chrome trên Windows</p>
                            <p className="text-xs text-gray-500">IP: 192.168.1.100 - Hôm nay 15:30</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Thành công
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Safari trên iPhone</p>
                            <p className="text-xs text-gray-500">IP: 192.168.1.105 - Hôm nay 09:15</p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            Thành công
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Chrome trên Android</p>
                            <p className="text-xs text-gray-500">IP: 42.118.xxx.xxx - Hôm qua 20:45</p>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                            Thất bại
                          </span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Xem tất cả lịch sử
                      </Button>
                    </div>
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
          
          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cài đặt giao diện</h2>
                
                <div className="space-y-8">
                  {/* Theme Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-yellow-400" />
                      Chế độ giao diện
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-7">
                      <div 
                        onClick={() => setTheme('light')}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                          theme === 'light' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Sun className="h-8 w-8 text-yellow-500" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">Sáng</p>
                          <p className="text-sm text-gray-500">Giao diện sáng truyền thống</p>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => setTheme('dark')}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                          theme === 'dark' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Moon className="h-8 w-8 text-gray-700" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">Tối</p>
                          <p className="text-sm text-gray-500">Giao diện tối bảo vệ mắt</p>
                        </div>
                      </div>
                      
                      <div 
                        onClick={() => setTheme('auto')}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                          theme === 'auto' 
                            ? 'border-yellow-400 bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-3">
                          <Monitor className="h-8 w-8 text-gray-600" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">Tự động</p>
                          <p className="text-sm text-gray-500">Theo cài đặt hệ thống</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Language Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-yellow-400" />
                      Ngôn ngữ
                    </h3>
                    <div className="pl-7">
                      <div className="max-w-xs">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chọn ngôn ngữ hiển thị
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none"
                        >
                          <option value="vi">Tiếng Việt</option>
                          <option value="en">English</option>
                          <option value="zh">中文</option>
                          <option value="ja">日本語</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Color Scheme */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Palette className="h-5 w-5 mr-2 text-yellow-400" />
                      Màu sắc chủ đạo
                    </h3>
                    <div className="pl-7">
                      <p className="text-sm text-gray-600 mb-4">Chọn màu chủ đạo cho giao diện admin</p>
                      <div className="grid grid-cols-6 gap-3 max-w-md">
                        <div className="w-10 h-10 bg-yellow-400 rounded-lg cursor-pointer border-2 border-yellow-500 shadow-sm"></div>
                        <div className="w-10 h-10 bg-blue-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-green-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-green-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-purple-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-purple-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-red-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-red-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-pink-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-pink-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-teal-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-teal-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-orange-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-orange-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-cyan-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-cyan-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-lime-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-lime-600 shadow-sm"></div>
                        <div className="w-10 h-10 bg-gray-500 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-600 shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Layout Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <SettingsIcon className="h-5 w-5 mr-2 text-yellow-400" />
                      Cài đặt bố cục
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Menu thu gọn</p>
                          <p className="text-sm text-gray-500">Thu gọn menu bên trái để có thêm không gian</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Hiển thị breadcrumb</p>
                          <p className="text-sm text-gray-500">Hiển thị đường dẫn điều hướng</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Animation chuyển trang</p>
                          <p className="text-sm text-gray-500">Hiệu ứng chuyển đổi giữa các trang</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Font Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <SettingsIcon className="h-5 w-5 mr-2 text-yellow-400" />
                      Cài đặt phông chữ
                    </h3>
                    <div className="space-y-4 pl-7">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kích thước chữ
                        </label>
                        <select className="max-w-xs w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none">
                          <option value="small">Nhỏ</option>
                          <option value="medium" selected>Vừa</option>
                          <option value="large">Lớn</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phông chữ
                        </label>
                        <select className="max-w-xs w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none">
                          <option value="inter">Inter</option>
                          <option value="roboto">Roboto</option>
                          <option value="opensans">Open Sans</option>
                          <option value="system">Hệ thống</option>
                        </select>
                      </div>
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;