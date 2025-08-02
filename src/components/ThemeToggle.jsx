import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="relative inline-flex items-center justify-center w-14 h-8 bg-gray-100 dark:bg-gray-800 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-md"
      aria-label="Toggle dark mode"
    >
      <div
        className={`absolute left-1 w-6 h-6 bg-white dark:bg-gray-700 rounded-full shadow-lg transform transition-all duration-300 ${
          darkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
      
      <div className="flex items-center justify-between w-full px-2">
        <Sun className={`w-4 h-4 text-amber-500 transition-all duration-300 ${darkMode ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`} />
        <Moon className={`w-4 h-4 text-blue-500 transition-all duration-300 ${darkMode ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle; 