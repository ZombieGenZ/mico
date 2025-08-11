import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../lib/mockData';
import { useVehicleStore } from '../stores/vehicleStore';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Vehicles: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const {
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setSelectedBrand,
    setPriceRange,
    setSortBy,
    getFilteredVehicles,
  } = useVehicleStore();
  
  const filteredVehicles = getFilteredVehicles();
  const brands = Array.from(new Set(filteredVehicles.map(v => v.brand))).sort();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
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
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Xe công trình <span className="text-yellow-400">chất lượng</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Khám phá bộ sưu tập xe công trình đa dạng với giá cả cạnh tranh
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên xe hoặc thương hiệu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={Search}
                className="text-lg py-4"
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <Card className="sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Bộ lọc</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>
              
              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Danh mục</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedCategory
                          ? 'bg-yellow-400 text-slate-900'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      Tất cả ({filteredVehicles.length})
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-yellow-400 text-slate-900'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {category.name} ({category.vehicleCount})
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Brands */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Thương hiệu</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedBrand('')}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !selectedBrand
                          ? 'bg-yellow-400 text-slate-900'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      Tất cả
                    </button>
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedBrand === brand
                            ? 'bg-yellow-400 text-slate-900'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-slate-900 mb-3">Khoảng giá</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000000000"
                      step="100000000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0đ</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-gray-600">
                  Hiển thị {filteredVehicles.length} xe công trình
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="name">Sắp xếp theo tên</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="year">Năm sản xuất</option>
                </select>
                
                {/* View Mode */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-yellow-500 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-yellow-500 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className={`overflow-hidden group ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                      padding="none"
                    >
                      <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                        <div className="relative">
                          <img
                            src={vehicle.images[0]}
                            alt={vehicle.name}
                            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                              viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                vehicle.condition === 'new'
                                  ? 'bg-green-500 text-white'
                                  : 'bg-yellow-400 text-slate-900'
                              }`}
                            >
                              {vehicle.condition === 'new' ? 'Mới' : 'Đã sử dụng'}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200">
                              <Heart className="h-4 w-4" />
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-yellow-400 hover:text-slate-900 transition-all duration-200">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-500 transition-colors duration-200">
                            {vehicle.name}
                          </h3>
                          <span className="text-sm text-gray-500">{vehicle.year}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {vehicle.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="text-gray-500">Công suất:</span>
                            <p className="font-semibold text-slate-900">{vehicle.specs.power}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Trọng lượng:</span>
                            <p className="font-semibold text-slate-900">{vehicle.specs.weight}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center border-t pt-4">
                          <div>
                            <p className="text-2xl font-bold text-yellow-500">
                              {formatPrice(vehicle.price)}
                            </p>
                            {vehicle.rentPrice && (
                              <p className="text-sm text-gray-500">
                                Thuê: {formatPrice(vehicle.rentPrice)}/tháng
                              </p>
                            )}
                          </div>
                          <Link to={`/vehicles/${vehicle.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={ArrowRight}
                              iconPosition="right"
                            >
                              Chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy xe công trình phù hợp với tiêu chí tìm kiếm
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;