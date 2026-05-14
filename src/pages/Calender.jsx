// Calendar.jsx shows a calendar and highlights days that have tasks.
// The person can click a date to see tasks due on that day.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Calendar = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [tasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // If no user is logged in, go back to the login page.
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  // Compute the current month and year for rendering the calendar.
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const selectedStr = selectedDate.toISOString().split("T")[0];
  const tasksOnSelected = tasks.filter((t) => t.due === selectedStr);

  const hasTask = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.some((t) => t.due === dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
          <p className="text-sm text-gray-500">
            View your tasks by deadline
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="col-span-2 rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ‹
              </button>
              <h2 className="font-bold text-gray-800">
                {monthName} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ›
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <p key={d} className="text-xs font-medium text-gray-400">
                  {d}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array(firstDay)
                .fill(null)
                .map((_, i) => (
                  <div key={`empty-${i}`} className="h-10 w-full" />
                ))}
              {Array(daysInMonth)
                .fill(null)
                .map((_, i) => {
                  const day = i + 1;
                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(new Date(year, month, day))
                      }
                      className={`relative flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                        isToday(day)
                          ? "bg-indigo-600 text-white"
                          : selectedDate.getDate() === day &&
                            selectedDate.getMonth() === month
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {day}
                      {hasTask(day) && (
                        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-400" />
                      )}
                    </button>
                  );
                })}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" />
                Has Tasks
              </div>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="text-indigo-600 hover:underline"
              >
                Today
              </button>
            </div>
          </div>

          {/* Selected Date Tasks */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span>📅</span>
              <p className="font-bold text-gray-800">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            {tasksOnSelected.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <span className="mb-2 text-3xl">📅</span>
                <p className="text-sm">No tasks on this date</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasksOnSelected.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-gray-100 p-3"
                  >
                    <p className="font-medium text-gray-800">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.priority} · {task.category}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;