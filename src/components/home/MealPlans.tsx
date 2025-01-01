import React from 'react';
import { Clock, Utensils, Calendar } from 'lucide-react';

const plans = [
  {
    name: 'Daily Plan',
    price: '₹150',
    description: 'Perfect for trying out our service',
    icon: Clock,
    features: ['Fresh daily meals', 'Choose your menu', 'Flexible timing'],
  },
  {
    name: 'Weekly Plan',
    price: '₹899',
    description: 'Most popular choice',
    icon: Utensils,
    features: ['7 days service', '10% discount', 'Weekend specials'],
  },
  {
    name: 'Monthly Plan',
    price: '₹3299',
    description: 'Best value for regular customers',
    icon: Calendar,
    features: ['30 days service', '20% discount', 'Priority delivery'],
  },
];

export function MealPlans() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Flexible plans to match your lifestyle
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <plan.icon className="h-8 w-8 text-indigo-600" />
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /plan
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="text-green-500">✓</span>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 transition-colors">
                  Select Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}