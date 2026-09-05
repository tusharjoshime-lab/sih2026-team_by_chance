import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postJson, saveAuthSession } from '../utils/api';

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
      const data = await postJson('/auth/login', { email, password });
      saveAuthSession(data);
      navigate('/assessment');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT */}
        <div className="hidden md:flex bg-gradient-to-br from-orange-600 via-orange-700 to-amber-700 p-10 text-stone-900 flex-col justify-between relative overflow-hidden">

          <div className="absolute -top-20 -right-20 w-56 h-56 border border-white/10 rounded-full" />
          <div className="absolute bottom-10 -left-24 w-64 h-64 border border-white/10 rounded-full" />

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-12">

              <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl">
                🧠
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  SkillSetu
                </h1>

                <p className="text-xs text-orange-100">
                  Government Skill Intelligence Platform
                </p>
              </div>

            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Build public-service
              <br />
              capabilities for
              <br />
              <span className="text-orange-200">
                better governance.
              </span>
            </h2>

            <p className="text-orange-100 mt-6 leading-relaxed max-w-sm">
              Assess government-role competencies, identify gaps,
              receive iGOT-aligned learning recommendations and
              track continuous capacity building.
            </p>

          </div>

          <div className="relative z-10 mt-10">

            <div className="flex items-center gap-3 mb-4">

              <div className="flex -space-x-2">

                <div className="w-8 h-8 rounded-full bg-orange-200 border-2 border-orange-700" />

                <div className="w-8 h-8 rounded-full bg-amber-200 border-2 border-orange-700" />

                <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-700" />

              </div>

              <span className="text-sm text-orange-100">
                Empowering continuous learning
              </span>

            </div>

            <p className="text-xs text-orange-200">
              Government-focused • Personalized • AI-assisted
            </p>

          </div>

        </div>

        {/* RIGHT */}
        <div className="p-8 sm:p-10 md:p-12">

          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">

            <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-600 rounded-2xl text-2xl shadow-lg">
              🧠
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mt-4">
              SkillSetu
            </h1>

            <p className="text-sm text-stone-500 mt-1">
              AI-Powered Government Skill Intelligence Platform
            </p>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <p className="text-sm font-semibold text-orange-600 mb-2">
              WELCOME BACK
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Sign in to your account
            </h2>

            <p className="text-stone-500 mt-2">
              Continue your public-service learning journey.
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <div className="flex items-center justify-between mb-2">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                  🔒
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  required
                />

              </div>

            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-orange-600"
              />

              <label
                htmlFor="remember"
                className="text-sm text-stone-500"
              >
                Remember me
              </label>

            </div>

            {/* LOGIN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-stone-900 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-600/20 hover:bg-orange-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >

              {loading
                ? "Signing in..."
                : "Sign In →"}

            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-slate-200 flex-1" />

            <span className="text-xs text-stone-500">
              OR
            </span>

            <div className="h-px bg-slate-200 flex-1" />

          </div>

          {/* SIGNUP */}
          <p className="text-center text-sm text-stone-500">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-orange-600 font-bold hover:text-orange-700 hover:underline"
            >
              Create Account
            </Link>

          </p>

          <p className="text-center text-xs text-stone-500 mt-8">
            © 2026 SkillSetu • AI-Powered Learning
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;