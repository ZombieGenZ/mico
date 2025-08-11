import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Truck,
  Wrench,
  FileText,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
} from 'lucide-react';
import { ROUTES } from '../../lib/constants';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: ROUTES.ADMIN_DASHBOARD,
    },
    {
      name: 'Xe công trình',
      icon: Truck,
      path: ROUTES.ADMIN_VEHICLES,
    },
    {
      name: 'Danh mục',
      icon: Wrench,
      path: ROUTES.ADMIN_CATEGORIES,
    },
    {
      name: 'Tin tức',
      icon: FileText,
      path: ROUTES.ADMIN_NEWS,
    },
    {
      name: 'Yêu cầu báo giá',
      icon: MessageSquare,
      path: ROUTES.ADMIN_QUOTES,
    },
    {
      name: 'Khách hàng',
      icon: Users,
      path: '/admin/customers',
    },
    {
      name: 'Báo cáo',
      icon: BarChart3,
      path: '/admin/reports',
    },
    {
      name: 'Cài đặt',
      icon: Settings,
      path: ROUTES.ADMIN_SETTINGS,
    },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <Link to={ROUTES.HOME} className="flex items-center space-x-2 mb-8">
          <div className="bg-yellow-400 text-slate-900 p-2 rounded-lg">
            <span className="font-bold text-lg">XE</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-yellow-400">Admin Panel</h1>
            <p className="text-xs text-gray-400">Quản trị hệ thống</p>
          </div>
        </Link>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-yellow-400 text-slate-900 font-semibold'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{item.name}</span>
                {active && (
                  <motion.div
                    layoutId="activeMenuItem"
                    className="absolute inset-0 bg-yellow-400 rounded-lg -z-10"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;