import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowUpDown,
  Check,
  X,
  Image as ImageIcon
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { useAuthStore } from '../../stores/authStore';
import { BrandType } from '../../types/brandTypes';
import BrandsServices from '../../services/brandsServices';
import Cookies from 'js-cookie';

const brandsService = new BrandsServices();

interface BrandFormData {
  name: string;
  index: number;
}

const AdminBrands: React.FC = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  const { showSuccess, showError } = useToast();
  const { checkAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandType | null>(null);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof BrandType; direction: 'asc' | 'desc' } | null>({
    key: 'index',
    direction: 'asc'
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<BrandFormData>();

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await brandsService.getBrands();
      setBrands(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading brands:', error);
      showError('Lỗi tải dữ liệu', 'Không thể tải danh sách thương hiệu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBrand = async (data: BrandFormData) => {
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await brandsService.createBrand(accessToken || '', {
        name: data.name,
        index: data.index,
        is_deleted: false
      });
      showSuccess('Thành công', 'Thêm thương hiệu thành công');
      setShowAddModal(false);
      reset();
      await loadBrands();
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể thêm thương hiệu');
    }
  };

  const handleUpdateBrand = async (data: BrandFormData) => {
    if (!editingBrand?._id) return;
    
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await brandsService.updateBrand(editingBrand._id, {
        name: data.name,
        index: data.index,
        is_deleted: editingBrand.is_deleted
      }, accessToken || '');
      showSuccess('Thành công', 'Cập nhật thương hiệu thành công');
      setShowEditModal(false);
      setEditingBrand(null);
      await loadBrands();
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể cập nhật thương hiệu');
    }
  };

  const handleDeleteBrand = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thương hiệu này?')) return;
    
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await brandsService.deleteBrand(id, accessToken || '');
      showSuccess('Thành công', 'Xóa thương hiệu thành công');
      await loadBrands();
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể xóa thương hiệu');
    }
  };

  const handleSort = (key: keyof BrandType) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBrands = React.useMemo(() => {
    if (!sortConfig) return brands;
    
    return [...brands].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === undefined || bValue === undefined) return 0;
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [brands, sortConfig]);

  const filteredBrands = sortedBrands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (brand: BrandType) => {
    setEditingBrand(brand);
    reset({
      name: brand.name,
      index: brand.index
    });
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingBrand(null);
    reset();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Thương hiệu</h1>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm thương hiệu
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative">
            <Input
              icon={Search}
              type="text"
              placeholder="Tìm kiếm thương hiệu..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('index')}
                >
                  <div className="flex items-center">
                    STT
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Tên thương hiệu
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBrands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredBrands.map((brand) => (
                  <tr key={brand._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {brand.index}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        brand.is_deleted ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {brand.is_deleted ? 'Đã xóa' : 'Đang hoạt động'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEdit(brand)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => brand._id && handleDeleteBrand(brand._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Brand Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Thêm thương hiệu mới</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(handleAddBrand)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên thương hiệu <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className="w-full"
                  {...register('name', { required: 'Vui lòng nhập tên thương hiệu' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thứ tự hiển thị <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  className="w-full"
                  {...register('index', { 
                    required: 'Vui lòng nhập thứ tự hiển thị',
                    valueAsNumber: true
                  })}
                />
                {errors.index && (
                  <p className="mt-1 text-sm text-red-600">{errors.index.message}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Lưu
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Edit Brand Modal */}
      {showEditModal && editingBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Chỉnh sửa thương hiệu</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(handleUpdateBrand)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên thương hiệu <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className="w-full"
                  {...register('name', { required: 'Vui lòng nhập tên thương hiệu' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thứ tự hiển thị <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  className="w-full"
                  {...register('index', { 
                    required: 'Vui lòng nhập thứ tự hiển thị',
                    valueAsNumber: true
                  })}
                />
                {errors.index && (
                  <p className="mt-1 text-sm text-red-600">{errors.index.message}</p>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Cập nhật
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands;
