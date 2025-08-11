import { Vehicle, Category, Service, NewsItem, QuoteRequest, DashboardStats } from './types';

export const categories: Category[] = [
  {
    id: 1,
    name: 'Máy Xúc',
    slug: 'may-xuc',
    icon: 'construction',
    description: 'Máy xúc đa năng cho các công trình xây dựng',
    vehicleCount: 45,
  },
  {
    id: 2,
    name: 'Xe Tải',
    slug: 'xe-tai',
    icon: 'truck',
    description: 'Xe tải chở hàng các loại tải trọng',
    vehicleCount: 32,
  },
  {
    id: 3,
    name: 'Cần Cẩu',
    slug: 'can-cau',
    icon: 'crane',
    description: 'Cần cẩu di động và cần cẩu tháp',
    vehicleCount: 28,
  },
  {
    id: 4,
    name: 'Xe Lu',
    slug: 'xe-lu',
    icon: 'circle',
    description: 'Xe lu đường và xe lu bánh lốp',
    vehicleCount: 18,
  },
  {
    id: 5,
    name: 'Máy Ủi',
    slug: 'may-ui',
    icon: 'bulldozer',
    description: 'Máy ủi đất và san lấp mặt bằng',
    vehicleCount: 22,
  },
  {
    id: 6,
    name: 'Xe Nâng',
    slug: 'xe-nang',
    icon: 'forklift',
    description: 'Xe nâng hàng và xe nâng địa hình',
    vehicleCount: 35,
  }
];

