export interface Vehicle {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  rentPrice?: number;
  year: number;
  condition: 'new' | 'used' | 'refurbished';
  specs: {
    engine: string;
    power: string;
    weight: string;
    bucketCapacity?: string;
    maxLoad?: string;
    maxReach?: string;
  };
  images: string[];
  featured: boolean;
  available: boolean;
  description: string;
  location: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  vehicleCount: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  publishDate: string;
  author: string;
  featured: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface QuoteRequest {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  vehicleId: number;
  vehicleName: string;
  serviceType: 'buy' | 'rent';
  duration?: string;
  message: string;
  status: 'pending' | 'processing' | 'quoted' | 'closed';
  createdAt: string;
}

export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  totalOrders: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  topCategories: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  recentQuotes: QuoteRequest[];
}