import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
//saving details
  const [name, setName] = useState(() => {
    const stored = localStorage.getItem("user");
    const parsed = stored ? JSON.parse(stored) : null;
    return parsed?.name || "";
  });
  const [tasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);
//saving accounts
  const handleSave = () => {
    const updated = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
//for deleting accounts
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      localStorage.removeItem("user");
      localStorage.removeItem("tasks");
      navigate("/");
    }
  };

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status !== "completed").length;

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-sm text-gray-500">Manage your account</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-gray-800">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  value={user?.email || ""}
                  disabled
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Member Since
                </label>
                <input
                  value={user?.joined || ""}
                  disabled
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500"
                />
              </div>

              <button
                onClick={handleSave}
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {saved ? "✓ Saved!" : "💾 Save Changes"}
              </button>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="mb-1 font-bold text-red-500">Danger Zone</h3>
              <p className="mb-4 text-sm text-gray-500">
                Once you delete your account, there is no going back. All
                your tasks and data will be permanently deleted.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="rounded-lg border border-red-300 px-5 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                🗑️ Delete Account
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            <div className="rounded-xl bg-indigo-600 p-6 text-white shadow-sm">
              <h2 className="mb-4 font-bold">Your Progress</h2>
              <p className="text-sm text-indigo-200">Total Tasks</p>
              <p className="mb-4 text-4xl font-bold">{tasks.length}</p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-indigo-200">Completed</p>
                  <p className="font-bold">{completed}</p>
                </div>
                <div>
                  <p className="text-indigo-200">Pending</p>
                  <p className="font-bold">{pending}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-800">
                Account Status
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-medium text-gray-800">Student</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Storage</span>
                  <span className="font-medium text-gray-800">Local</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;