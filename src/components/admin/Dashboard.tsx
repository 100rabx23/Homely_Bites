import React from 'react';
import { OrderStats } from './OrderStats';
import { UserManagement } from './UserManagement';
import { MenuManagement } from './MenuManagement';
import { DeliveryPartners } from './DeliveryPartners';

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderStats />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserManagement />
        <DeliveryPartners />
      </div>
      <MenuManagement />
    </div>
  );
}