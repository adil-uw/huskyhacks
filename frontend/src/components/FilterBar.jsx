import React, { useState } from 'react';

const FilterBar = ({ onSearch, onCategoryChange, onSortChange, selectedCategory, selectedSort }) => {
  const categories = ['All Perks', 'Sports', 'Dining', 'Travel', 'Groceries', 'Fuel', 'Family'];
  const sortOptions = ['Highest Value', 'Expiring Soon', 'Near Me'];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search perks — e.g. travel, coffee…"
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat === 'All Perks' ? '' : cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                (cat === 'All Perks' && !selectedCategory) || selectedCategory === cat
                  ? 'bg-secondary text-white'
                  : 'bg-background text-text-secondary hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;

