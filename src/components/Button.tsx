import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-900 to-blue-400 hover:from-blue-800 hover:to-blue-300 text-white border border-transparent",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
