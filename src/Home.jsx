import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [tasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (!user) return null;

  const completed = tasks.filter((task) => task.status === "completed").length;
  const pending = tasks.length - completed;
  const dueToday = tasks.filter(
    (task) => task.due === new Date().toISOString().split("T")[0]
  ).length;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-6 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}</h1>
            <p className="text-sm text-gray-500">Here is your task summary for today.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <p className="mt-3 text-3xl font-bold text-gray-800">{tasks.length}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Completed</p>
              <p className="mt-3 text-3xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="mt-3 text-3xl font-bold text-orange-500">{pending}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">Due Today</p>
              <p className="mt-3 text-3xl font-bold text-indigo-600">{dueToday}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Today&apos;s Focus</h2>
            <p className="text-sm text-gray-500">
              Review your task board, update statuses, and stay on top of deadlines.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-sm text-indigo-600">Keep your task list updated</p>
              </div>
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm text-green-600">Complete tasks to improve progress</p>
              </div>
              <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
                <p className="text-sm text-yellow-600">Check your calendar for upcoming deadlines</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/tasks")}
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-indigo-700"
              >
                View Tasks
              </button>
              <button
                onClick={() => navigate("/calendar")}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Open Calendar
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
