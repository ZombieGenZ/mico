import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Calculator, 
  User, 
  Mail, 
  Phone, 
  Building, 
  MessageSquare,
  Calendar,
  Truck,
  Send,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { vehicles, categories } from '../lib/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface QuoteForm {
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  vehicleId: string;
  serviceType: 'buy' | 'rent';
  duration?: string;
  message: string;
}

const Quote: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteForm>();
  
  const serviceType = watch('serviceType');
  const vehicleId = watch('vehicleId');
  
  React.useEffect(() => {
    if (vehicleId) {
      const vehicle = vehicles.find(v => v.id === parseInt(vehicleId));
      setSelectedVehicle(vehicle);
    }
  }, [vehicleId]);
  
  const onSubmit = async (data: QuoteForm) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Yêu cầu báo giá đã được gửi thành công!');
      setStep(4); // Success step
      reset();
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const steps = [
    { number: 1, title: 'Chọn xe', icon: Truck },
    { number: 2, title: 'Thông tin', icon: User },
    { number: 3, title: 'Xác nhận', icon: CheckCircle },
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
            <div className="bg-yellow-400 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Calculator className="h-10 w-10 text-slate-900" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Yêu cầu <span className="text-yellow-400">báo giá</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Nhận báo giá chi tiết và tư vấn miễn phí từ chuyên gia
            </p>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        {step < 4 && (
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {steps.map((stepItem, index) => {
                const IconComponent = stepItem.icon;
                const isActive = step === stepItem.number;
                const isCompleted = step > stepItem.number;
                
                return (
                  <div key={stepItem.number} className="flex items-center">
                    <div className={`flex items-center space-x-3 ${
                      isActive ? 'text-yellow-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                        isActive 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : isCompleted 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <IconComponent className="h-6 w-6" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <p className="font-semibold">{stepItem.title}</p>
                        <p className="text-sm">Bước {stepItem.number}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        step > stepItem.number ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          {/* Step 1: Vehicle Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Chọn xe công trình
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {vehicles.slice(0, 6).map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        vehicleId === vehicle.id.toString()
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        // Set the vehicle ID in the form
                        const event = { target: { value: vehicle.id.toString() } };
                        register('vehicleId').onChange(event);
                      }}
                    >
                      <input
                        type="radio"
                        value={vehicle.id}
                        {...register('vehicleId', { required: 'Vui lòng chọn xe' })}
                        className="sr-only"
                      />
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {vehicle.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {vehicle.brand} • {vehicle.year}
                      </p>
                      <p className="text-lg font-bold text-yellow-500">
                        {formatPrice(vehicle.price)}
                      </p>
                      {vehicle.rentPrice && (
                        <p className="text-sm text-gray-500">
                          Thuê: {formatPrice(vehicle.rentPrice)}/tháng
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                
                {errors.vehicleId && (
                  <p className="text-red-600 text-sm mb-4">{errors.vehicleId.message}</p>
                )}
                
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => vehicleId && setStep(2)}
                    disabled={!vehicleId}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Step 2: Customer Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Thông tin liên hệ
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Họ và tên *"
                    icon={User}
                    placeholder="Nhập họ và tên"
                    {...register('customerName', {
                      required: 'Vui lòng nhập họ và tên',
                    })}
                    error={errors.customerName?.message}
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
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Loại dịch vụ *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      serviceType === 'buy' 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        value="buy"
                        {...register('serviceType', { required: 'Vui lòng chọn loại dịch vụ' })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="bg-green-100 w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Truck className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Mua xe</h3>
                        <p className="text-sm text-gray-600">Sở hữu vĩnh viễn</p>
                      </div>
                    </label>
                    
                    <label className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      serviceType === 'rent' 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        value="rent"
                        {...register('serviceType', { required: 'Vui lòng chọn loại dịch vụ' })}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="bg-blue-100 w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Thuê xe</h3>
                        <p className="text-sm text-gray-600">Theo thời gian</p>
                      </div>
                    </label>
                  </div>
                  {errors.serviceType && (
                    <p className="text-red-600 text-sm mt-2">{errors.serviceType.message}</p>
                  )}
                </div>
                
                {serviceType === 'rent' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thời gian thuê
                    </label>
                    <select
                      {...register('duration')}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none"
                    >
                      <option value="">Chọn thời gian thuê</option>
                      <option value="1-week">1 tuần</option>
                      <option value="1-month">1 tháng</option>
                      <option value="3-months">3 tháng</option>
                      <option value="6-months">6 tháng</option>
                      <option value="1-year">1 năm</option>
                      <option value="custom">Thời gian khác</option>
                    </select>
                  </div>
                )}
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ghi chú
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Nhập yêu cầu đặc biệt hoặc thông tin bổ sung..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none resize-none"
                    {...register('message')}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => setStep(3)}
                  >
                    Xem lại
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Step 3: Confirmation */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Xác nhận thông tin
                </h2>
                
                {selectedVehicle && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Xe đã chọn
                    </h3>
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedVehicle.images[0]}
                        alt={selectedVehicle.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {selectedVehicle.name}
                        </h4>
                        <p className="text-gray-600">
                          {selectedVehicle.brand} • {selectedVehicle.year}
                        </p>
                        <p className="text-lg font-bold text-yellow-500">
                          {formatPrice(selectedVehicle.price)}
                        </p>
                        {serviceType === 'rent' && selectedVehicle.rentPrice && (
                          <p className="text-sm text-gray-500">
                            Thuê: {formatPrice(selectedVehicle.rentPrice)}/tháng
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Thông tin khách hàng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Họ tên:</span>
                      <p className="font-semibold">{watch('customerName')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Điện thoại:</span>
                      <p className="font-semibold">{watch('phone')}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p className="font-semibold">{watch('email')}</p>
                    </div>
                    {watch('company') && (
                      <div>
                        <span className="text-gray-500">Công ty:</span>
                        <p className="font-semibold">{watch('company')}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Dịch vụ:</span>
                      <p className="font-semibold">
                        {serviceType === 'buy' ? 'Mua xe' : 'Thuê xe'}
                      </p>
                    </div>
                    {serviceType === 'rent' && watch('duration') && (
                      <div>
                        <span className="text-gray-500">Thời gian:</span>
                        <p className="font-semibold">{watch('duration')}</p>
                      </div>
                    )}
                  </div>
                  {watch('message') && (
                    <div className="mt-4">
                      <span className="text-gray-500">Ghi chú:</span>
                      <p className="font-semibold">{watch('message')}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    icon={Send}
                  >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
          
          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Gửi yêu cầu thành công!
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Chúng tôi đã nhận được yêu cầu báo giá của bạn và sẽ liên hệ trong vòng 24 giờ.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-slate-900 mb-2">Bước tiếp theo:</h3>
                  <ul className="text-left text-gray-600 space-y-1">
                    <li>• Chuyên viên sẽ gọi điện xác nhận thông tin</li>
                    <li>• Gửi báo giá chi tiết qua email</li>
                    <li>• Tư vấn và hỗ trợ ký hợp đồng</li>
                    <li>• Giao xe và hướng dẫn sử dụng</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      setStep(1);
                      reset();
                      setSelectedVehicle(null);
                    }}
                  >
                    Gửi yêu cầu khác
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    icon={Phone}
                  >
                    Gọi ngay: 0123.456.789
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Quote;