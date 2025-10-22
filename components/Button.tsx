
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'w-full font-bold py-3 px-6 rounded-lg transition-transform duration-200 ease-in-out focus:outline-none focus:ring-4';
  const variantClasses = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-400 transform hover:scale-105',
    secondary: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500 transform hover:scale-105',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
