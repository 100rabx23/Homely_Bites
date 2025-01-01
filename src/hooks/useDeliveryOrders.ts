import { useState, useEffect } from 'react';
import { Order } from '../types';
import { orders } from '../services/api';
import { socket } from '../services/socket';
import { toast } from 'react-hot-toast';

export function useDeliveryOrders() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();

    socket.on('newOrder', handleNewOrder);
    socket.on('orderUpdate', handleOrderUpdate);

    return () => {
      socket.off('newOrder');
      socket.off('orderUpdate');
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orders.getActiveDeliveries();
      setActiveOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const handleNewOrder = (order: Order) => {
    toast.success('New order available!');
    setActiveOrders(prev => [...prev, order]);
  };

  const handleOrderUpdate = (update: { orderId: string; status: string }) => {
    setActiveOrders(prev => 
      prev.map(order => 
        order.id === update.orderId 
          ? { ...order, status: update.status }
          : order
      )
    );
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await orders.updateStatus(orderId, status);
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  return { orders: activeOrders, updateOrderStatus };
}