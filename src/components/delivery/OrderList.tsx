import React from 'react';
import { Order } from '../../types';
import { MapPin, Phone, Navigation } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, status: string) => void;
}

export function OrderList({ orders, onStatusUpdate }: OrderListProps) {
  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      'accepted': 'preparing',
      'preparing': 'out_for_delivery',
      'out_for_delivery': 'delivered'
    };
    return statusFlow[currentStatus];
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <p>{order.deliveryAddress}</p>
              </div>
              {order.user?.phone && (
                <div className="flex items-center mt-2 text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <p>{order.user.phone}</p>
                </div>
              )}
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
              {order.status !== 'delivered' && (
                <button
                  onClick={() => onStatusUpdate(order.id, getNextStatus(order.status))}
                  className="mt-2 flex items-center justify-center w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Update Status
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}