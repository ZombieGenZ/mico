import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ListOrdered,
  ArrowUpDown,
  Check,
  X
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { useAuthStore } from '../../stores/authStore';
import { TopicType } from '../../types/topicType';
import TopicsServices from '../../services/topicsServices';
import Cookies from 'js-cookie';

const topicsService = new TopicsServices();

interface TopicFormData {
  name: string;
  index: number;
}

const AdminTopics: React.FC = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  const { showSuccess, showError } = useToast();
  const { checkAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicType | null>(null);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TopicType; direction: 'asc' | 'desc' } | null>({
    key: 'index',
    direction: 'asc'
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TopicFormData>();

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await topicsService.getTopics();
      setTopics(data || []);
    } catch (error) {
      console.error('Error loading topics:', error);
      showError('Lỗi tải dữ liệu', 'Không thể tải danh sách chủ đề');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async (data: TopicFormData) => {
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await topicsService.createTopic({
        name: data.name,
        index: data.index,
      }, accessToken || '');
      await loadTopics();
      showSuccess('Thành công', 'Thêm chủ đề thành công');
      setShowAddModal(false);
      reset();
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể thêm chủ đề');
    }
  };

  const handleUpdateTopic = async (data: TopicFormData) => {
    if (!editingTopic?._id) return;
    
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await topicsService.updateTopic(editingTopic._id, {
        name: data.name,
        index: data.index,
      }, accessToken || '');
      await loadTopics();
      showSuccess('Thành công', 'Cập nhật chủ đề thành công');
      setShowEditModal(false);
      setEditingTopic(null);
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể cập nhật chủ đề');
    }
  };

  const handleDeleteTopic = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa chủ đề này?')) return;
    
    try {
      await checkAuth(accessToken || '', refreshToken || '');
      await topicsService.deleteTopic(id, accessToken || '');
      await loadTopics();
      showSuccess('Thành công', 'Xóa chủ đề thành công');
    } catch (error: any) {
      showError('Lỗi', error.message || 'Không thể xóa chủ đề');
    }
  };

  const handleSort = (key: keyof TopicType) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTopics = [...topics].sort((a, b) => {
    if (!sortConfig) return 0;
    
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

  const filteredTopics = sortedTopics.filter(topic => 
    topic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !topic.is_deleted
  );

  const openEditModal = (topic: TopicType) => {
    setEditingTopic(topic);
    reset({
      name: topic.name,
      index: topic.index
    });
    setShowEditModal(true);
  };

  const renderSortIcon = (key: keyof TopicType) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" /> 
      : <ArrowUpDown className="ml-1 h-3 w-3" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Chủ đề</h1>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus size={18} />
          Thêm chủ đề
        </Button>
      </div>

      <Card className="mb-6">
        <div className="p-4">
          <div className="relative w-full">
            <Input
              icon={Search}
              type="text"
              placeholder="Tìm kiếm chủ đề..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('index')}
                  >
                    <div className="flex items-center">
                      <ListOrdered className="h-4 w-4 mr-1" />
                      Thứ tự
                      {renderSortIcon('index')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Tên chủ đề
                      {renderSortIcon('name')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTopics.length > 0 ? (
                  filteredTopics.map((topic) => (
                    <motion.tr 
                      key={topic._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {topic.index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{topic.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditModal(topic)}
                            className="text-blue-600 hover:bg-blue-50"
                          >
                            <Edit size={16} className="mr-1" />
                            Sửa
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 border-red-200"
                            onClick={() => topic._id && handleDeleteTopic(topic._id)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Xóa
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                      Không tìm thấy chủ đề nào phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Add Topic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Thêm chủ đề mới</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(handleAddTopic)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên chủ đề <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      {...register('name', { 
                        required: 'Vui lòng nhập tên chủ đề',
                        maxLength: {
                          value: 100,
                          message: 'Tên chủ đề không được vượt quá 100 ký tự'
                        }
                      })}
                      className="w-full"
                      placeholder="Nhập tên chủ đề"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thứ tự hiển thị <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      {...register('index', { 
                        required: 'Vui lòng nhập thứ tự hiển thị',
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: 'Thứ tự phải lớn hơn 0'
                        }
                      })}
                      className="w-full"
                      placeholder="Nhập thứ tự hiển thị"
                    />
                    {errors.index && (
                      <p className="mt-1 text-sm text-red-600">{errors.index.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Thêm mới
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Topic Modal */}
      {showEditModal && editingTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Chỉnh sửa chủ đề</h3>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit(handleUpdateTopic)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên chủ đề <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      {...register('name', { 
                        required: 'Vui lòng nhập tên chủ đề',
                        maxLength: {
                          value: 100,
                          message: 'Tên chủ đề không được vượt quá 100 ký tự'
                        }
                      })}
                      className="w-full"
                      placeholder="Nhập tên chủ đề"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Thứ tự hiển thị <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="1"
                      {...register('index', { 
                        required: 'Vui lòng nhập thứ tự hiển thị',
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: 'Thứ tự phải lớn hơn 0'
                        }
                      })}
                      className="w-full"
                      placeholder="Nhập thứ tự hiển thị"
                    />
                    {errors.index && (
                      <p className="mt-1 text-sm text-red-600">{errors.index.message}</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditModal(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Cập nhật
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTopics;
