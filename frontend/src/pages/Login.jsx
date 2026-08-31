import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest, saveAuthSession } from "../utils/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      saveAuthSession(data);

      const storedProfile = JSON.parse(
        localStorage.getItem("skillsetuProfile") || "null"
      );

      if (storedProfile) {
        navigate("/dashboard");
        return;
      }

      navigate("/profile");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl text-2xl">
            🧠
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            SkillSetu
          </h1>

          <p className="text-slate-500 mt-2">
            AI-Powered Skill Intelligence Platform
          </p>

        </div>

        {/* Heading */}
        <div className="mb-7">

          <p className="text-sm font-semibold text-blue-600 mb-2">
            WELCOME BACK
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            Sign in
          </h2>

          <p className="text-slate-500 mt-2">
            Continue your personalized learning journey.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>

        </form>

        {/* Signup */}
        <p className="text-center text-sm text-slate-500 mt-7">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-blue-600 font-bold hover:underline"
          >
            Create Account
          </Link>

        </p>

        <p className="text-center text-xs text-slate-400 mt-8">
          © 2026 SkillSetu • AI-Powered Learning
        </p>

      </div>

    </div>
  );
}

export default Login;