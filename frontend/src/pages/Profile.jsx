import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { putJson } from "../utils/api";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    designation: "",
    department: "",
    jobRole: "",
    education: "",
    experience: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("skillsetuUser");
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setProfile((p) => ({ ...p, ...u }));
      } catch {}
    }
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await putJson("/profile", profile);
      // update stored user
      localStorage.setItem("skillsetuUser", JSON.stringify(result));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Navbar */}
      <Navbar />

      {/* Background Glows */}
      <div className="fixed top-32 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main */}
      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/70 p-6 sm:p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-3xl">
                👤
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Complete Your Profile
            </h1>

            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Tell us about yourself so SkillSetu can create a personalized
              learning experience for you.
            </p>

          </div>

          {/* Progress */}
          <div className="mb-8">

            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Profile Setup</span>
              <span>100% Complete</span>
            </div>

            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
            </div>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name + Designation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  outline-none transition-all duration-300
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                  hover:border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Designation
                </label>

                <input
                  name="designation"
                  value={profile.designation}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Statistical Officer"
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  outline-none transition-all duration-300
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                  hover:border-slate-300"
                />
              </div>

            </div>

            {/* Department + Job Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Department
                </label>

                <input
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your department"
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  outline-none transition-all duration-300
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                  hover:border-slate-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Role
                </label>

                <input
                  name="jobRole"
                  value={profile.jobRole}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your job role"
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                  outline-none transition-all duration-300
                  focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                  hover:border-slate-300"
                />
              </div>

            </div>

            {/* Education */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Education
              </label>

              <input
                name="education"
                value={profile.education}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Bachelor's Degree in Statistics"
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                outline-none transition-all duration-300
                focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                hover:border-slate-300"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Professional Experience
              </label>

              <input
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                type="text"
                placeholder="e.g. 2 years"
                required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl
                outline-none transition-all duration-300
                focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                hover:border-slate-300"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600
              text-white py-4 rounded-xl font-semibold
              shadow-lg shadow-blue-200
              hover:shadow-xl hover:shadow-blue-300
              hover:-translate-y-0.5
              active:translate-y-0
              transition-all duration-300"
            >

              <span className="inline-flex items-center gap-2">
                Continue to Dashboard

                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>

            </button>

          </form>

          {error && (
            <p className="text-center text-sm text-red-600 mt-4">{error}</p>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Your profile information helps SkillSetu personalize your learning path.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Profile;