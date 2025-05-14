import React from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    // <div className="flex justify-center items-center py-12">
    //   <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-yellow-400"></div>
    // </div>
    <div className="flex justify-center items-center py-12">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
} 