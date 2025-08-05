import { useState } from 'react';
import { 
  Utensils, 
  Car, 
  Film, 
  ShoppingBag, 
  FileText, 
  Heart, 
  GraduationCap, 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  Building2, 
  Tag,
  Trash2
} from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': Utensils,
      'Transportation': Car,
      'Entertainment': Film,
      'Shopping': ShoppingBag,
      'Bills': FileText,
      'Healthcare': Heart,
      'Education': GraduationCap,
      'Salary': DollarSign,
      'Freelance': Briefcase,
      'Investment': TrendingUp,
      'Business': Building2,
      'Other': Tag
    };
    const IconComponent = icons[category] || Tag;
    return <IconComponent className="w-5 h-5" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Food': 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      'Transportation': 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      'Entertainment': 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      'Shopping': 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
      'Bills': 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
      'Healthcare': 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
      'Education': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
      'Salary': 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      'Freelance': 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Investment': 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
      'Business': 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
      'Other': 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
    };
    return colors[category] || colors['Other'];
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          No transactions yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
          Start tracking your finances by adding your first income or expense transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className={`group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 ${
            hoveredId === transaction._id ? 'shadow-lg border-blue-200 dark:border-blue-700' : ''
          }`}
          onMouseEnter={() => setHoveredId(transaction._id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${getCategoryColor(transaction.category)}`}>
                {getCategoryIcon(transaction.category)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1 truncate">
                  {transaction.title}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                    {transaction.category}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="font-medium">{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <span
                  className={`font-bold text-xl ${
                    transaction.type === 'income' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatAmount(transaction.amount)}
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {transaction.type === 'income' ? 'Income' : 'Expense'}
                </div>
              </div>
              
              <button
                onClick={() => onDeleteTransaction(transaction._id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                title="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList; 