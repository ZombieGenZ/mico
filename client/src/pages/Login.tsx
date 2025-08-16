import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { ROUTES, DEMO_CREDENTIALS } from '../lib/constants';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();
  
  const onSubmit = async (data: LoginForm) => {
    try {
      const success = await login(data.email, data.password);
      if (success) {
        toast.success('Đăng nhập thành công!');
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else {
        toast.error('Email hoặc mật khẩu không chính xác!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to={ROUTES.HOME} className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-white text-orange-600 p-2 rounded-lg shadow-md">
              <span className="font-bold text-lg">XE</span>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-white">XE CÔNG TRÌNH VN</h1>
              <p className="text-xs text-orange-100">Đại lý xe công trình uy tín</p>
            </div>
          </Link>
        </div>
        
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Đăng nhập</h2>
            <p className="text-gray-600">Đăng nhập vào hệ thống quản trị</p>
          </div>
          
          {/* Demo Credentials */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-400 w-5 h-5 rounded-full mr-2"></div>
              Thông tin demo:
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>Email:</strong> {DEMO_CREDENTIALS.email}</p>
              <p><strong>Mật khẩu:</strong> {DEMO_CREDENTIALS.password}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              icon={Mail}
              placeholder="Nhập email của bạn"
              className="focus:border-orange-400 focus:ring-orange-400/20"
              {...register('email', {
                required: 'Vui lòng nhập email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email không hợp lệ',
                },
              })}
              error={errors.email?.message}
            />
            
            <div className="relative">
              <Input
                label="Mật khẩu"
                type={showPassword ? 'text' : 'password'}
                icon={Lock}
                placeholder="Nhập mật khẩu của bạn"
                className="focus:border-orange-400 focus:ring-orange-400/20"
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu phải có ít nhất 6 ký tự',
                  },
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
              loading={isSubmitting}
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <Link
              to={ROUTES.HOME}
              className="text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </Card>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-400/20 rounded-full blur-xl"></div>
      </motion.div>
    </div>
  );
};

export default Login;