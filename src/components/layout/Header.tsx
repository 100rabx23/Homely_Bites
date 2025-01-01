import React from 'react';
import { Menu, ShoppingBag, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600" />
            <h1 className="ml-3 text-xl font-semibold text-gray-800">TiffinEats</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ShoppingBag className="h-6 w-6 text-gray-600" />
            <User className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}