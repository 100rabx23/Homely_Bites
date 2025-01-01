import React from 'react';

export function Hero() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&q=80"
          alt="Healthy food"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Homestyle Meals, Delivered Daily
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Enjoy nutritious, home-cooked meals delivered right to your doorstep. Perfect for busy professionals and students.
        </p>
        <div className="mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Start Your Meal Plan
          </button>
        </div>
      </div>
    </div>
  );
}