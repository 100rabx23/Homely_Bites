import React from 'react';
import { useDeliveryOrders } from '../../hooks/useDeliveryOrders';
import { DeliveryMap } from './DeliveryMap';
import { OrderList } from './OrderList';
import { useLocation } from '../../hooks/useLocation';

export function DeliveryDashboard() {
  const { orders, updateOrderStatus } = useDeliveryOrders();
  const { location, updateLocation } = useLocation();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Active Deliveries</h2>
        <DeliveryMap 
          deliveryLocation={location}
          destination={orders[0]?.location}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <OrderList 
          orders={orders}
          onStatusUpdate={updateOrderStatus}
        />
      </div>
    </div>
  );
}