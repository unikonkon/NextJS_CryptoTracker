import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-900/20 border border-red-500 text-red-300 rounded-lg p-4 flex items-center">
      <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
      <div>
        <h3 className="font-semibold text-red-200">Error</h3>
        <p>{message}</p>
      </div>
    </div>
  );
} 