import React from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = ['Personal Details', 'Work Experience', 'Education', 'Skills', 'Summary'];

  return (
    <div className="flex bg-white rounded-t-2xl border-b overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 text-center 
            ${activeTab === tab
              ? 'bg-blue-500 text-white rounded-full mx-2'
              : 'text-gray-700 hover:bg-gray-100'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
