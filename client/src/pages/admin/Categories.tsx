import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Tag,
  Filter
} from 'lucide-react';
import { CategoryType } from '../../types/categoriesTypes';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import CategoriesServices from '../../services/categoriesServices';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { RESPONSE_CODE } from '../../constants/responseCode.constants';
import { useAuthStore } from '../../stores/authStore';

const categoriesServices = new CategoriesServices()

interface createForm {
  name: string
  index: number
}

const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true);
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await categoriesServices.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error loading categories:', error);
        toast.error('Không thể tải danh sách danh mục');
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createForm>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
    formState: { errors: editErrors },
  } = useForm<createForm>();
  
  const filteredCategories = (Array.isArray(categories) ? categories : []).filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  const handleDelete = async (id: string) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        toast.error('Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!');
        return;
      }
      
      // TODO: Implement deleteCategory service method
      const result = await categoriesServices.deleteCategory(id, Cookies.get('accessToken') || '');
      if (result.code == RESPONSE_CODE.DELETE_CATEGORY_SUCCESSFUL) {
        toast.success(result.message);
        const latest = await categoriesServices.getCategories();
        setCategories(Array.isArray(latest) ? latest : []);
      } else {
        toast.error('Xóa danh mục thất bại, vui lòng thử lại!');
      }
    } catch {
      toast.error('Có lỗi xảy ra khi xóa danh mục, vui lòng thử lại!');
    }
  };

  const onSubmit = async (category: createForm) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        toast.error('Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!');
        return;
      }
      const success = await categoriesServices.createCategory(category.name, category.index, Cookies.get('accessToken') || '');
      if (success.code == RESPONSE_CODE.CREATE_CATEGORY_SUCCESSFUL) {
        toast.success(success.message);
        const latest = await categoriesServices.getCategories();
        setCategories(Array.isArray(latest) ? latest : []);
        setShowAddModal(false);
        reset();
      } else {
        toast.error('Thêm danh mục thất bại, vui lòng thử lại!');
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  const onSubmitEdit = async (data: createForm) => {
    try {
      const isAuthenticated = await checkAuth(Cookies.get('accessToken') || '', Cookies.get('refreshToken') || '');
      if (!isAuthenticated) {
        toast.error('Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại!');
        return;
      }
      if (!editingCategory || !editingCategory._id) {
        toast.error('Không xác định được danh mục cần sửa.');
        return;
      }
      const result = await categoriesServices.updateCategory(
        editingCategory._id,
        data.name,
        data.index,
        Cookies.get('accessToken') || ''
      );
      if (result.code == RESPONSE_CODE.UPDATE_CATEGORY_SUCCESSFUL) {
        toast.success(result.message);
        const latest = await categoriesServices.getCategories();
        setCategories(Array.isArray(latest) ? latest : []);
        setShowEditModal(false);
        setEditingCategory(null);
        resetEdit();
      } else {
        toast.error('Cập nhật danh mục thất bại, vui lòng thử lại!');
      }
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  }
  
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
      
      {/* Search and Filters */}
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
          <div className="flex gap-2">
            <Button variant="outline" icon={Filter}>
              Lọc
            </Button>
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
              <p className="text-sm font-medium text-gray-600">Danh mục có độ ưu tiên cao</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(cat => cat.index <= 5).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Tag className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Danh mục mới nhất</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter(cat => {
                  if (!cat.created_at) return false;
                  const createdDate = new Date(cat.created_at);
                  const now = new Date();
                  const diffTime = Math.abs(now.getTime() - createdDate.getTime());
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Tag className="h-6 w-6 text-green-600" />
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
      
      {/* Categories Table */}
      {!loading && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Danh mục</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Độ ưu tiên</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Ngày tạo</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Ngày cập nhật</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category, index) => (
                  <motion.tr
                    key={category._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Tag className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{category.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        category.index <= 5 
                          ? 'bg-red-100 text-red-800' 
                          : category.index <= 10 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {category.index}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {category.created_at ? new Date(category.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {category.updated_at ? new Date(category.updated_at).toLocaleDateString('vi-VN') : 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Edit}
                          onClick={() => {
                            setEditingCategory(category);
                            setEditValue('name', category.name);
                            setEditValue('index', category.index);
                            setShowEditModal(true);
                          }}
                        >
                          Sửa
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Trash2}
                          onClick={() => category._id && handleDelete(category._id)}
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
          
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Không tìm thấy danh mục nào
              </h3>
              <p className="text-gray-500">
                Thử thay đổi từ khóa tìm kiếm hoặc thêm danh mục mới
              </p>
            </div>
          )}
        </Card>
      )}
      
      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thêm danh mục mới
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input 
                label="Tên danh mục" 
                placeholder="Nhập tên danh mục:" 
                {...register('name', {
                  required: 'Vui lòng nhập tên danh mục',
                  minLength: { value: 2, message: 'Tên quá ngắn' }
                })}
                error={errors.name?.message}
              />
              <Input 
                type='number' 
                label="Độ ưu tiên:" 
                placeholder="Độ ưu tiên"
                {...register('index', {
                  required: 'Vui lòng nhập độ ưu tiên',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Độ ưu tiên phải ≥ 0' }
                })}
                error={errors.index?.message as unknown as string}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                >
                  Hủy
                </Button>
                <Button type='submit' variant="primary">
                  Thêm danh mục
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sửa danh mục
            </h3>
            <form onSubmit={handleSubmitEdit(onSubmitEdit)} className="space-y-4">
              <Input 
                label="Tên danh mục" 
                placeholder="Nhập tên danh mục:" 
                {...registerEdit('name', {
                  required: 'Vui lòng nhập tên danh mục',
                  minLength: { value: 2, message: 'Tên quá ngắn' }
                })}
                error={editErrors.name?.message}
              />
              <Input 
                type='number' 
                label="Độ ưu tiên:" 
                placeholder="Độ ưu tiên"
                {...registerEdit('index', {
                  required: 'Vui lòng nhập độ ưu tiên',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Độ ưu tiên phải ≥ 0' }
                })}
                error={editErrors.index?.message as unknown as string}
              />
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCategory(null);
                    resetEdit();
                  }}
                >
                  Hủy
                </Button>
                <Button type='submit' variant="primary">
                  Lưu thay đổi
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;