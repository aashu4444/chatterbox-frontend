import { useState } from 'react';

const TooltipButton = ({ children, buttons }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        onClick={handleClick}
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute -top-full -right-1/2 flex w-auto p-2 bg-gray-800 rounded-lg shadow-lg">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 mt-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