export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Máy xúc Komatsu PC200-8',
    category: 'may-xuc',
    brand: 'Komatsu',
    price: 2500000000,
    rentPrice: 2500000,
    year: 2023,
    condition: 'new',
    specs: {
      engine: 'Komatsu SAA6D107E-1',
      power: '110 kW (148 HP)',
      weight: '19,900 kg',
      bucketCapacity: '0.93 m³',
    },
    images: [
      'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/162514/excavators-construction-site-construction-work-162514.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    available: true,
    description: 'Máy xúc Komatsu PC200-8 với công nghệ tiên tiến, tiết kiệm nhiên liệu và hiệu suất vận hành cao.',
    location: 'TP. Hồ Chí Minh',
  },
  {
    id: 2,
    name: 'Xe tải Hino 15 tấn',
    category: 'xe-tai',
    brand: 'Hino',
    price: 1800000000,
    rentPrice: 1800000,
    year: 2022,
    condition: 'used',
    specs: {
      engine: 'Hino J08E-VB',
      power: '180 kW (241 HP)',
      weight: '15,000 kg',
      maxLoad: '15 tấn',
    },
    images: [
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    available: true,
    description: 'Xe tải Hino 15 tấn chất lượng cao, phù hợp cho vận chuyển vật liệu xây dựng.',
    location: 'Hà Nội',
  },
  {
    id: 3,
    name: 'Cần cẩu Tadano GT-550E',
    category: 'can-cau',
    brand: 'Tadano',
    price: 4500000000,
    rentPrice: 3500000,
    year: 2023,
    condition: 'new',
    specs: {
      engine: 'Isuzu 6HK1-XQA',
      power: '200 kW (268 HP)',
      weight: '35,000 kg',
      maxReach: '40 m',
    },
    images: [
      'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    available: true,
    description: 'Cần cẩu Tadano GT-550E với khả năng nâng cao và tầm với rộng.',
    location: 'Đà Nẵng',
  },
  {
    id: 4,
    name: 'Xe lu Dynapac CA2500D',
    category: 'xe-lu',
    brand: 'Dynapac',
    price: 1200000000,
    rentPrice: 1000000,
    year: 2021,
    condition: 'used',
    specs: {
      engine: 'Deutz TCD 2012 L04 2V',
      power: '55 kW (74 HP)',
      weight: '8,500 kg',
      bucketCapacity: '2.5 m³',
    },
    images: [
      'https://images.pexels.com/photos/1108098/pexels-photo-1108098.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/162539/road-roller-asphalt-roller-heavy-162539.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    available: true,
    description: 'Xe lu Dynapac CA2500D chuyên dụng cho lu lèn đường và mặt bằng.',
    location: 'Cần Thơ',
  },
  {
    id: 5,
    name: 'Máy ủi Caterpillar D6T',
    category: 'may-ui',
    brand: 'Caterpillar',
    price: 3200000000,
    rentPrice: 2800000,
    year: 2023,
    condition: 'new',
    specs: {
      engine: 'Caterpillar C7 ACERT',
      power: '140 kW (188 HP)',
      weight: '18,200 kg',
      bucketCapacity: '3.4 m³',
    },
    images: [
      'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/162575/bulldozer-cat-machinery-equipment-162575.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: true,
    available: true,
    description: 'Máy ủi Caterpillar D6T với công suất mạnh mẽ và độ bền cao.',
    location: 'TP. Hồ Chí Minh',
  },
  {
    id: 6,
    name: 'Xe nâng Toyota 8FD25',
    category: 'xe-nang',
    brand: 'Toyota',
    price: 850000000,
    rentPrice: 450000,
    year: 2022,
    condition: 'used',
    specs: {
      engine: '1DZ-III',
      power: '42 kW (56 HP)',
      weight: '4,200 kg',
      maxLoad: '2.5 tấn',
    },
    images: [
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featured: false,
    available: true,
    description: 'Xe nâng Toyota 8FD25 chất lượng cao cho các công việc nâng hạ.',
    location: 'Hà Nội',
  }
];

export const services: Service[] = [
  {
    id: 1,
    title: 'Cho thuê xe công trình',
    description: 'Dịch vụ cho thuê xe công trình đa dạng theo ngày, tháng hoặc dự án',
    icon: 'calendar',
    features: [
      'Cho thuê theo giờ, ngày, tháng',
      'Bảo trì và sửa chữa miễn phí',
      'Tài xế chuyên nghiệp',
      'Giao nhận tận nơi',
      'Hỗ trợ 24/7'
    ],
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'Mua bán xe công trình',
    description: 'Mua bán xe công trình mới và cũ với giá cả cạnh tranh',
    icon: 'shopping-cart',
    features: [
      'Xe mới chính hãng',
      'Xe cũ chất lượng cao',
      'Bảo hành toàn diện',
      'Hỗ trợ vay vốn',
      'Đăng ký, sang tên'
    ],
    image: 'https://images.pexels.com/photos/162514/excavators-construction-site-construction-work-162514.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'Bảo trì & Sửa chữa',
    description: 'Dịch vụ bảo trì và sửa chữa xe công trình chuyên nghiệp',
    icon: 'wrench',
    features: [
      'Bảo dưỡng định kỳ',
      'Sửa chữa tại garage',
      'Sửa chữa tại công trình',
      'Phụ tùng chính hãng',
      'Kỹ thuật viên có kinh nghiệm'
    ],
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'Cung cấp phụ tùng',
    description: 'Cung cấp phụ tùng chính hãng cho các loại xe công trình',
    icon: 'settings',
    features: [
      'Phụ tùng chính hãng',
      'Giá cả cạnh tranh',
      'Giao hàng nhanh chóng',
      'Bảo hành chính hãng',
      'Tư vấn kỹ thuật'
    ],
    image: 'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800',
  }
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Xu hướng phát triển ngành xe công trình 2024',
    excerpt: 'Ngành xe công trình đang có những bước phát triển mạnh mẽ với công nghệ mới và nhu cầu xây dựng tăng cao.',
    content: 'Nội dung chi tiết về xu hướng phát triển...',
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tin tức ngành',
    publishDate: '2024-01-15',
    author: 'Nguyễn Văn A',
    featured: true,
  },
  {
    id: 2,
    title: 'Review máy xúc Komatsu PC200-8: Đánh giá chi tiết',
    excerpt: 'Đánh giá chi tiết về hiệu suất, tính năng và ưu nhược điểm của máy xúc Komatsu PC200-8.',
    content: 'Nội dung review chi tiết...',
    image: 'https://images.pexels.com/photos/162514/excavators-construction-site-construction-work-162514.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Review sản phẩm',
    publishDate: '2024-01-12',
    author: 'Trần Thị B',
    featured: false,
  },
  {
    id: 3,
    title: 'Bí quyết bảo dưỡng xe công trình hiệu quả',
    excerpt: 'Những tips và mẹo vặt giúp bảo dưỡng xe công trình hiệu quả, tiết kiệm chi phí.',
    content: 'Hướng dẫn chi tiết về bảo dưỡng...',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Hướng dẫn',
    publishDate: '2024-01-10',
    author: 'Lê Văn C',
    featured: true,
  }
];

export const quoteRequests: QuoteRequest[] = [
  {
    id: 1,
    customerName: 'Nguyễn Văn An',
    email: 'nguyenvanan@email.com',
    phone: '0901234567',
    company: 'Công ty TNHH Xây dựng ABC',
    vehicleId: 1,
    vehicleName: 'Máy xúc Komatsu PC200-8',
    serviceType: 'rent',
    duration: '3 tháng',
    message: 'Tôi cần thuê máy xúc cho dự án xây dựng khu dân cư.',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    customerName: 'Trần Thị Bình',
    email: 'tranthib@email.com',
    phone: '0987654321',
    vehicleId: 2,
    vehicleName: 'Xe tải Hino 15 tấn',
    serviceType: 'buy',
    message: 'Muốn mua xe tải để phục vụ công việc vận chuyển.',
    status: 'processing',
    createdAt: '2024-01-14T14:20:00Z',
  }
];

export const dashboardStats: DashboardStats = {
  totalVehicles: 180,
  availableVehicles: 156,
  totalOrders: 89,
  monthlyRevenue: 15600000000,
  revenueGrowth: 12.5,
  topCategories: [
    { name: 'Máy xúc', count: 45, percentage: 25 },
    { name: 'Xe nâng', count: 35, percentage: 19.4 },
    { name: 'Xe tải', count: 32, percentage: 17.8 },
    { name: 'Cần cẩu', count: 28, percentage: 15.6 },
    { name: 'Máy ủi', count: 22, percentage: 12.2 },
    { name: 'Xe lu', count: 18, percentage: 10 },
  ],
  recentQuotes: quoteRequests,
};