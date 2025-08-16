import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Building,
  Star,
  TrendingUp,
  Users,
  ShoppingBag
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  lastOrder: string;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0901234567',
    company: 'Công ty TNHH Xây dựng ABC',
    address: 'Quận 1, TP.HCM',
    joinDate: '2023-01-15',
    totalOrders: 12,
    totalSpent: 2500000000,
    status: 'vip',
    lastOrder: '2024-01-10',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    email: 'tranthib@email.com',
    phone: '0987654321',
    company: 'Tập đoàn Xây dựng XYZ',
    address: 'Quận 7, TP.HCM',
    joinDate: '2023-03-20',
    totalOrders: 8,
    totalSpent: 1800000000,
    status: 'active',
    lastOrder: '2024-01-08',
    avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: 3,
    name: 'Lê Văn Cường',
    email: 'levanc@email.com',
    phone: '0369258147',
    address: 'Quận 3, TP.HCM',
    joinDate: '2023-06-10',
    totalOrders: 3,
    totalSpent: 450000000,
    status: 'active',
    lastOrder: '2023-12-15'
  },
  {
    id: 4,
    name: 'Phạm Thị Dung',
    email: 'phamthid@email.com',
    phone: '0123456789',
    company: 'Công ty CP Đầu tư DEF',
    address: 'Hà Nội',
    joinDate: '2022-11-05',
    totalOrders: 1,
    totalSpent: 120000000,
    status: 'inactive',
    lastOrder: '2023-08-20'
  }
];

const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const statuses = ['active', 'inactive', 'vip'];
  const statusLabels = {
    active: 'Hoạt động',
    inactive: 'Không hoạt động',
    vip: 'VIP'
  };
  
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = !selectedStatus || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'vip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      console.log('Delete customer:', id);
    }
  };
  
  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const vipCustomers = mockCustomers.filter(c => c.status === 'vip').length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý khách hàng</h1>
          <p className="text-gray-600">Quản lý thông tin và lịch sử khách hàng</p>
        </div>
        <Button 
          variant="primary" 
          icon={Plus}
          onClick={() => setShowAddModal(true)}
        >
          Thêm khách hàng
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên, email hoặc công ty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={Search}
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">Tất cả trạng thái</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status as keyof typeof statusLabels]}
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
              <p className="text-sm font-medium text-gray-600">Tổng khách hàng</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Khách hàng hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Khách hàng VIP</p>
              <p className="text-2xl font-bold text-gray-900">{vipCustomers}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Customers List */}
      <Card>
        <div className="space-y-4">
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=FFD60A&color=0D1B2A`}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {customer.name}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(customer.status)}`}>
                    {statusLabels[customer.status as keyof typeof statusLabels]}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{customer.address}</span>
                  </div>
                  {customer.company && (
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>{customer.company}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Tham gia: {formatDate(customer.joinDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{customer.totalOrders} đơn hàng</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-gray-500">Tổng chi tiêu: </span>
                    <span className="font-semibold text-gray-900">{formatCurrency(customer.totalSpent)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Đơn hàng cuối: {formatDate(customer.lastOrder)}
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
                  onClick={() => handleDelete(customer.id)}
                >
                  Xóa
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Không tìm thấy khách hàng nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc tìm kiếm
            </p>
          </div>
        )}
      </Card>
      
      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thêm khách hàng mới
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Họ và tên *" placeholder="Nhập họ và tên" />
              <Input label="Email *" type="email" placeholder="Nhập email" />
              <Input label="Số điện thoại *" placeholder="Nhập số điện thoại" />
              <Input label="Công ty" placeholder="Tên công ty (tùy chọn)" />
              <div className="md:col-span-2">
                <Input label="Địa chỉ *" placeholder="Nhập địa chỉ" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors duration-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none">
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setShowAddModal(false)}
              >
                Hủy
              </Button>
              <Button variant="primary">
                Thêm khách hàng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;