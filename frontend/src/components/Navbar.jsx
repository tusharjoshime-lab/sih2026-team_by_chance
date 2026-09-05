import { NavLink, Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "▦" },
    { name: "Skill Gaps", path: "/future-skills", icon: "◎" },
    { name: "Courses", path: "/courses", icon: "🎓" },
    { name: "PDF → AI Quiz", path: "/material-quiz", icon: "📄" },
    { name: "Progress", path: "/progress", icon: "↗" },
  ];

  const streak = Number(
    localStorage.getItem("skillsetuStreak") || 7
  );

  const handleLogout = () => {
  localStorage.removeItem("skillsetuToken");
  localStorage.removeItem("skillsetuProfile");
  localStorage.removeItem("skillsetuGovernmentProfile");
  localStorage.removeItem("skillsetuAssessment");
  localStorage.removeItem("skillsetuQuizResult");
  localStorage.removeItem("skillsetuFutureSkills");

  navigate("/");
};
  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-[#fffdf9]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="flex min-h-20 items-center justify-between gap-4 py-3">

          {/* LOGO */}
          <Link
            to="/dashboard"
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-600 to-amber-500 text-xl font-black text-white shadow-lg shadow-orange-200 transition-transform group-hover:scale-105">
              S
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-extrabold tracking-tight text-stone-900">
                Skill
                <span className="text-orange-600">
                  Setu
                </span>
              </h1>

              <p className="text-[10px] font-semibold tracking-wide text-stone-400">
                GOVERNMENT CAPACITY BUILDING
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden flex-1 items-center justify-center gap-2 lg:flex">

            {/* STREAK */}
            <Link
              to="/progress"
              className="mr-2 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-800 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              🔥 {streak} Day Streak
            </Link>

            {/* NAV ITEMS */}
            <div className="flex items-center gap-1 rounded-xl bg-orange-50 p-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-white text-orange-700 shadow-sm"
                        : "text-stone-500 hover:bg-white hover:text-stone-900"
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* MOBILE STREAK */}
            <Link
              to="/progress"
              className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800 lg:hidden"
            >
              🔥 {streak}
            </Link>

            {/* MOBILE PDF QUIZ */}
            <Link
              to="/material-quiz"
              className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700 lg:hidden"
            >
              📄 AI Quiz
            </Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-bold text-red-600 transition-all hover:bg-red-100 hover:text-red-700"
            >
              <span>↪</span>
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>
        </div>

        {/* MOBILE NAV */}
        <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold ${
                  isActive
                    ? "bg-orange-600 text-white"
                    : "bg-orange-50 text-stone-600"
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;