import { Link } from "react-router";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  HelpCircle, 
  Info,
  ChevronRight,
  LogOut
} from "lucide-react";
import { useState } from "react";

export function SettingsPage() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  const handleSettingClick = (settingName: string) => {
    setMessageText(`${settingName} opened`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const handleLogout = () => {
    setShowLogout(false);
    setMessageText("Logged out successfully");
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", description: "Name, email, phone" },
        { icon: CreditCard, label: "Linked Accounts", description: "Manage your bank accounts" },
        { icon: Lock, label: "Security & Privacy", description: "Password, 2FA, biometrics" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", description: "Push, email, SMS alerts" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "FAQs and support" },
        { icon: Info, label: "About", description: "App version 2.1.0" },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="size-6" />
          </Link>
          <h1 className="text-xl">Settings</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 py-6">
        <button 
          onClick={() => handleSettingClick("Profile")}
          className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 flex items-center gap-4 hover:from-blue-100 hover:to-blue-200 transition-colors"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
            SJ
          </div>
          <div className="flex-1 text-left">
            <h2 className="text-lg text-slate-900">Sarah Johnson</h2>
            <p className="text-sm text-slate-600">sarah.johnson@email.com</p>
            <p className="text-xs text-slate-500 mt-1">Member since Jan 2024</p>
          </div>
        </button>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="text-sm text-slate-500 mb-3 px-2">{group.title}</h3>
            <div className="bg-slate-50 rounded-2xl overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => handleSettingClick(item.label)}
                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-100 transition-colors border-b border-slate-200 last:border-0"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <Icon className="size-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.description}</p>
                    </div>
                    <ChevronRight className="size-5 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Log Out Button */}
        <button 
          onClick={() => setShowLogout(true)}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="size-5" />
          Log Out
        </button>

        {/* Educational Note */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            📱 <span className="font-medium">Learning Mode:</span> This is a demo banking app for educational purposes. No real financial transactions are processed.
          </p>
        </div>
      </div>

      {/* Toast Message */}
      {showMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          {messageText}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogout && (
        <div 
          onClick={() => setShowLogout(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-xl text-slate-900 mb-2">Log Out?</h3>
            <p className="text-slate-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}