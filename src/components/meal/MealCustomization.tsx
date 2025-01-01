import React, { useState } from 'react';
import { Switch } from '../ui/Switch';

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export const MealCustomization = ({ options, onCustomize }) => {
  const [selections, setSelections] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Customize Your Meal</h3>
      
      <div className="space-y-2">
        {options.map((option: CustomizationOption) => (
          <div key={option.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div>
              <p className="font-medium">{option.name}</p>
              <p className="text-sm text-gray-500">+₹{option.price}</p>
            </div>
            <Switch
              checked={selections.includes(option.id)}
              onCheckedChange={(checked) => {
                setSelections(prev => 
                  checked 
                    ? [...prev, option.id]
                    : prev.filter(id => id !== option.id)
                );
                onCustomize(option.id, checked);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};