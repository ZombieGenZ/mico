import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Heart, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { categories } from '../lib/mockData'; // replaced by API-driven categories
import { useVehicleStore } from '../stores/vehicleStore';
import Card from '../components/ui/Card'; 
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import BrandsServices from '../services/brandsServices';
import CategoriesServices from '../services/categoriesServices';


const brandServices = new BrandsServices();
const categoriesServices = new CategoriesServices();

const Vehicles: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brandNames, setBrandNames] = useState<Record<string, string>>({});
  const [categoryNames, setCategoryNames] = useState<Record<string, string>>({});
  
  const {
    searchTerm,
    selectedCategory,
    selectedBrand,
    sortBy,
    setSearchTerm,
    setSelectedCategory,
    setSelectedBrand,
    setSortBy,
    getFilteredVehicles,
    fetchVehicles,
  } = useVehicleStore();
  
  // Load vehicles from API when component mounts
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        await fetchVehicles();
      } catch (error) {
        console.error('Error loading vehicles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadVehicles();
  }, [fetchVehicles]);
  
  // Load brand names when component mounts
  useEffect(() => {
    const loadBrandNames = async () => {
      try {
        const brandsData = await brandServices.getBrands();
        const brandMap: Record<string, string> = {};
        brandsData.forEach(brand => {
          if (brand._id) {
            brandMap[brand._id] = brand.name;
          }
        });
        setBrandNames(brandMap);
      } catch (error) {
        console.error('Error loading brand names:', error);
      }
    };
    
    loadBrandNames();
  }, []);

  // Load category names when component mounts
  useEffect(() => {
    const loadCategoryNames = async () => {
      try {
        const categoriesData = await categoriesServices.getCategories();
        const categoryMap: Record<string, string> = {};
        categoriesData.forEach((category: { _id?: string; name: string }) => {
          if (category._id) {
            categoryMap[category._id] = category.name;
          }
        });
        setCategoryNames(categoryMap);
      } catch (error) {
        console.error('Error loading category names:', error);
      }
    };
    loadCategoryNames();
  }, []);
  
  const filteredVehicles = getFilteredVehicles();
  
  // Get unique brands from loaded brand names
  const brands = Object.keys(brandNames);
  
  // Get categories from loaded category names
  const vehicleCategories = Object.keys(categoryNames);
  
  // Helper function to get category name by ID (sync from state)
  const getCategoryName = (categoryId: string): string => {
    return categoryNames[categoryId] || categoryId;
  };
  
  // Helper function to get brand name by ID (sync from state)
  const getBrandName = (brandId: string): string => {
    return brandNames[brandId] || brandId;
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
                placeholder="Tìm kiếm theo tên xe hoặc mô tả..."
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
                    {vehicleCategories.map((categoryId) => (
                      <button
                        key={categoryId}
                        onClick={() => setSelectedCategory(categoryId)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === categoryId
                            ? 'bg-yellow-400 text-slate-900'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {getCategoryName(categoryId)}
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
                    {brands.map((brandId) => (
                      <button
                        key={brandId}
                        onClick={() => setSelectedBrand(brandId)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedBrand === brandId
                            ? 'bg-yellow-400 text-slate-900'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        {getBrandName(brandId)}
                      </button>
                    ))}
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
                  <option value="title">Sắp xếp theo tên</option>
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
            
            {/* Loading State */}
            {loading && (
              <Card className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-gray-500 text-lg">Đang tải dữ liệu...</p>
              </Card>
            )}
            
            {/* Vehicle Grid */}
            {!loading && filteredVehicles.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle._id}
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
                            src={vehicle.image && vehicle.image[0] ? vehicle.image[0].url : 'https://via.placeholder.com/400x300?text=Vehicle+Image'}
                            alt={vehicle.title}
                            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                              viewMode === 'list' ? 'w-full h-48' : 'w-full h-64'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                vehicle.is_new
                                  ? 'bg-green-500 text-white'
                                  : 'bg-yellow-400 text-slate-900'
                              }`}
                            >
                              {vehicle.is_new ? 'Mới' : 'Đã sử dụng'}
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
                            {vehicle.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {vehicle.created_at ? new Date(vehicle.created_at).getFullYear() : 'N/A'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {vehicle.subtitle}
                        </p>
                        
                        {/* Technical Information */}
                        {vehicle.technical_information && vehicle.technical_information.length > 0 && (
                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            {vehicle.technical_information.slice(0, 2).map((info, idx) => (
                              <div key={idx}>
                                <span className="text-gray-500">{info.name}:</span>
                                <p className="font-semibold text-slate-900">{info.value}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Features */}
                        {vehicle.features && vehicle.features.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {vehicle.features.slice(0, 3).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                >
                                  {feature.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center border-t pt-4">
                          <div>
                            <p className="text-2xl font-bold text-yellow-500">
                              {vehicle.in_stock ? 'Có sẵn' : 'Hết hàng'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {getCategoryName(vehicle.category_id)} • {getBrandName(vehicle.brand_id)}
                            </p>
                          </div>
                          <Link to={`/vehicles/${vehicle._id}`}>
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
            ) : !loading ? (
              <Card className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy xe công trình phù hợp với tiêu chí tìm kiếm
                </p>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;