import React from 'react';

const Input = React.forwardRef(({ label, error, icon, className = '', ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="error-text">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;