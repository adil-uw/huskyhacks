import React from 'react';

const ToggleSwitch = ({ enabled, onChange, label, subtext, tooltip }) => {
  return (
    <div className="flex items-start justify-between p-4 bg-white rounded-xl shadow-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-text-primary">{label}</label>
          {tooltip && (
            <div className="group relative">
              <span className="text-text-secondary cursor-help">ℹ️</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-text-primary text-white text-xs rounded-lg z-10">
                {tooltip}
              </div>
            </div>
          )}
        </div>
        {subtext && <p className="text-xs text-text-secondary mt-1">{subtext}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-apply focus:ring-offset-2 ${
          enabled ? 'bg-accent-apply' : 'bg-gray-300'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;

