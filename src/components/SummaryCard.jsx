import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCard = ({ title, amount, type, className = '' }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const getIcon = (type) => {
    const icons = {
      balance: CreditCard,
      income: TrendingUp,
      expense: TrendingDown
    };
    const IconComponent = icons[type] || CreditCard;
    return <IconComponent className="w-6 h-6" />;
  };

  const getAmountColor = (type, amount) => {
    if (type === 'balance') {
      return amount >= 0 ? 'text-green-50' : 'text-red-50';
    }
    return 'text-white';
  };

  const getAmountPrefix = (type, amount) => {
    if (type === 'balance') {
      return amount >= 0 ? '+' : '-';
    }
    return '';
  };

  const getStatusText = (type, amount) => {
    if (type === 'balance') {
      return amount >= 0 ? 'Positive balance' : 'Negative balance';
    }
    return type === 'income' ? 'Total income' : 'Total expenses';
  };

  return (
    <div className={`relative overflow-hidden rounded-xl p-4 text-white ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl">
            {getIcon(type)}
          </div>
          <div className="text-right">
            <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wider">
              {title}
            </h3>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className={`text-2xl font-bold ${getAmountColor(type, amount)}`}>
            {getAmountPrefix(type, amount)}{formatAmount(amount)}
          </div>
          
          <div className="text-xs text-white/70 font-medium">
            {getStatusText(type, amount)}
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
      
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
    </div>
  );
};

export default SummaryCard; 