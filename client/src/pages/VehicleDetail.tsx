import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Gauge,
  Weight,
  Settings,
  CheckCircle,
  Star
} from 'lucide-react';
import { useVehicleStore } from '../stores/vehicleStore';
import { ROUTES } from '../lib/constants';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getVehicleById } = useVehicleStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  
  const vehicle = getVehicleById(id || '0');
  
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy xe</h2>
          <p className="text-gray-600 mb-6">Xe công trình bạn tìm kiếm không tồn tại.</p>
          <Link to={ROUTES.VEHICLES}>
            <Button variant="primary">Quay lại danh sách</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const tabs = [
    { id: 'specs', label: 'Thông số kỹ thuật', icon: Settings },
    { id: 'features', label: 'Tính năng', icon: CheckCircle },
    { id: 'reviews', label: 'Đánh giá', icon: Star },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
        >
          <Link to={ROUTES.HOME} className="hover:text-yellow-500">Trang chủ</Link>
          <span>/</span>
          <Link to={ROUTES.VEHICLES} className="hover:text-yellow-500">Xe công trình</Link>
          <span>/</span>
          <span className="text-slate-900">{vehicle.title}</span>
        </motion.div>
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to={ROUTES.VEHICLES}>
            <Button variant="ghost" icon={ArrowLeft}>
              Quay lại danh sách
            </Button>
          </Link>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <Card padding="none" className="overflow-hidden">
              <div className="relative">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={vehicle.image[selectedImage].url.toString()}
                  alt={vehicle.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    vehicle.is_new
                      ? 'bg-green-500 text-white' 
                      : 'bg-yellow-400 text-slate-900'
                  }`}>
                    {vehicle.is_new ? 'Mới' : 'Đã sử dụng'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2">
                  {vehicle.image.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-yellow-400' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url.toString()}
                        alt={`${vehicle.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>
            
            {/* Tabs Content */}
            <Card className="mt-6">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-yellow-400 text-yellow-500'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {vehicle.technical_information && vehicle.technical_information.map((tech, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Settings className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm text-gray-500">{tech.name}</p>
                          <p className="font-semibold">{tech.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-500">Ngày tạo</p>
                        <p className="font-semibold">{vehicle.created_at ? new Date(vehicle.created_at).toLocaleDateString('vi-VN') : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm text-gray-500">Trạng thái</p>
                        <p className="font-semibold">{vehicle.in_stock ? 'Có sẵn' : 'Hết hàng'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'features' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Tính năng nổi bật</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vehicle.features && vehicle.features.length > 0 ? (
                      vehicle.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Chưa có thông tin tính năng</p>
                    )}
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-slate-900">4.8/5</p>
                    <p className="text-gray-600">Dựa trên 24 đánh giá</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Nguyễn Văn A',
                        rating: 5,
                        comment: 'Xe chất lượng tốt, hiệu suất cao. Rất hài lòng với dịch vụ.',
                        date: '2024-01-15'
                      },
                      {
                        name: 'Trần Thị B',
                        rating: 4,
                        comment: 'Máy móc hoạt động ổn định, nhân viên tư vấn nhiệt tình.',
                        date: '2024-01-10'
                      }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${
                                  star <= review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-1">{review.comment}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <Card>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{vehicle.title}</h1>
                <p className="text-gray-600">{vehicle.subtitle}</p>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-yellow-500 mb-2">
                  {vehicle.in_stock ? 'Có sẵn' : 'Hết hàng'}
                </p>
                <p className="text-lg text-gray-600">
                  Liên hệ để biết giá
                </p>
              </div>
              
              <div className="space-y-3">
                <Link to={ROUTES.QUOTE}>
                  <Button variant="primary" size="lg" className="w-full">
                    Yêu cầu báo giá
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full" icon={Phone}>
                  Gọi ngay: 0123.456.789
                </Button>
              </div>
            </Card>
            
            {/* Contact Info */}
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Thông tin liên hệ</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Hotline</p>
                    <p className="text-gray-600">0123.456.789</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@xecongtrinhvn.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold">Showroom</p>
                    <p className="text-gray-600">123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Vehicle Status */}
            <Card>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Trạng thái xe</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Tình trạng:</span>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    vehicle.in_stock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {vehicle.in_stock ? 'Có sẵn' : 'Hết hàng'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Loại xe:</span>
                  <span className="font-semibold">{vehicle.is_new ? 'Mới' : 'Đã sử dụng'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Danh mục:</span>
                  <span className="font-semibold">{vehicle.category_id}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;