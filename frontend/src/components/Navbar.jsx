import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "▦",
    },
    {
      name: "Courses & Quiz",
      path: "/course-quiz",
      icon: "◈",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "○",
    },
    {
      name: "Admin",
      path: "/admin",
      icon: "▣",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Brand */}
          <Link
            to="/dashboard"
            className="flex items-center gap-3 group"
          >

            {/* Logo */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600
                            flex items-center justify-center shadow-lg shadow-blue-200
                            group-hover:scale-105 transition-transform duration-300">

              <span className="text-white font-bold text-xl">
                S
              </span>

            </div>

            {/* Brand Text */}
            <div className="leading-tight">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Skill<span className="text-blue-600">Setu</span>
              </h1>

              <p className="text-[10px] font-medium text-slate-400 tracking-wide">
                AI SKILL INTELLIGENCE
              </p>
            </div>

          </Link>


          {/* Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/80 rounded-xl p-1.5 gap-1">

            {navItems.map((item) => (

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative flex items-center gap-2 px-4 py-2.5 rounded-lg
                  text-sm font-semibold transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-white/60"
                  }`
                }
              >

                <span className="text-base">
                  {item.icon}
                </span>

                {item.name}

              </NavLink>

            ))}

          </div>


          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* AI Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg
                            bg-blue-50 border border-blue-100">

              <span className="relative flex h-2.5 w-2.5">

                <span className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-blue-400 opacity-75">
                </span>

                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600">
                </span>

              </span>

              <span className="text-xs font-semibold text-blue-700">
                AI Active
              </span>

            </div>


            {/* User Avatar */}
            <Link
              to="/profile"
              className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-600
                         flex items-center justify-center text-white font-bold text-sm
                         shadow-sm hover:scale-105 transition-transform duration-200"
            >
              U
            </Link>

          </div>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;