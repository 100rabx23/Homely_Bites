import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { socket } from '../../services/socket';
import { Bell } from 'lucide-react';

export function NotificationCenter() {
  useEffect(() => {
    socket.on('orderUpdate', ({ status, orderId }) => {
      toast.success(`Order #${orderId} ${status}`, {
        icon: '🔔',
      });
    });

    socket.on('newOrder', ({ orderId }) => {
      toast.success(`New order #${orderId} received!`, {
        icon: '🛵',
      });
    });

    return () => {
      socket.off('orderUpdate');
      socket.off('newOrder');
    };
  }, []);

  return (
    <button className="relative p-2 text-gray-600 hover:text-gray-900">
      <Bell className="h-6 w-6" />
      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
    </button>
  );
}