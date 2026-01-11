import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-100">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-primary-600 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="h-8 w-8 rounded-full border-t-4 border-b-4 border-primary-400 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;