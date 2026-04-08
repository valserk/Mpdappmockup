import { Link } from "react-router";
import { 
  Eye, 
  EyeOff, 
  Send, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Settings,
  Receipt
} from "lucide-react";
import { useState } from "react";

export function HomePage() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const balance = 5247.89;

  const recentTransactions = [
    { id: 1, name: "Coffee Shop", amount: -4.50, date: "Today", type: "expense", icon: "☕" },
    { id: 2, name: "Salary Deposit", amount: 2500.00, date: "Yesterday", type: "income", icon: "💰" },
    { id: 3, name: "Grocery Store", amount: -67.23, date: "2 days ago", type: "expense", icon: "🛒" },
  ];

  const handleQuickAction = (action: string) => {
    setMessageText(`${action} feature opened!`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blue-600 to-blue-500">
      {/* Header */}
      <div className="px-6 py-4 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm opacity-90">Welcome back,</p>
            <h1 className="text-xl">Sarah Johnson</h1>
          </div>
          <Link to="/settings">
            <Settings className="size-6" />
          </Link>
        </div>

        {/* Balance Card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm opacity-90">Total Balance</p>
            <button 
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              {balanceVisible ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
            </button>
          </div>
          <p className="text-4xl mb-4">
            {balanceVisible ? `€${balance.toFixed(2)}` : "••••••"}
          </p>
          <p className="text-sm opacity-90">Account: •••• 4829</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Link to="/transfer" className="flex flex-col items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/30 transition-colors">
              <Send className="size-6" />
            </div>
            <span className="text-xs">Send</span>
          </Link>
          <Link to="/request" className="flex flex-col items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/30 transition-colors">
              <ArrowDownRight className="size-6" />
            </div>
            <span className="text-xs">Request</span>
          </Link>
          <Link to="/cards" className="flex flex-col items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/30 transition-colors">
              <CreditCard className="size-6" />
            </div>
            <span className="text-xs">Cards</span>
          </Link>
          <Link to="/transactions" className="flex flex-col items-center gap-2">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl hover:bg-white/30 transition-colors">
              <Receipt className="size-6" />
            </div>
            <span className="text-xs">History</span>
          </Link>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="flex-1 bg-white rounded-t-[2rem] px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg text-slate-900">Recent Activity</h2>
          <Link to="/transactions" className="text-sm text-blue-600">
            See All
          </Link>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <button
              key={transaction.id}
              onClick={() => {
                setMessageText(`Transaction details for ${transaction.name}`);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 2000);
              }}
              className="w-full flex items-center gap-4 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="text-2xl">{transaction.icon}</div>
              <div className="flex-1 text-left">
                <p className="text-slate-900">{transaction.name}</p>
                <p className="text-sm text-slate-500">{transaction.date}</p>
              </div>
              <div className="text-right">
                <p className={`${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount > 0 ? '' : '-'}€
                  {Math.abs(transaction.amount).toFixed(2)}
                </p>
                {transaction.amount > 0 ? (
                  <ArrowDownRight className="size-4 text-green-600 ml-auto" />
                ) : (
                  <ArrowUpRight className="size-4 text-slate-400 ml-auto" />
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-900">
            💡 <span className="font-medium">Tip:</span> Set up automatic savings to reach your goals faster!
          </p>
        </div>
      </div>

      {/* Toast Message */}
      {showMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          {messageText}
        </div>
      )}
    </div>
  );
}