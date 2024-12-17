import React from 'react';
import { PlusCircle } from 'lucide-react';

const AddCarButton = ({ onAddCar }) => {
  return (
    <div className="flex justify-end mb-6">
      <button
        onClick={onAddCar}
        className="bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center px-4 py-2"
      >
        <PlusCircle className="mr-2" /> Add Car
      </button>
    </div>
  );
};

export default AddCarButton;