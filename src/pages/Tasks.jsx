import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Tasks = () => {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    due: "",
    priority: "Medium",
    category: "General",
    status: "pending",
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const saveTasks = (updated) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const handleAddTask = () => {
    if (!newTask.title) return;
    const task = { ...newTask, id: Date.now() };
    saveTasks([...tasks, task]);
    setNewTask({
      title: "",
      due: "",
      priority: "Medium",
      category: "General",
      status: "pending",
    });
    setShowForm(false);
  };

  const handleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            status: t.status === "completed" ? "pending" : "completed",
          }
        : t
    );
    saveTasks(updated);
  };

  const handleDelete = (id) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const filtered = tasks.filter((t) => {
    const matchSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" ||
      t.status === statusFilter.toLowerCase();
    const matchPriority =
      priorityFilter === "All Priorities" || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto p-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>
            <p className="text-sm text-gray-500">
              {filtered.length} tasks found
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + New Task
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-gray-800">New Task</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="col-span-2 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <input
                type="date"
                value={newTask.due}
                onChange={(e) =>
                  setNewTask({ ...newTask, due: e.target.value })
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              >
                <option>General</option>
                <option>Assignment</option>
                <option>Project</option>
                <option>Exam</option>
              </select>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleAddTask}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-4 flex items-center gap-4">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            <option>All Status</option>
            <option>pending</option>
            <option>completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Task List */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <span className="mb-3 text-5xl">🕐</span>
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm">
              Create your first task to get started
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              + Create Task
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => handleComplete(task.id)}
                    className="h-4 w-4 accent-indigo-600"
                  />
                  <div>
                    <p
                      className={`font-medium ${
                        task.status === "completed"
                          ? "text-gray-400 line-through"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.due} · {task.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tasks;