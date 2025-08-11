import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { quoteRequests } from '../../lib/mockData';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminQuotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  const statuses = ['pending', 'processing', 'quoted', 'closed'];
  const statusLabels = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    quoted: 'Đã báo giá',
    closed: 'Đã đóng'
  };
  
  const filteredQuotes = quoteRequests.filter(quote => {
    const matchesSearch = quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || quote.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <AlertCircle className="h-4 w-4" />;
      case 'quoted':
        return <CheckCircle className="h-4 w-4" />;
      case 'closed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'quoted':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý yêu cầu báo giá</h1>
          <p className="text-gray-600">Xử lý các yêu cầu báo giá từ khách hàng</p>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên khách hàng, email hoặc xe..."
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
              <p className="text-sm font-medium text-gray-600">Tổng yêu cầu</p>
              <p className="text-2xl font-bold text-gray-900">{quoteRequests.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Chờ xử lý</p>
              <p className="text-2xl font-bold text-gray-900">
                {quoteRequests.filter(q => q.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-gray-900">
                {quoteRequests.filter(q => q.status === 'processing').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã báo giá</p>
              <p className="text-2xl font-bold text-gray-900">
                {quoteRequests.filter(q => q.status === 'quoted').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Quotes List */}
      <Card>
        <div className="space-y-4">
          {filteredQuotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quote.customerName}
                    </h3>
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                      {getStatusIcon(quote.status)}
                      <span>{statusLabels[quote.status as keyof typeof statusLabels]}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{quote.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{quote.phone}</span>
                    </div>
                    {quote.company && (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Công ty:</span>
                        <span>{quote.company}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(quote.createdAt)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" icon={Eye}>
                    Chi tiết
                  </Button>
                  <Button variant="primary" size="sm">
                    Xử lý
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Xe quan tâm:</span>
                    <p className="text-gray-900">{quote.vehicleName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Loại dịch vụ:</span>
                    <p className="text-gray-900">
                      {quote.serviceType === 'buy' ? 'Mua xe' : 'Thuê xe'}
                      {quote.duration && ` - ${quote.duration}`}
                    </p>
                  </div>
                </div>
                
                {quote.message && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Tin nhắn:</span>
                    <p className="text-gray-900 mt-1">{quote.message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Không tìm thấy yêu cầu nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc tìm kiếm
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminQuotes;