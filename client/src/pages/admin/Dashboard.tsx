import React from 'react';
import { motion } from 'framer-motion';
import {
  Truck,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { dashboardStats } from '../../lib/mockData';
import Card from '../../components/ui/Card';

const Dashboard: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const stats = [
    {
      title: 'Tổng xe',
      value: dashboardStats.totalVehicles,
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Xe có sẵn',
      value: dashboardStats.availableVehicles,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Đơn hàng',
      value: dashboardStats.totalOrders,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Doanh thu tháng',
      value: formatCurrency(dashboardStats.monthlyRevenue),
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      isLarge: true,
    },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống xe công trình</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold text-gray-900 ${stat.isLarge ? 'text-lg' : ''}`}>
                    {stat.value}
                  </p>
                  {stat.title === 'Doanh thu tháng' && (
                    <p className="text-sm text-green-600">
                      +{dashboardStats.revenueGrowth}% so với tháng trước
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Danh mục phổ biến</h3>
          <div className="space-y-4">
            {dashboardStats.topCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.count} xe</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{category.percentage}%</p>
                  <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 bg-yellow-400 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        
        {/* Recent Quotes */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Yêu cầu báo giá gần đây</h3>
          <div className="space-y-4">
            {dashboardStats.recentQuotes.map((quote, index) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{quote.customerName}</p>
                  <p className="text-sm text-gray-600">{quote.vehicleName}</p>
                  <p className="text-xs text-gray-500">{formatDate(quote.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      quote.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : quote.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : quote.status === 'quoted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {quote.status === 'pending' && 'Chờ xử lý'}
                    {quote.status === 'processing' && 'Đang xử lý'}
                    {quote.status === 'quoted' && 'Đã báo giá'}
                    {quote.status === 'closed' && 'Đã đóng'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;