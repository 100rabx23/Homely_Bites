import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  Home, 
  ShoppingBag, 
  Clock, 
  Settings, 
  LogOut,
  Truck,
  Users,
  Coffee
} from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuthStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    { icon: Clock, label: 'Order History', path: '/order-history' },
  ];

  // Admin-specific menu items
  const adminItems = [
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Coffee, label: 'Menu Items', path: '/menu-items' },
  ];

  // Delivery partner specific items
  const deliveryItems = [
    { icon: Truck, label: 'Deliveries', path: '/deliveries' },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg">
      <div className="p-4">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          {user?.role === 'admin' && adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          {user?.role === 'delivery' && deliveryItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <Link
            to="/settings"
            className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => logout()}
            className="flex items-center space-x-3 text-red-600 p-2 rounded-lg hover:bg-red-50 w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}