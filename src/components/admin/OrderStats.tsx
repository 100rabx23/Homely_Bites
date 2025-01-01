import React from 'react';
import { useOrderStats } from '../../hooks/useOrderStats';
import { TrendingUp, Users, Clock, CheckCircle } from 'lucide-react';

export function OrderStats() {
  const { stats } = useOrderStats();

  const statCards = [
    { title: 'Total Orders', value: stats.total, icon: TrendingUp, color: 'bg-blue-500' },
    { title: 'Active Orders', value: stats.active, icon: Clock, color: 'bg-yellow-500' },
    { title: 'Delivered Today', value: stats.delivered, icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Total Customers', value: stats.customers, icon: Users, color: 'bg-purple-500' }
  ];

  return (
    <>
      {statCards.map((card) => (
        <div key={card.title} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
            <div className={`${card.color} p-3 rounded-full`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}