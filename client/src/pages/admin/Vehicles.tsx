import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  Truck,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useVehicleStore } from '../../stores/vehicleStore';
import { categories } from '../../lib/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminVehicles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const { vehicles, deleteVehicle } = useVehicleStore();
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || vehicle.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa xe này?')) {
      deleteVehicle(id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý xe công trình</h1>
          <p className="text-gray-600">Quản lý danh sách xe công trình</p>
        </div>
        <Button variant="primary" icon={Plus}>
          Thêm xe mới
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên xe hoặc thương hiệu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <Button variant="outline" icon={Filter}>
              Lọc
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng xe</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Xe có sẵn</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.available).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Xe nổi bật</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.featured).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(vehicles.reduce((sum, v) => sum + v.price, 0))}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Vehicle List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Xe</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Danh mục</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Giá bán</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Năm</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Trạng thái</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <motion.tr
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={vehicle.images[0]}
                        alt={vehicle.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{vehicle.name}</p>
                        <p className="text-sm text-gray-500">{vehicle.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {categories.find(c => c.slug === vehicle.category)?.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">
                    {formatPrice(vehicle.price)}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{vehicle.year}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        vehicle.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.available ? 'Có sẵn' : 'Đã bán'}
                      </span>
                      {vehicle.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Nổi bật
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" icon={Eye}>
                        Xem
                      </Button>
                      <Button variant="ghost" size="sm" icon={Edit}>
                        Sửa
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        icon={Trash2}
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredVehicles.length === 0 && (
          <div className="text-center py-12">
            <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Không tìm thấy xe nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc hoặc thêm xe mới
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminVehicles;