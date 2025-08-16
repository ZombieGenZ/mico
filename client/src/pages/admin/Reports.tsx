import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingBag,
  Truck,
  BarChart3,
  PieChart,
  LineChart,
  Filter
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  
  const periods = [
    { value: 'week', label: 'Tuần này' },
    { value: 'month', label: 'Tháng này' },
    { value: 'quarter', label: 'Quý này' },
    { value: 'year', label: 'Năm này' },
    { value: 'custom', label: 'Tùy chỉnh' }
  ];
  
  const reportTypes = [
    { value: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { value: 'sales', label: 'Doanh số', icon: DollarSign },
    { value: 'customers', label: 'Khách hàng', icon: Users },
    { value: 'vehicles', label: 'Xe công trình', icon: Truck },
    { value: 'quotes', label: 'Báo giá', icon: ShoppingBag }
  ];
  
  const overviewStats = [
    {
      title: 'Tổng doanh thu',
      value: '15.6 tỷ VNĐ',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Đơn hàng mới',
      value: '89',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Khách hàng mới',
      value: '24',
      change: '-3.1%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Xe đã bán',
      value: '156',
      change: '+15.7%',
      trend: 'up',
      icon: Truck,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];
  
  const salesData = [
    { month: 'T1', sales: 1200000000, orders: 45 },
    { month: 'T2', sales: 1500000000, orders: 52 },
    { month: 'T3', sales: 1800000000, orders: 61 },
    { month: 'T4', sales: 1400000000, orders: 48 },
    { month: 'T5', sales: 2100000000, orders: 73 },
    { month: 'T6', sales: 1900000000, orders: 67 }
  ];
  
  const topVehicles = [
    { name: 'Máy xúc Komatsu PC200-8', sold: 12, revenue: 3000000000 },
    { name: 'Xe tải Hino 15 tấn', sold: 8, revenue: 1440000000 },
    { name: 'Cần cẩu Tadano GT-550E', sold: 5, revenue: 2250000000 },
    { name: 'Máy ủi Caterpillar D6T', sold: 7, revenue: 2240000000 },
    { name: 'Xe lu Dynapac CA2500D', sold: 6, revenue: 720000000 }
  ];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
          <p className="text-gray-600">Phân tích dữ liệu kinh doanh và hiệu suất</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" icon={Filter}>
            Bộ lọc
          </Button>
          <Button variant="primary" icon={Download}>
            Xuất báo cáo
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại báo cáo
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {reportTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSelectedReport(type.value)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedReport === type.value
                        ? 'bg-yellow-400 text-slate-900'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>
      
      {/* Overview Stats */}
      {selectedReport === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => {
              const IconComponent = stat.icon;
              
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <IconComponent className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Doanh số theo tháng</h3>
                <LineChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={data.month} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-yellow-600">{data.month}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(data.sales)}</p>
                        <p className="text-sm text-gray-500">{data.orders} đơn hàng</p>
                      </div>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-yellow-400 rounded-full"
                        style={{ width: `${(data.sales / 2500000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Top Vehicles */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Xe bán chạy nhất</h3>
                <PieChart className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {topVehicles.map((vehicle, index) => (
                  <div key={vehicle.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{vehicle.name}</p>
                        <p className="text-xs text-gray-500">{vehicle.sold} xe đã bán</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">
                        {formatCurrency(vehicle.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
      
      {/* Sales Report */}
      {selectedReport === 'sales' && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Báo cáo doanh số chi tiết</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tháng</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Doanh thu</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Đơn hàng</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Trung bình/đơn</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tăng trưởng</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((data, index) => {
                  const avgOrder = data.sales / data.orders;
                  const growth = index > 0 ? ((data.sales - salesData[index - 1].sales) / salesData[index - 1].sales * 100) : 0;
                  
                  return (
                    <tr key={data.month} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{data.month}</td>
                      <td className="py-3 px-4">{formatCurrency(data.sales)}</td>
                      <td className="py-3 px-4">{data.orders}</td>
                      <td className="py-3 px-4">{formatCurrency(avgOrder)}</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                          {Math.abs(growth).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      
      {/* Other report types placeholder */}
      {['customers', 'vehicles', 'quotes'].includes(selectedReport) && (
        <Card>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Báo cáo {reportTypes.find(r => r.value === selectedReport)?.label}
            </h3>
            <p className="text-gray-500">
              Tính năng đang được phát triển...
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminReports;