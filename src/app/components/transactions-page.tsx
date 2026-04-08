import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Search, Filter } from "lucide-react";
import { useState } from "react";

export function TransactionsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);

  const allTransactions = [
    { id: 1, name: "Coffee Shop", amount: -4.50, date: "Apr 8, 2026", time: "9:30 AM", category: "Food & Drink", icon: "☕", type: "expense" },
    { id: 2, name: "Salary Deposit", amount: 2500.00, date: "Apr 7, 2026", time: "12:00 PM", category: "Income", icon: "💰", type: "income" },
    { id: 3, name: "Grocery Store", amount: -67.23, date: "Apr 6, 2026", time: "5:45 PM", category: "Groceries", icon: "🛒", type: "expense" },
    { id: 4, name: "Netflix Subscription", amount: -15.99, date: "Apr 5, 2026", time: "3:00 PM", category: "Entertainment", icon: "🎬", type: "expense" },
    { id: 5, name: "Freelance Payment", amount: 450.00, date: "Apr 4, 2026", time: "11:20 AM", category: "Income", icon: "💼", type: "income" },
    { id: 6, name: "Gas Station", amount: -42.00, date: "Apr 3, 2026", time: "8:15 AM", category: "Transportation", icon: "⛽", type: "expense" },
    { id: 7, name: "Restaurant", amount: -89.50, date: "Apr 2, 2026", time: "7:30 PM", category: "Food & Drink", icon: "🍽️", type: "expense" },
    { id: 8, name: "Online Shopping", amount: -124.99, date: "Apr 1, 2026", time: "2:15 PM", category: "Shopping", icon: "🛍️", type: "expense" },
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesFilter = 
      activeFilter === "all" || 
      (activeFilter === "income" && transaction.type === "income") ||
      (activeFilter === "expenses" && transaction.type === "expense");
    
    const matchesSearch = 
      searchQuery === "" ||
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-xl">Transactions</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 border border-white/30"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="px-6 py-4 flex gap-2 overflow-x-auto">
        <button 
          onClick={() => setActiveFilter("all")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            activeFilter === "all" 
              ? "bg-blue-600 text-white" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter("income")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            activeFilter === "income" 
              ? "bg-blue-600 text-white" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Income
        </button>
        <button 
          onClick={() => setActiveFilter("expenses")}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
            activeFilter === "expenses" 
              ? "bg-blue-600 text-white" 
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Expenses
        </button>
        <button 
          onClick={() => {
            setActiveFilter("all");
            setSearchQuery("");
          }}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm whitespace-nowrap hover:bg-slate-200 transition-colors flex items-center gap-1"
        >
          <Filter className="size-4" />
          Clear
        </button>
      </div>

      {/* Transactions List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <button
              key={transaction.id}
              onClick={() => setSelectedTransaction(transaction.id)}
              className="w-full flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="text-2xl">{transaction.icon}</div>
              <div className="flex-1 text-left">
                <p className="text-slate-900">{transaction.name}</p>
                <p className="text-sm text-slate-500">{transaction.category}</p>
                <p className="text-xs text-slate-400">{transaction.date} • {transaction.time}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg ${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
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

        {filteredTransactions.length === 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center text-slate-500 text-sm">
            No transactions found
          </div>
        )}

        {filteredTransactions.length > 0 && (
          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center text-slate-500 text-sm">
            End of transaction history
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div 
          onClick={() => setSelectedTransaction(null)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
        >
          {(() => {
            const transaction = allTransactions.find(t => t.id === selectedTransaction)!;
            return (
              <div 
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-2">{transaction.icon}</div>
                  <h3 className="text-xl text-slate-900">{transaction.name}</h3>
                  <p className="text-sm text-slate-500">{transaction.category}</p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Amount</span>
                    <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                      {transaction.amount > 0 ? '+' : ''}€{transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="text-slate-900">{transaction.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Time</span>
                    <span className="text-slate-900">{transaction.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="text-green-600">Completed</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}