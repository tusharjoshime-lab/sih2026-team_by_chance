import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postJson } from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await postJson("/auth/login", { email, password });
      localStorage.setItem("skillsetuToken", data.access_token);
      localStorage.setItem("skillsetuUser", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-white flex-col justify-between relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-56 h-56 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-10 -left-24 w-64 h-64 border border-white/10 rounded-full"></div>

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                🧠
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  SkillSetu
                </h1>

                <p className="text-xs text-blue-100">
                  Skill Intelligence Platform
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Build the skills
              <br />
              that move you
              <br />
              <span className="text-blue-200">
                forward.
              </span>
            </h2>

            <p className="text-blue-100 mt-6 leading-relaxed max-w-sm">
              Discover your competency gaps, get AI-powered learning
              recommendations and grow your professional skills.
            </p>

          </div>

          {/* Bottom */}
          <div className="relative z-10 mt-10">

            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-200 border-2 border-blue-700"></div>
                <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-blue-700"></div>
                <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-700"></div>
              </div>

              <span className="text-sm text-blue-100">
                Empowering continuous learning
              </span>
            </div>

            <p className="text-xs text-blue-200">
              AI-powered • Personalized • Skill-focused
            </p>

          </div>
        </div>

        {/* Right Side - Login */}
        <div className="p-8 sm:p-10 md:p-12">

          {/* Mobile Logo */}
          <div className="md:hidden text-center mb-8">

            <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl text-2xl shadow-lg shadow-blue-600/20">
              🧠
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-4">
              SkillSetu
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              AI-Powered Skill Intelligence Platform
            </p>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <p className="text-sm font-semibold text-blue-600 mb-2">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-2">
              Continue your personalized learning journey.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔒
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />

              </div>

            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-blue-600"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-500"
              >
                Remember me
              </label>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Sign In →
            </button>

          </form>

          {error && (
            <p className="text-center text-sm text-red-600 mt-4">{error}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-slate-200 flex-1"></div>

            <span className="text-xs text-slate-400">
              OR
            </span>

            <div className="h-px bg-slate-200 flex-1"></div>

          </div>

          {/* Signup */}
          <p className="text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition"
            >
              Create Account
            </Link>

          </p>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-8">
            © 2026 SkillSetu • AI-Powered Learning
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;