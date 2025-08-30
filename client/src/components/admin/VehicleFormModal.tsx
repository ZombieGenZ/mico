import React, { useState, useEffect } from 'react';
import { X, Plus, Upload } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Vehicle, TechnicalInformationType, ImageType } from '../../types/vehicleTypes';
import BrandServices from '../../services/brandsServices';
import { BrandType } from '../../types/brandTypes';
import CategoriesServices from '../../services/categoriesServices';
import { CategoryType } from '../../types/categoriesTypes';

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (vehicle: Vehicle) => void;
  vehicle?: Vehicle;
  isEdit?: boolean;
}

const initialVehicle: Vehicle = {
  path: '',
  title: '',
  subtitle: '',
  technical_information: [],
  features: [],
  image: [],
  category_id: '',
  brand_id: '',
  in_stock: true,
  is_new: true,
  is_used: false
};

const brandService = new BrandServices();
const categoriesServices = new CategoriesServices();

const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ isOpen, onClose, onSubmit, vehicle: editVehicle, isEdit = false }) => {
  const [vehicle, setVehicle] = useState<Vehicle>(editVehicle || initialVehicle);
  const [technicalInfo, setTechnicalInfo] = useState<TechnicalInformationType>({
    code: '',
    name: '',
    value: '',
    index: 0
  });
  const [feature, setFeature] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await brandService.getBrands();
        setBrands(Array.isArray(data) ? data : []);
        const categories = await categoriesServices.getCategories()
        setCategories(Array.isArray(categories) ? categories : [])
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands([]);
      }
    };
    
    if (isOpen) {
      fetchBrands();
    }
  }, [isOpen]);

  // Update vehicle state when editVehicle changes
  useEffect(() => {
    if (editVehicle && isEdit) {
      setVehicle(editVehicle);
    } else if (!isEdit) {
      setVehicle(initialVehicle);
    }
  }, [editVehicle, isEdit]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setVehicle(prev => ({ ...prev, [name]: checked }));
    } else {
      setVehicle(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleAddTechnicalInfo = () => {
    if (technicalInfo.name && technicalInfo.value) {
      setVehicle(prev => ({
        ...prev,
        technical_information: [
          ...prev.technical_information,
          { ...technicalInfo, index: prev.technical_information.length }
        ]
      }));
      setTechnicalInfo({ code: '', name: '', value: '', index: 0 });
    }
  };

  const handleAddFeature = () => {
    if (feature) {
      setVehicle(prev => ({
        ...prev,
        features: [
          ...prev.features,
          { value: feature, index: prev.features.length }
        ]
      }));
      setFeature('');
    }
  };

  const handleAddImage = () => {
    if (imageUrl) {
      const newImage: ImageType = {
        name: `image-${vehicle.image.length + 1}`,
        url: imageUrl,
        path: imageUrl
      };
      
      setVehicle(prev => ({
        ...prev,
        image: [...prev.image, newImage]
      }));
      
      setImageUrl('');
    }
  };

  const handleRemoveTechnicalInfo = (index: number) => {
    setVehicle(prev => ({
      ...prev,
      technical_information: prev.technical_information.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setVehicle(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveImage = (index: number) => {
    setVehicle(prev => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(vehicle);
    setVehicle(initialVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Sửa xe' : 'Thêm xe mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên xe
              </label>
              <Input
                name="title"
                value={vehicle.title}
                onChange={handleChange}
                placeholder="Nhập tên xe"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả ngắn
              </label>
              <Input
                name="subtitle"
                value={vehicle.subtitle}
                onChange={handleChange}
                placeholder="Nhập mô tả ngắn"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Đường dẫn
              </label>
              <Input
                name="path"
                value={vehicle.path}
                onChange={handleChange}
                placeholder="Nhập đường dẫn URL"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                name="category_id"
                value={vehicle.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id?.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thương hiệu
              </label>
              <select
                name="brand_id"
                value={vehicle.brand_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              >
                <option value="">Chọn thương hiệu</option>
                {brands.map(brand => (
                  <option key={brand._id} value={brand._id?.toString()}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={vehicle.in_stock}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-700">
                  Có sẵn
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_new"
                  name="is_new"
                  checked={vehicle.is_new}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label htmlFor="is_new" className="ml-2 block text-sm text-gray-700">
                  Xe mới
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_used"
                  name="is_used"
                  checked={vehicle.is_used}
                  onChange={handleChange}
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label htmlFor="is_used" className="ml-2 block text-sm text-gray-700">
                  Đã sử dụng
                </label>
              </div>
            </div>
          </div>
          
          {/* Thông tin kỹ thuật */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin kỹ thuật</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                value={technicalInfo.code}
                onChange={(e) => setTechnicalInfo(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Mã thông số"
              />
              <Input
                value={technicalInfo.name}
                onChange={(e) => setTechnicalInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Tên thông số"
              />
              <Input
                value={technicalInfo.value}
                onChange={(e) => setTechnicalInfo(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Giá trị"
              />
            </div>
            
            <Button
              type="button"
              variant="outline"
              icon={Plus}
              onClick={handleAddTechnicalInfo}
              className="mb-4"
            >
              Thêm thông số
            </Button>
            
            {vehicle.technical_information.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Thông số đã thêm:</h4>
                <ul className="space-y-2">
                  {vehicle.technical_information.map((info, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                      <span>
                        <strong>{info.name}:</strong> {info.value} {info.code && `(${info.code})`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnicalInfo(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Tính năng */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tính năng</h3>
            
            <div className="flex gap-4 mb-4">
              <Input
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="Nhập tính năng"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                icon={Plus}
                onClick={handleAddFeature}
              >
                Thêm
              </Button>
            </div>
            
            {vehicle.features.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tính năng đã thêm:</h4>
                <ul className="space-y-2">
                  {vehicle.features.map((feat, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                      <span>{feat.value}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Hình ảnh */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hình ảnh</h3>
            
            <div className="flex gap-4 mb-4">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Nhập URL hình ảnh"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                icon={Upload}
                onClick={handleAddImage}
              >
                Thêm
              </Button>
            </div>
            
            {vehicle.image.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicle.image.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.url}
                      alt={`Vehicle image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="border-t pt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              {isEdit ? 'Lưu thay đổi' : 'Thêm xe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleFormModal;