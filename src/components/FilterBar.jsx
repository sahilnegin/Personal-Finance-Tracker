const FilterBar = ({ filter, setFilter }) => {
  const categories = [
    'all',
    'Food',
    'Transportation',
    'Entertainment',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Salary',
    'Freelance',
    'Investment',
    'Business',
    'Other'
  ];

  const types = [
    { value: 'all', label: 'All' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilter(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Type
        </label>
        <div className="flex space-x-1">
          {types.map(type => (
            <button
              key={type.value}
              onClick={() => handleFilterChange('type', type.value)}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                filter.type === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Category
        </label>
        <select
          value={filter.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="select-field text-sm"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {(filter.category !== 'all' || filter.type !== 'all') && (
        <div className="flex items-end">
          <button
            onClick={() => setFilter({ category: 'all', type: 'all' })}
            className="btn-secondary text-sm px-3 py-1"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar; 