import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest, saveAuthSession } from "../utils/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    jobRole: "",
    education: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      saveAuthSession(data);
      localStorage.removeItem("skillsetuProfile");

      alert("Account created successfully! 🎉");
      navigate("/profile");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl text-2xl">
            🧠
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Create your account
          </h1>

          <p className="text-slate-500 mt-2">
            Join SkillSetu and start your learning journey.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g. Student, Developer"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              placeholder="e.g. Software Developer"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Education
            </label>

            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g. B.Tech Computer Science"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-blue-600"
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="h-px bg-slate-200 flex-1"></div>

          <span className="text-xs text-slate-400">
            ALREADY A MEMBER?
          </span>

          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Login Link */}
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
  );
}

export default Signup;