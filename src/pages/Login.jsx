import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      setError("User not found. Please sign up.");
      return;
    }
    localStorage.setItem("user", JSON.stringify(found));
    navigate("/home");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) {
      setError("Account already exists. Please log in.");
      return;
    }
    const newUser = {
      name,
      email,
      password,
      joined: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/home");
  };

  const features = [
    {
      title: "Task Management",
      desc: "Create, organize, and complete tasks with ease",
    },
    {
      title: "Calendar View",
      desc: "Visualize all your deadlines in one place",
    },
    {
      title: "Progress Tracking",
      desc: "Monitor your productivity and completion rates",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-800">
                MoringaTaskFlow
              </p>
              <p className="text-xs text-gray-500">
                Student Task Management System
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-1 text-2xl font-bold text-gray-800">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              {isSignUp
                ? "Sign up to start organizing your workload"
                : "Log in to manage your academic tasks"}
            </p>

            <form
              className="space-y-4"
              onSubmit={isSignUp ? handleSignUp : handleLogin}
            >
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@moringa.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-500">
              {isSignUp
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                className="font-semibold text-indigo-600 hover:underline"
              >
                {isSignUp ? "Log in" : "Sign up"}
              </button>
            </p>
          </div>

          {/* Bottom checks */}
          <div className="mt-6 space-y-2">
            {[
              "Organize assignments and deadlines",
              "Track progress across modules",
              "Visualize upcoming deadlines",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <span className="text-indigo-600">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden flex-1 flex-col justify-center bg-indigo-600 p-16 lg:flex">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Stay Organized, Stay Ahead
        </h2>
        <p className="mb-12 text-lg text-indigo-200">
          Centralize your academic workload and never miss a deadline again.
        </p>
        <div className="space-y-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white/10 p-5 backdrop-blur-sm"
            >
              <h3 className="font-bold text-white">{f.title}</h3>
              <p className="text-sm text-indigo-200">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;