import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Truck,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useVehicleStore } from '../../stores/vehicleStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import VehicleServices from '../../services/vehicleServices';
import { Vehicle, TechnicalInformationType, Features, CreateUpdateVehicle } from '../../types/vehicleTypes';
import VehicleFormModal from '../../components/admin/VehicleFormModal';
import { useToast } from '../../contexts/ToastContext';
import Cookies from 'js-cookie';
import { RESPONSE_CODE } from '../../constants/responseCode.constants';
import { useAuthStore } from '../../stores/authStore';
import CategoriesServices from '../../services/categoriesServices';
import { CategoryType } from '../../types/categoriesTypes';

const AdminVehicles: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const { vehicles, deleteVehicle, fetchVehicles } = useVehicleStore();
  const { checkAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const vehicleService = new VehicleServices();
  const categoriesService = new CategoriesServices();
  
  // Load vehicles and categories from API when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load vehicles using store method (this will replace existing vehicles)
        await fetchVehicles();
        
        // Load categories
        const categoriesData = await categoriesService.getCategories();
        setCategories(categoriesData);
        
      } catch (error) {
        console.error('Error loading data:', error);
        showError('Lỗi tải dữ liệu', 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [fetchVehicles]);
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || vehicle.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Helper function to get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat: CategoryType) => cat._id === categoryId);
    return category?.name || categoryId;
  };
  
  // Helper function to get brand name by ID
  const getBrandName = (brandId: string) => {
    // For now, return brandId as brand name since we don't have brand data
    return brandId;
  };
  
  const handleDelete = async (id: string) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        showError('Lỗi xác thực', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return;
      }

      // Show confirmation dialog
      if (window.confirm('Bạn có chắc chắn muốn xóa xe này?')) {
        try {
          setLoading(true);
          await vehicleService.deleteVehicle(id, Cookies.get('accessToken') || '');
          deleteVehicle(id);
          showSuccess('Thành công!', 'Xóa xe thành công!');
        } catch (error) {
          console.error('Error deleting vehicle:', error);
          showError('Lỗi xóa xe', 'Có lỗi xảy ra khi xóa xe, vui lòng thử lại!');
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error in handleDelete:', error);
      showError('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại!');
    }
  };
  
  const handleAddVehicle = async (vehicle: CreateUpdateVehicle) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        showError('Lỗi xác thực', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return;
      }

      // No need for loading toast, using loading state
      
      // Prepare data for API call
      const technical_informations: TechnicalInformationType[] = vehicle.technical_informations || [];
      const features: Features[] = vehicle.features || [];
      const preview: File[] = Array.isArray(vehicle.preview) && vehicle.preview.length > 0 && vehicle.preview[0] instanceof File 
        ? vehicle.preview as File[] 
        : [];
      
      const result = await vehicleService.createVehicle(
        vehicle.title,
        vehicle.subtitle,
        technical_informations,
        features,
        vehicle.category_id,
        vehicle.brand_id,
        vehicle.in_stock,
        vehicle.is_new,
        vehicle.is_used,
        preview,
        Cookies.get('accessToken') || ''
      );

      if (result.code === RESPONSE_CODE.CREATE_PRODUCT_SUCCESSFUL) {
        // Reload vehicles from server to get updated data
        await fetchVehicles();
        setIsModalOpen(false);
        showSuccess('Thành công!', result.message || 'Thêm xe thành công!');
      } else {
        showError('Lỗi thêm xe', result.message || 'Thêm xe thất bại, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      showError('Lỗi', 'Có lỗi xảy ra khi thêm xe, vui lòng thử lại!');
    }
  };

  const handleEditVehicle = async (vehicle: CreateUpdateVehicle) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        showError('Lỗi xác thực', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return;
      }

      if (!editingVehicle || !editingVehicle._id) {
        showError('Lỗi', 'Không xác định được xe cần sửa.');
        return;
      }

      // No need for loading toast, using loading state
      
      // Prepare data for API call
      const technical_information: TechnicalInformationType[] = vehicle.technical_informations || [];
      const features: Features[] = vehicle.features || [];
      const preview: File[] = Array.isArray(vehicle.preview) && vehicle.preview.length > 0 && vehicle.preview[0] instanceof File 
        ? vehicle.preview as File[] 
        : [];
      
      const result = await vehicleService.updateVehicle(
        editingVehicle._id,
        vehicle.title,
        vehicle.subtitle,
        technical_information,
        features,
        vehicle.category_id,
        vehicle.brand_id,
        vehicle.in_stock,
        vehicle.is_new,
        vehicle.is_used,
        Cookies.get('accessToken') || '',
        preview.length > 0 ? preview : undefined
      );

      if (result.code === RESPONSE_CODE.UPDATE_PRODUCT_SUCCESSFUL) {
        // Update local store
        // Note: You might need to implement updateVehicle in the store
        showSuccess('Thành công!', result.message || 'Cập nhật xe thành công!');
        setShowEditModal(false);
        setEditingVehicle(null);
        await fetchVehicles();
      } else {
        showError('Lỗi cập nhật', result.message || 'Cập nhật xe thất bại, vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      showError('Lỗi', 'Có lỗi xảy ra khi cập nhật xe, vui lòng thử lại!');
    }
  };

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setShowEditModal(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý xe công trình</h1>
          <p className="text-gray-600">Quản lý danh sách xe công trình</p>
        </div>
        <Button 
          variant="primary" 
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Thêm xe mới
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên xe hoặc mô tả..."
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
              {Array.from(new Set(vehicles.map(v => v.category_id).filter(Boolean))).map((categoryId) => (
                <option key={categoryId} value={categoryId}>
                  {getCategoryName(categoryId)}
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
                {vehicles.filter(v => v.in_stock).length}
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
              <p className="text-sm font-medium text-gray-600">Xe mới</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.is_new).length}
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
              <p className="text-sm font-medium text-gray-600">Xe đã sử dụng</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.is_used).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Loading State */}
      {loading && (
        <Card className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Đang tải dữ liệu...</p>
        </Card>
      )}
      
      {/* Vehicle List */}
      {!loading && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Xe</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Danh mục</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Thương hiệu</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Ngày tạo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={vehicle.image && vehicle.image[0] ? vehicle.image[0].url : 'https://via.placeholder.com/48x48?text=Vehicle'}
                          alt={vehicle.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{vehicle.title}</p>
                          <p className="text-sm text-gray-500">{vehicle.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        {getCategoryName(vehicle.category_id)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {getBrandName(vehicle.brand_id)}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {vehicle.created_at ? new Date(vehicle.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          vehicle.in_stock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {vehicle.in_stock ? 'Có sẵn' : 'Hết hàng'}
                        </span>
                        {vehicle.is_new && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Mới
                          </span>
                        )}
                        {vehicle.is_used && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Đã sử dụng
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" icon={Eye}>
                          Xem
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Edit}
                          onClick={() => openEditModal(vehicle)}
                        >
                          Sửa
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Trash2}
                          onClick={() => handleDelete(vehicle._id || '')}
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
      )}
      
      {/* Modal thêm xe mới */}
      <VehicleFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddVehicle}
      />

      {/* Modal sửa xe */}
      {showEditModal && editingVehicle && (
        <VehicleFormModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingVehicle(null);
          }}
          onSubmit={handleEditVehicle}
          vehicle={editingVehicle}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default AdminVehicles;