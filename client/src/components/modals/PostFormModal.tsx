import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Star } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { CreateUpdatePostData } from '../../services/postsServices';
import { TopicType } from '../../types/topicType';
import { useToast } from '../../contexts/ToastContext';
import Cookies from 'js-cookie';
import { PostType } from '../../types/postTypes';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: CreateUpdatePostData) => Promise<void>;
  topics: TopicType[];
  initialData?: PostType;
  isEdit?: boolean;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  topics,
  initialData,
  isEdit
}) => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    content: '',
    topic_id: '',
    is_featured: false
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens/closes or populate with initialData
  useEffect(() => {
    if (isOpen && initialData) {
      // Populate form with existing data when editing
      setFormData({
        title: initialData.title || '',
        sub_title: initialData.sub_title || '',
        content: initialData.content || '',
        topic_id: initialData.topic_id || '',
        is_featured: initialData.is_featured || false
      });
      // Set existing thumbnail preview if available
      if (initialData.thumbnail?.url) {
        setPreviewUrl(initialData.thumbnail.url);
      }
      setErrors({});
    } else if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: '',
        sub_title: '',
        content: '',
        topic_id: '',
        is_featured: false
      });
      setSelectedFile(null);
      setPreviewUrl('');
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setErrors(prev => ({ ...prev, thumbnail: '' }));
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Tiêu đề là bắt buộc';
    }
    if (!formData.sub_title.trim()) {
      newErrors.sub_title = 'Tiêu đề phụ là bắt buộc';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Nội dung là bắt buộc';
    }
    if (!formData.topic_id) {
      newErrors.topic_id = 'Chủ đề là bắt buộc';
    }
    if (!selectedFile && !previewUrl) {
      newErrors.thumbnail = 'Ảnh thumbnail là bắt buộc';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showError('Lỗi xác thực', 'Vui lòng kiểm tra lại thông tin đã nhập');
      return;
    }

    setIsSubmitting(true);
    try {
      const postData: CreateUpdatePostData = {
        _id: initialData?._id,
        ...formData,
        thumbnail: selectedFile!,
        token: Cookies.get('accessToken')!
      };
      
      await onSubmit(postData);
      showSuccess('Thành công!', isEdit ? 'Bài viết đã được cập nhật thành công' : 'Bài viết đã được tạo thành công');
      onClose();
    } catch (error) {
      console.error('Error submitting post:', error);
      console.log(Cookies.get('accessToken'))
      showError(
        isEdit ? 'Lỗi cập nhật bài viết' : 'Lỗi tạo bài viết', 
        isEdit ? 'Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.' : 'Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {isEdit ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề bài viết..."
                  error={errors.title}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề phụ *
                </label>
                <Input
                  name="sub_title"
                  value={formData.sub_title}
                  onChange={handleInputChange}
                  placeholder="Nhập tiêu đề phụ..."
                  error={errors.sub_title}
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề *
                </label>
                <select
                  name="topic_id"
                  value={formData.topic_id}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                    errors.topic_id ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Chọn chủ đề</option>
                  {topics.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
                {errors.topic_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.topic_id}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Nhập nội dung bài viết..."
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh thumbnail *
                </label>
                
                {!selectedFile && !previewUrl ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Tải lên ảnh thumbnail
                          </span>
                          <span className="mt-1 block text-sm text-gray-500">
                            PNG, JPG, GIF tối đa 10MB
                          </span>
                        </label>
                        <input
                          id="thumbnail-upload"
                          name="thumbnail"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          icon={Upload}
                          onClick={() => document.getElementById('thumbnail-upload')?.click()}
                        >
                          Chọn ảnh
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <div className="flex items-center space-x-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {selectedFile?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : 'Ảnh hiện tại'}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                      >
                        Xóa
                      </Button>
                    </div>
                  </Card>
                )}
                
                {errors.thumbnail && (
                  <p className="mt-1 text-sm text-red-600">{errors.thumbnail}</p>
                )}
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="flex items-center text-sm font-medium text-gray-700">
                  <Star className="h-4 w-4 mr-1" />
                  Đánh dấu là bài viết nổi bật
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  {isSubmitting ? (isEdit ? 'Đang cập nhật...' : 'Đang tạo...') : (isEdit ? 'Cập nhật bài viết' : 'Tạo bài viết')}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PostFormModal;
