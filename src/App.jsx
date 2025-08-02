import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCard from './components/SummaryCard';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';
import Charts from './components/Charts';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ category: 'all', type: 'all' });
  const [darkMode, setDarkMode] = useState(false);

  // Sample data for demo purposes
  const sampleTransactions = [
    {
      id: 1,
      title: 'Salary',
      amount: 5000,
      category: 'Salary',
      type: 'income',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      title: 'Freelance Project',
      amount: 1200,
      category: 'Freelance',
      type: 'income',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      title: 'Grocery Shopping',
      amount: 150,
      category: 'Food',
      type: 'expense',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      title: 'Gas Station',
      amount: 45,
      category: 'Transportation',
      type: 'expense',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      title: 'Netflix Subscription',
      amount: 15,
      category: 'Entertainment',
      type: 'expense',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      title: 'Electric Bill',
      amount: 120,
      category: 'Bills',
      type: 'expense',
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      title: 'Investment Dividend',
      amount: 300,
      category: 'Investment',
      type: 'income',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      title: 'Restaurant Dinner',
      amount: 85,
      category: 'Food',
      type: 'expense',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Load sample data if no saved data exists
      setTransactions(sampleTransactions);
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const filteredTransactions = transactions.filter(transaction => {
    const categoryMatch = filter.category === 'all' || transaction.category === filter.category;
    const typeMatch = filter.type === 'all' || transaction.type === filter.type;
    return categoryMatch && typeMatch;
  });

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Personal Finance Tracker
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your income and expenses with ease
              </p>
            </div>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* Compact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard 
            title="Total Balance" 
            amount={balance} 
            type="balance"
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <SummaryCard 
            title="Total Income" 
            amount={totalIncome} 
            type="income"
            className="bg-gradient-to-br from-green-500 to-green-600"
          />
          <SummaryCard 
            title="Total Expenses" 
            amount={totalExpenses} 
            type="expense"
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Add Transaction Form */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add Transaction
              </h2>
              <AddTransactionForm onAddTransaction={addTransaction} />
            </div>
          </div>

          {/* Transaction List */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Transactions
                </h2>
                <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                  {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <FilterBar filter={filter} setFilter={setFilter} />
              
              <TransactionList 
                transactions={filteredTransactions} 
                onDeleteTransaction={deleteTransaction} 
              />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-6">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                📊 Analytics & Insights
              </h2>
              <span className="text-sm text-gray-600 dark:text-gray-400 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full font-medium">
                Real-time Data
              </span>
            </div>
            <Charts transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
