import { Link } from "react-router";
import { ArrowLeft, User, DollarSign, MessageSquare, Copy, Share2 } from "lucide-react";
import { useState } from "react";

export function RequestPage() {
  const [amount, setAmount] = useState("");
  const [requestFrom, setRequestFrom] = useState("");
  const [note, setNote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const recentContacts = [
    { id: 1, name: "John Doe", email: "john@email.com", avatar: "👨" },
    { id: 2, name: "Emma Smith", email: "emma@email.com", avatar: "👩" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", avatar: "👨‍💼" },
  ];

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAmount("");
      setRequestFrom("");
      setNote("");
    }, 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://bankapp.demo/pay/sarah-johnson");
    alert("Payment link copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-xl">Request Money</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setShowQRCode(true)}
            className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-colors"
          >
            <div className="text-4xl mb-2">📱</div>
            <p className="text-sm text-slate-900 font-medium">Show QR Code</p>
            <p className="text-xs text-slate-600">Let others scan</p>
          </button>
          <button
            onClick={handleCopyLink}
            className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-colors"
          >
            <div className="text-4xl mb-2">🔗</div>
            <p className="text-sm text-slate-900 font-medium">Copy Link</p>
            <p className="text-xs text-slate-600">Share payment link</p>
          </button>
        </div>

        {/* Recent Contacts */}
        <div className="mb-6">
          <h2 className="text-sm text-slate-600 mb-3">Request From</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentContacts.map((person) => (
              <button
                key={person.id}
                onClick={() => setRequestFrom(person.email)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] transition-colors ${
                  requestFrom === person.email 
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

        {/* Request Form */}
        <form onSubmit={handleRequest} className="space-y-4">
          {/* Request From */}
          <div>
            <label className="block text-sm text-slate-600 mb-2">Request From</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="email"
                value={requestFrom}
                onChange={(e) => setRequestFrom(e.target.value)}
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
              {[20, 50, 100, 200].map((value) => (
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
            <label className="block text-sm text-slate-600 mb-2">What's this for?</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 size-5 text-slate-400" />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g., Dinner split, Concert tickets..."
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
                required
              />
            </div>
          </div>

          {/* Request Button */}
          <button
            type="submit"
            className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Send Request
          </button>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 mx-6 max-w-sm text-center">
              <div className="text-6xl mb-4">✉️</div>
              <h3 className="text-xl text-slate-900 mb-2">Request Sent!</h3>
              <p className="text-slate-600 mb-4">
                Request for €{amount} sent to {requestFrom}
              </p>
              <p className="text-sm text-slate-500">
                This is a demo. No actual request was sent.
              </p>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRCode && (
          <div 
            onClick={() => setShowQRCode(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full text-center"
            >
              <h3 className="text-xl text-slate-900 mb-4">My Payment QR Code</h3>
              
              {/* QR Code Placeholder */}
              <div className="bg-slate-100 rounded-xl p-8 mb-4">
                <div className="bg-white p-6 rounded-lg border-4 border-slate-900">
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-sm ${
                          Math.random() > 0.5 ? 'bg-slate-900' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-2">Sarah Johnson</p>
              <p className="text-xs text-slate-500 mb-6">sarah.johnson@email.com</p>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="size-4" />
                  Copy Link
                </button>
                <button
                  onClick={() => {
                    setShowQRCode(false);
                    alert("Share functionality opened!");
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="size-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600">
            💡 <span className="font-medium">Tip:</span> You can request money from anyone with a QR code or payment link!
          </p>
        </div>
      </div>
    </div>
  );
}
