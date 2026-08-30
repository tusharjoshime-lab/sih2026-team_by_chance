import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { useState } from "react";
import { postJson } from "../utils/api";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = { name, email, password };
      const data = await postJson("/auth/register", payload);
      localStorage.setItem("skillsetuToken", data.access_token);
      localStorage.setItem("skillsetuUser", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
=======

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/profile");
>>>>>>> f2a59c5 (Initial SkillSetu project)
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex bg-gradient-to-br from-indigo-600 via-blue-700 to-blue-800 p-10 text-white flex-col justify-between relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -left-20 w-56 h-56 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-0 -right-24 w-72 h-72 border border-white/10 rounded-full"></div>

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
              Your journey to
              <br />
              better skills
              <br />
              <span className="text-blue-200">
                starts here.
              </span>
            </h2>

            <p className="text-blue-100 mt-6 leading-relaxed max-w-sm">
              Create your SkillSetu account and get personalized insights,
              competency analysis and AI-powered learning recommendations.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                Personalized skill assessment
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                AI-powered course recommendations
              </div>

              <div className="flex items-center gap-3 text-sm text-blue-100">
                <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                Track your learning progress
              </div>

            </div>

          </div>

          <div className="relative z-10 mt-10">

            <p className="text-xs text-blue-200">
              AI-powered • Personalized • Skill-focused
            </p>

          </div>

        </div>

        {/* Right Side */}
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
              GET STARTED
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="text-slate-500 mt-2">
              Set up your account and begin your learning journey.
            </p>

          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  👤
                </span>

                <input
                  type="text"
<<<<<<< HEAD
                  value={name}
                  onChange={(e) => setName(e.target.value)}
=======
>>>>>>> f2a59c5 (Initial SkillSetu project)
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />

              </div>

            </div>

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
<<<<<<< HEAD
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
=======
>>>>>>> f2a59c5 (Initial SkillSetu project)
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  🔒
                </span>

                <input
                  type="password"
<<<<<<< HEAD
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
=======
>>>>>>> f2a59c5 (Initial SkillSetu project)
                  placeholder="Create a password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  required
                />

              </div>

            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">

              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-0.5 accent-blue-600"
              />

              <label
                htmlFor="terms"
                className="text-xs text-slate-500 leading-relaxed"
              >
                I agree to the terms and conditions and understand that
                SkillSetu will use my information to personalize my learning
                experience.
              </label>

            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Create Account →
            </button>

          </form>

<<<<<<< HEAD
          {error && (
            <p className="text-center text-sm text-red-600 mt-4">{error}</p>
          )}

=======
>>>>>>> f2a59c5 (Initial SkillSetu project)
          {/* Divider */}
          <div className="flex items-center gap-4 my-7">

            <div className="h-px bg-slate-200 flex-1"></div>

            <span className="text-xs text-slate-400">
              ALREADY A MEMBER?
            </span>

            <div className="h-px bg-slate-200 flex-1"></div>

          </div>

          {/* Login */}
          <p className="text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/"
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition"
            >
              Sign In
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

export default Signup;