import React from 'react';
import { Calendar, Check } from 'lucide-react';

interface MealPlanProps {
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

export const MealPlanCard: React.FC<MealPlanProps> = ({ 
  name, 
  price, 
  duration, 
  features, 
  isPopular 
}) => {
  return (
    <div className={`relative rounded-2xl p-6 ${
      isPopular ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-white'
    }`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-black text-sm font-medium rounded-full">
          Most Popular
        </span>
      )}

      <div className="text-center">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-4">
          <span className="text-3xl font-bold">₹{price}</span>
          <span className="text-sm">/{duration}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition-colors ${
        isPopular 
          ? 'bg-white text-indigo-600 hover:bg-gray-100' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
      }`}>
        Choose Plan
      </button>
    </div>
  );
};