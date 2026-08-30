import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const profileData = JSON.parse(
    localStorage.getItem("skillsetuProfile")
  );

  const skills = [
    { name: "Statistical", score: 72, icon: "📊" },
    { name: "Technical", score: 55, icon: "💻" },
    { name: "Digital Governance", score: 42, icon: "🏛️" },
    { name: "Behavioural", score: 68, icon: "🤝" },
  ];

  const courses = [
    {
      id: "python",
      title: "Data Analysis with Python",
      domain: "Technical",
      level: "Intermediate",
      duration: "6 Hours",
      icon: "🐍",
    },
    {
      id: "statistics",
      title: "Statistical Methods & Applications",
      domain: "Statistical",
      level: "Intermediate",
      duration: "5 Hours",
      icon: "📈",
    },
    {
      id: "governance",
      title: "Digital Governance Fundamentals",
      domain: "Digital Governance",
      level: "Beginner",
      duration: "4 Hours",
      icon: "🏛️",
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEF3FB]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO / WELCOME */}
        <section className="relative overflow-hidden rounded-[28px] bg-[#0B2559] p-8 md:p-12 mb-8 shadow-[0_20px_60px_-15px_rgba(11,37,89,0.55)]">

          {/* Layered ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-32 w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -left-20 -bottom-32 w-[360px] h-[360px] bg-indigo-400/10 rounded-full blur-3xl" />
            <div className="absolute right-1/3 top-1/2 w-56 h-56 bg-cyan-300/10 rounded-full blur-2xl" />
            {/* subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="text-white">

              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide mb-5 backdrop-blur-md border border-white/10 text-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                AI-POWERED LEARNING
              </div>

              <h2 className="text-3xl md:text-[2.75rem] leading-[1.1] font-bold tracking-tight">
                Welcome back
                {profileData?.name
                  ? `, ${profileData.name}`
                  : ""}
                <span className="inline-block ml-2">👋</span>
              </h2>

              <p className="text-blue-200/80 mt-4 max-w-xl leading-relaxed text-[15px]">
                Track your skills, discover competency gaps and improve
                your career with personalized AI recommendations.
              </p>

              {profileData?.designation && (
                <div className="flex items-center gap-2.5 mt-6 text-sm text-blue-100">
                  <span className="bg-white/[0.08] px-3.5 py-2 rounded-lg border border-white/10 backdrop-blur-sm font-medium">
                    {profileData.designation}
                  </span>

                  {profileData.department && (
                    <>
                      <span className="text-blue-400/60">•</span>
                      <span className="text-blue-200/70">{profileData.department}</span>
                    </>
                  )}
                </div>
              )}

            </div>

            <div className="hidden md:flex relative w-32 h-32 shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 to-transparent border border-white/15 backdrop-blur-md shadow-inner" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent" />
              <span className="relative m-auto text-6xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">🚀</span>
            </div>

          </div>
        </section>


        {/* OVERVIEW CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

          {/* Overall Score */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_40px_-16px_rgba(37,99,235,0.18)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[13px] font-medium text-slate-500 tracking-wide">
                  Overall Skill Score
                </p>

                <h3 className="text-[2.5rem] font-bold text-slate-900 mt-2 tracking-tight leading-none">
                  59<span className="text-xl text-slate-400 font-semibold">%</span>
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center text-xl shadow-lg shadow-blue-500/30">
                🎯
              </div>

            </div>

            <div className="mt-6 h-[6px] bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.5)]"
                style={{ width: "59%" }}
              />
            </div>

            <p className="text-xs text-blue-600 font-semibold mt-3 tracking-wide">
              Keep improving your skills
            </p>

          </div>


          {/* Skill Gaps */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_40px_-16px_rgba(37,99,235,0.18)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[13px] font-medium text-slate-500 tracking-wide">
                  Skill Gaps
                </p>

                <h3 className="text-[2.5rem] font-bold text-slate-900 mt-2 tracking-tight leading-none">
                  4
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/30">
                ⚠️
              </div>

            </div>

            <p className="text-sm text-slate-500 mt-6">
              Areas that need attention
            </p>

            <div className="flex gap-1.5 mt-4">
              <span className="w-8 h-1.5 bg-blue-600 rounded-full" />
              <span className="w-8 h-1.5 bg-blue-600 rounded-full" />
              <span className="w-8 h-1.5 bg-blue-600 rounded-full" />
              <span className="w-8 h-1.5 bg-slate-150 bg-slate-100 rounded-full" />
            </div>

          </div>


          {/* Courses */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_40px_-16px_rgba(37,99,235,0.18)] hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-[13px] font-medium text-slate-500 tracking-wide">
                  Recommended Courses
                </p>

                <h3 className="text-[2.5rem] font-bold text-slate-900 mt-2 tracking-tight leading-none">
                  8
                </h3>
              </div>

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-sky-500/30">
                🤖
              </div>

            </div>

            <p className="text-sm text-slate-500 mt-6">
              AI-selected for your growth
            </p>

            <p className="text-xs text-blue-700 font-semibold mt-3 tracking-wide">
              Personalized recommendations →
            </p>

          </div>

        </section>


        {/* TWO COLUMN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* COMPETENCY */}
          <section className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.06)]">

            <div className="flex items-center justify-between mb-8">

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Competency Overview
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Your current competency levels
                </p>
              </div>

              <span className="text-[11px] font-semibold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full tracking-wide border border-blue-100/80">
                AI ANALYSIS
              </span>

            </div>

            <div className="space-y-6">

              {skills.map((skill) => (

                <div key={skill.name}>

                  <div className="flex items-center justify-between mb-2.5">

                    <div className="flex items-center gap-2.5">

                      <span className="text-base w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50">
                        {skill.icon}
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {skill.name}
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      {skill.score}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-100 h-[7px] rounded-full overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.score}%` }}
                    />

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100/70">

              <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <span>💡</span> AI Insight
              </p>

              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                Digital Governance is currently your biggest competency gap.
                Consider starting the recommended course.
              </p>

            </div>

          </section>


          {/* COURSES */}
          <section className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_24px_-12px_rgba(15,23,42,0.06)]">

            <div className="flex items-center justify-between mb-8">

              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  AI Recommended Courses
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  Personalized based on your skill gaps
                </p>
              </div>

              <span className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-lg">
                🤖
              </span>

            </div>


            <div className="space-y-3.5">

              {courses.map((course) => (

                <div
                  key={course.title}
                  className="group relative border border-slate-200/80 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-[0_8px_20px_-10px_rgba(37,99,235,0.25)] transition-all duration-300"
                >

                  <div className="flex gap-4">

                    <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 group-hover:border-blue-200 transition duration-300">
                      {course.icon}
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-3">

                        <div>

                          <h4 className="font-semibold text-slate-900 leading-snug">
                            {course.title}
                          </h4>

                          <p className="text-[13px] text-slate-500 mt-0.5">
                            {course.domain}
                          </p>

                        </div>

                        <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full h-fit whitespace-nowrap border border-blue-100/70">
                          {course.level}
                        </span>

                      </div>


                      <div className="flex items-center justify-between mt-4">

                        <span className="text-xs text-slate-400 font-medium">
                          ⏱ {course.duration}
                        </span>

                        <Link
                          to={`/course-quiz?course=${course.id}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:translate-x-1 transition-all"
                        >
                          View Course →
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>


        {/* BOTTOM CTA */}
        <section className="relative overflow-hidden bg-[#0B2559] rounded-2xl shadow-[0_20px_50px_-20px_rgba(11,37,89,0.5)] p-6 md:p-8">

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute left-1/4 -bottom-20 w-56 h-56 bg-indigo-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-2.5">

                <span className="w-9 h-9 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-lg backdrop-blur-sm">
                  🧠
                </span>

                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                  Test Your Knowledge
                </h3>

              </div>

              <p className="text-sm text-blue-200/70 mt-2.5 max-w-md leading-relaxed">
                Upload your learning material and let AI generate a
                personalized quiz for you.
              </p>

            </div>

            <Link
              to="/course-quiz"
              className="inline-flex items-center justify-center bg-white text-[#0B2559] px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              Generate AI Quiz →
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;