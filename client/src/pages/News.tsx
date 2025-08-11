import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  Clock,
  Eye
} from 'lucide-react';
import { newsItems } from '../lib/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    'Tất cả',
    'Tin tức ngành',
    'Review sản phẩm',
    'Hướng dẫn',
    'Khuyến mãi',
    'Sự kiện'
  ];
  
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tất cả' || 
                           item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tin tức & <span className="text-yellow-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Cập nhật thông tin mới nhất về ngành xe công trình và các sản phẩm
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="text-lg py-4"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card className="sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Danh mục</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'Tất cả' ? '' : category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      (category === 'Tất cả' && !selectedCategory) || selectedCategory === category
                        ? 'bg-yellow-400 text-slate-900'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Recent Posts */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Bài viết gần đây</h3>
                <div className="space-y-4">
                  {newsItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {formatDate(item.publishDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured News */}
            {featuredNews.length > 0 && !searchTerm && !selectedCategory && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Tin nổi bật</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card padding="none" className="overflow-hidden group h-full">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="bg-yellow-400 text-slate-900 px-3 py-1 text-xs font-semibold rounded-full">
                              Nổi bật
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <span className="bg-black/50 px-2 py-1 text-xs rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(item.publishDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{item.author}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-yellow-500 transition-colors">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {item.excerpt}
                          </p>
                          
                          <Link to={`/news/${item.id}`}>
                            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                              Đọc thêm
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Regular News */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchTerm || selectedCategory ? 'Kết quả tìm kiếm' : 'Tất cả tin tức'}
                </h2>
                <p className="text-gray-600">
                  {filteredNews.length} bài viết
                </p>
              </div>
              
              {filteredNews.length > 0 ? (
                <div className="space-y-6">
                  {regularNews.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden group">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="md:w-2/3 p-6">
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center space-x-1">
                                <Tag className="h-4 w-4" />
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                  {item.category}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(item.publishDate)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <User className="h-4 w-4" />
                                <span>{item.author}</span>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-yellow-500 transition-colors">
                              {item.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {item.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <Link to={`/news/${item.id}`}>
                                <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                                  Đọc thêm
                                </Button>
                              </Link>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>1.2k lượt xem</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>5 phút đọc</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Không tìm thấy bài viết
                  </h3>
                  <p className="text-gray-500">
                    Thử thay đổi từ khóa tìm kiếm hoặc danh mục
                  </p>
                </Card>
              )}
            </div>
            
            {/* Load More */}
            {regularNews.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Xem thêm bài viết
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;