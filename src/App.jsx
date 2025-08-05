import { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCard from './components/SummaryCard';
import FilterBar from './components/FilterBar';
import ThemeToggle from './components/ThemeToggle';
import Charts from './components/Charts';
import { api } from './services/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState({ category: 'all', type: 'all' });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await api.getTransactions();
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    fetchTransactions();
  }, []);



  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = async (transaction) => {
    try {
      const newTransaction = await api.createTransaction(transaction);
      setTransactions([newTransaction, ...transactions]);
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(transactions.filter(transaction => transaction._id !== id));
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const categoryMatch = filter.category === 'all' || transaction.category === filter.category;
    const typeMatch = filter.type === 'all' || transaction.type === filter.type;
    return categoryMatch && typeMatch;
  });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-white' : 'text-gray-700'}`}>Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg text-red-600 mb-4`}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add Transaction
              </h2>
              <AddTransactionForm onAddTransaction={addTransaction} />
            </div>
          </div>

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
