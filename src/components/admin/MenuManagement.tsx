import React, { useState } from 'react';
import { useMenuItems } from '../../hooks/useMenuItems';
import { MenuItemForm } from './MenuItemForm';
import { Pencil, Trash2 } from 'lucide-react';

export function MenuManagement() {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();
  const [editingItem, setEditingItem] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Menu Management</h2>
        <button 
          onClick={() => setEditingItem({})}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-md" />
            <div className="mt-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-lg font-bold mt-2">₹{item.price}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => deleteMenuItem(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <MenuItemForm 
          item={editingItem} 
          onSubmit={(data) => {
            editingItem.id ? updateMenuItem(editingItem.id, data) : addMenuItem(data);
            setEditingItem(null);
          }}
          onCancel={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}