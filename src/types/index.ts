export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'delivery';
  address?: string;
  phone?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered';
  deliveryPartnerId?: string;
  createdAt: string;
  deliveryAddress: string;
  estimatedDeliveryTime?: string;
}