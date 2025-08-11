import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  FileText,
  TrendingUp,
  Star
} from 'lucide-react';
import { newsItems } from '../../lib/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminNews: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = ['Tin tức ngành', 'Review sản phẩm', 'Hướng dẫn', 'Khuyến mãi'];
  
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      console.log('Delete news:', id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tức</h1>
          <p className="text-gray-600">Quản lý bài viết và tin tức</p>
        </div>
        <Button variant="primary" icon={Plus}>
          Thêm bài viết
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </Card>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng bài viết</p>
              <p className="text-2xl font-bold text-gray-900">{newsItems.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bài nổi bật</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsItems.filter(item => item.featured).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lượt xem</p>
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tăng trưởng</p>
              <p className="text-2xl font-bold text-gray-900">+15%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* News List */}
      <Card>
        <div className="space-y-4">
          {filteredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Nổi bật
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(item.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>1.2K lượt xem</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
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
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc hoặc thêm bài viết mới
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminNews;