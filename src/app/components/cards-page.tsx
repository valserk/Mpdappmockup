import { Link } from "react-router";
import { ArrowLeft, Plus, Lock, Eye, EyeOff, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";

export function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const cards = [
    {
      id: 1,
      type: "Debit Card",
      name: "Main Account",
      number: "4532 **** **** 4829",
      fullNumber: "4532 1234 5678 4829",
      expiry: "12/28",
      cvv: "123",
      color: "from-blue-600 to-blue-500",
      balance: 5247.89,
      status: "Active"
    },
    {
      id: 2,
      type: "Credit Card",
      name: "Travel Card",
      number: "5412 **** **** 8765",
      fullNumber: "5412 7890 1234 8765",
      expiry: "09/27",
      cvv: "456",
      color: "from-purple-600 to-purple-500",
      balance: 2340.00,
      limit: 5000.00,
      status: "Active"
    },
    {
      id: 3,
      type: "Virtual Card",
      name: "Online Shopping",
      number: "6011 **** **** 3456",
      fullNumber: "6011 2345 6789 3456",
      expiry: "06/26",
      cvv: "789",
      color: "from-emerald-600 to-emerald-500",
      balance: 450.00,
      status: "Active"
    }
  ];

  const cardDetails = selectedCard ? cards.find(c => c.id === selectedCard) : null;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <ArrowLeft className="size-6" />
            </Link>
            <h1 className="text-xl">My Cards</h1>
          </div>
          <button 
            onClick={() => alert("Add new card functionality")}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Cards Carousel */}
        <div className="mb-6">
          <div className="space-y-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className={`w-full bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all ${
                  selectedCard === card.id ? 'ring-4 ring-blue-300' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-sm opacity-90">{card.type}</p>
                    <p className="text-lg">{card.name}</p>
                  </div>
                  <CreditCard className="size-8 opacity-80" />
                </div>

                <div className="mb-6">
                  <p className="text-2xl tracking-wider font-mono">{card.number}</p>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs opacity-75">Expires</p>
                    <p className="text-lg">{card.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-75">Balance</p>
                    <p className="text-lg">€{card.balance.toFixed(2)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        {selectedCard && (
          <div className="space-y-3 mb-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-slate-50 rounded-2xl p-4">
              <h3 className="text-sm text-slate-600 mb-3">Card Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => alert("Freeze card functionality")}
                  className="p-4 bg-white rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
                >
                  <Lock className="size-6 text-blue-600" />
                  <span className="text-sm text-slate-900">Freeze Card</span>
                </button>
                <button
                  onClick={() => alert("View PIN functionality")}
                  className="p-4 bg-white rounded-xl hover:bg-slate-100 transition-colors flex flex-col items-center gap-2"
                >
                  <Eye className="size-6 text-blue-600" />
                  <span className="text-sm text-slate-900">View PIN</span>
                </button>
              </div>
            </div>

            {/* Card Details */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm text-slate-600">Card Details</h3>
                <button
                  onClick={() => setShowCardNumber(!showCardNumber)}
                  className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                >
                  {showCardNumber ? <EyeOff className="size-4 text-slate-600" /> : <Eye className="size-4 text-slate-600" />}
                </button>
              </div>
              
              {cardDetails && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Card Number</span>
                    <span className="font-mono text-slate-900">
                      {showCardNumber ? cardDetails.fullNumber : cardDetails.number}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Expiry Date</span>
                    <span className="text-slate-900">{cardDetails.expiry}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">CVV</span>
                    <span className="font-mono text-slate-900">
                      {showCardNumber ? cardDetails.cvv : '•••'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <span className="size-2 bg-green-600 rounded-full"></span>
                      {cardDetails.status}
                    </span>
                  </div>
                  {cardDetails.limit && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Credit Limit</span>
                      <span className="text-slate-900">€{cardDetails.limit.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              <button
                onClick={() => alert("Card settings opened")}
                className="w-full p-4 hover:bg-slate-100 transition-colors flex items-center justify-between border-b border-slate-200"
              >
                <span className="text-sm text-slate-900">Card Settings</span>
                <span className="text-slate-400">→</span>
              </button>
              <button
                onClick={() => alert("Transaction limits opened")}
                className="w-full p-4 hover:bg-slate-100 transition-colors flex items-center justify-between border-b border-slate-200"
              >
                <span className="text-sm text-slate-900">Transaction Limits</span>
                <span className="text-slate-400">→</span>
              </button>
              <button
                onClick={() => alert("Report lost/stolen opened")}
                className="w-full p-4 hover:bg-slate-100 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-red-600">Report Lost/Stolen</span>
                <span className="text-slate-400">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Add Card Options */}
        {!selectedCard && (
          <div className="space-y-3">
            <h3 className="text-sm text-slate-600 mb-3">Add New Card</h3>
            <button
              onClick={() => alert("Add physical card")}
              className="w-full p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-slate-100 hover:to-slate-200 transition-colors flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <CreditCard className="size-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 font-medium">Physical Card</p>
                <p className="text-sm text-slate-500">Order a new debit or credit card</p>
              </div>
            </button>
            <button
              onClick={() => alert("Add virtual card")}
              className="w-full p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-slate-100 hover:to-slate-200 transition-colors flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Smartphone className="size-6 text-emerald-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-slate-900 font-medium">Virtual Card</p>
                <p className="text-sm text-slate-500">Create instant virtual card</p>
              </div>
            </button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            💳 <span className="font-medium">Tip:</span> Tap on any card to view details and manage settings.
          </p>
        </div>
      </div>
    </div>
  );
}
