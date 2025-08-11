import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag,
  TrendingUp,
  Package
} from 'lucide-react';
import { categories } from '../../lib/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      // Handle delete logic here
      console.log('Delete category:', id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục</h1>
          <p className="text-gray-600">Quản lý danh mục xe công trình</p>
        </div>
        <Button 
          variant="primary" 
          icon={Plus}
          onClick={() => setShowAddModal(true)}
        >
          Thêm danh mục
        </Button>
      </div>
      
      {/* Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
        </div>
      </Card>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng danh mục</p>
              <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Tag className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.vehicleCount, 0)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Danh mục phổ biến</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.max(...categories.map(c => c.vehicleCount))}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="group hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Tag className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" icon={Edit}>
                    Sửa
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={Trash2}
                    onClick={() => handleDelete(category.id)}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4 text-sm">
                {category.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {category.vehicleCount} xe
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {category.slug}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Độ phổ biến</span>
                  <span>{Math.round((category.vehicleCount / 50) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((category.vehicleCount / 50) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <Card className="text-center py-12">
          <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Không tìm thấy danh mục nào
          </h3>
          <p className="text-gray-500">
            Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới
          </p>
        </Card>
      )}
      
      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thêm danh mục mới
            </h3>
            <div className="space-y-4">
              <Input label="Tên danh mục" placeholder="Nhập tên danh mục" />
              <Input label="Slug" placeholder="ten-danh-muc" />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none resize-none"
                  placeholder="Mô tả danh mục..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Hủy
              </Button>
              <Button variant="primary">
                Thêm danh mục
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;