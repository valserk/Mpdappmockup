import { Link } from "react-router";
import { ArrowLeft, User, DollarSign, MessageSquare } from "lucide-react";
import { useState } from "react";

export function TransferPage() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const recentRecipients = [
    { id: 1, name: "John Doe", email: "john@email.com", avatar: "👨" },
    { id: 2, name: "Emma Smith", email: "emma@email.com", avatar: "👩" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", avatar: "👨‍💼" },
  ];

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
      setRecipient("");
      setNote("");
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-xl">Send Money</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Recent Recipients */}
        <div className="mb-6">
          <h2 className="text-sm text-slate-600 mb-3">Recent Recipients</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentRecipients.map((person) => (
              <button
                key={person.id}
                onClick={() => setRecipient(person.email)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] transition-colors ${
                  recipient === person.email 
                    ? 'bg-blue-100 border-2 border-blue-600' 
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="text-3xl">{person.avatar}</div>
                <p className="text-xs text-center text-slate-700">{person.name.split(' ')[0]}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Form */}
        <form onSubmit={handleTransfer} className="space-y-4">
          {/* Recipient */}
          <div>
            <label className="block text-sm text-slate-600 mb-2">Recipient</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter email or phone"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-slate-600 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-2xl">€</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 text-2xl"
                required
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[10, 25, 50, 100].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value.toString())}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors"
                >
                  €{value}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm text-slate-600 mb-2">Note (Optional)</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 size-5 text-slate-400" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this for?"
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
            </div>
          </div>

          {/* Available Balance */}
          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-900">
              Available Balance: <span className="font-semibold">€5,247.89</span>
            </p>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Send Money
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 mx-6 max-w-sm text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl text-slate-900 mb-2">Transfer Successful!</h3>
              <p className="text-slate-600 mb-4">
                €{amount} sent to {recipient}
              </p>
              <p className="text-sm text-slate-500">
                This is a demo. No actual transfer was made.
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600">
            🔒 <span className="font-medium">Secure Transfer:</span> All transactions are encrypted and protected.
          </p>
        </div>
      </div>
    </div>
  );
}