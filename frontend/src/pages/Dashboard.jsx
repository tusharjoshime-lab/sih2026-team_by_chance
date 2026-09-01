import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { apiRequest, getStoredUser } from "../utils/api";

function useCountUp(target, duration = 1200, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let raf;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(target * eased));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

function getSkillIcon(domain = "", skill = "") {
  const text = `${domain} ${skill}`.toLowerCase();

  if (
    text.includes("stat") ||
    text.includes("data") ||
    text.includes("analysis")
  ) {
    return "📊";
  }

  if (
    text.includes("technical") ||
    text.includes("program") ||
    text.includes("python") ||
    text.includes("coding") ||
    text.includes("software")
  ) {
    return "💻";
  }

  if (
    text.includes("governance") ||
    text.includes("policy") ||
    text.includes("digital")
  ) {
    return "🏛️";
  }

  if (
    text.includes("behaviour") ||
    text.includes("behavior") ||
    text.includes("communication") ||
    text.includes("leadership")
  ) {
    return "🤝";
  }

  return "🎯";
}

function getSkillDescription(skill) {
  if (skill.gap > 0) {
    return `${skill.gap}% improvement recommended`;
  }

  return "Required competency achieved";
}

function getCourseForSkill(skill) {
  const text = `${skill.domain} ${skill.skill}`.toLowerCase();

  if (
    text.includes("python") ||
    text.includes("program") ||
    text.includes("technical") ||
    text.includes("coding")
  ) {
    return {
      id: "python",
      title: "Data Analysis with Python",
      domain: "Technical",
      level: "Intermediate",
      duration: "6 Hours",
      icon: "🐍",
    };
  }

  if (
    text.includes("stat") ||
    text.includes("data") ||
    text.includes("analysis")
  ) {
    return {
      id: "statistics",
      title: "Statistical Methods & Applications",
      domain: "Statistical",
      level: "Intermediate",
      duration: "5 Hours",
      icon: "📈",
    };
  }

  if (
    text.includes("governance") ||
    text.includes("policy") ||
    text.includes("digital")
  ) {
    return {
      id: "governance",
      title: "Digital Governance Fundamentals",
      domain: "Digital Governance",
      level: "Beginner",
      duration: "4 Hours",
      icon: "🏛️",
    };
  }

  return {
    id: "general",
    title: `${skill.skill} Fundamentals`,
    domain: skill.domain || "Professional Skills",
    level: "Beginner",
    duration: "4 Hours",
    icon: "🎯",
  };
}

function Dashboard() {
  const storedUser = getStoredUser();

  const profileData = JSON.parse(
    localStorage.getItem("skillsetuProfile") || "null"
  );

  const userData = profileData || storedUser;

  const [mounted, setMounted] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [competencyData, setCompetencyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const skillsRef = useRef(null);

  // =========================
  // PAGE ANIMATION
  // =========================

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true));

    return () => cancelAnimationFrame(timer);
  }, []);

  // =========================
  // COMPETENCY API
  // =========================

  useEffect(() => {
    const fetchCompetencyData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/competency/gaps");

        setCompetencyData(response);
      } catch (err) {
        console.error("COMPETENCY ERROR:", err);

        setError(
          err?.message ||
            "Unable to load competency data. Please complete your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompetencyData();
  }, []);

  // =========================
  // SKILL ANIMATION
  // =========================

  useEffect(() => {
    const element = skillsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // =========================
  // REAL BACKEND DATA
  // =========================

  const overallReadiness =
    competencyData?.overallReadinessPercent ?? 0;

  const skillGaps = competencyData?.skillGaps || [];

  const skills = skillGaps.map((skill) => ({
    name: skill.skill,
    score: Math.max(0, Math.min(100, skill.currentLevel)),
    icon: getSkillIcon(skill.domain, skill.skill),
    description: getSkillDescription(skill),
    domain: skill.domain,
    requiredLevel: skill.requiredLevel,
    gap: skill.gap,
    status: skill.status,
  }));

  const gapCount = skillGaps.filter(
    (skill) => skill.status === "gap"
  ).length;

  const overallScore = useCountUp(
    overallReadiness,
    1400,
    mounted && !loading
  );

  // =========================
  // RECOMMENDED COURSES
  // =========================

  const courses = skillGaps
    .filter((skill) => skill.status === "gap")
    .slice(0, 3)
    .map(getCourseForSkill);

  // Remove duplicate courses
  const uniqueCourses = courses.filter(
    (course, index, self) =>
      index === self.findIndex((item) => item.id === course.id)
  );

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 overflow-x-hidden">
      {/* ================= GLOBAL STYLES ================= */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(.94);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-18px, 12px, 0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(56, 189, 248, .35);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(56, 189, 248, 0);
          }
        }

        @keyframes progress {
          from {
            width: 0;
          }
        }

        .dashboard-up {
          animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both;
        }

        .dashboard-scale {
          animation: fadeScale .7s cubic-bezier(.16,1,.3,1) both;
        }

        .float-animation {
          animation: float 10s ease-in-out infinite;
        }

        .pulse-animation {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }

        .skill-progress {
          animation: progress 1.2s cubic-bezier(.16,1,.3,1) both;
        }

        .glass {
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .soft-shadow {
          box-shadow:
            0 1px 2px rgba(15,23,42,.03),
            0 12px 35px rgba(15,23,42,.06);
        }

        .premium-shadow {
          box-shadow:
            0 20px 50px rgba(15,23,42,.10);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <Navbar />

      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-3xl float-animation" />

        <div className="absolute top-[40%] -left-48 w-[450px] h-[450px] bg-indigo-300/10 rounded-full blur-3xl float-animation" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="dashboard-up relative overflow-hidden rounded-[30px] bg-[#091f49] premium-shadow mb-7"
          style={{ animationDelay: "50ms" }}
        >

          <div className="absolute inset-0 pointer-events-none">

            <div className="absolute -right-28 -top-40 w-[520px] h-[520px] rounded-full bg-blue-500/20 blur-3xl float-animation" />

            <div className="absolute -left-24 -bottom-40 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[.06]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />

            <div className="absolute right-[25%] top-1/2 w-40 h-40 rounded-full bg-cyan-300/10 blur-3xl" />

          </div>

          <div className="relative z-10 p-7 sm:p-9 md:p-12">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

              <div className="max-w-2xl">

                <div
                  className="dashboard-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.08] backdrop-blur-md px-3.5 py-2 text-[11px] font-bold tracking-[.12em] text-blue-100"
                  style={{ animationDelay: "180ms" }}
                >
                  <span className="pulse-animation w-2 h-2 rounded-full bg-cyan-300" />
                  AI-POWERED SKILL INTELLIGENCE
                </div>

                <h1
                  className="dashboard-up mt-6 text-3xl sm:text-4xl md:text-[3.15rem] font-bold tracking-tight leading-[1.08] text-white"
                  style={{ animationDelay: "260ms" }}
                >
                  Welcome back
                  {userData?.name ? `, ${userData.name}` : ""}{" "}
                  <span className="inline-block">👋</span>
                </h1>

                <p
                  className="dashboard-up mt-5 max-w-xl text-[15px] md:text-base leading-7 text-blue-100/75"
                  style={{ animationDelay: "340ms" }}
                >
                  Your personalized skill intelligence dashboard is ready.
                  Track your competency, discover gaps and follow AI-powered
                  recommendations to grow faster.
                </p>

                <div
                  className="dashboard-up flex flex-wrap items-center gap-2.5 mt-7"
                  style={{ animationDelay: "420ms" }}
                >

                  {userData?.designation && (
                    <span className="rounded-xl border border-white/10 bg-white/[.08] px-3.5 py-2 text-xs font-semibold text-blue-50 backdrop-blur-md">
                      {userData.designation}
                    </span>
                  )}

                  {userData?.department && (
                    <span className="rounded-xl border border-white/10 bg-white/[.08] px-3.5 py-2 text-xs font-semibold text-blue-100/80 backdrop-blur-md">
                      {userData.department}
                    </span>
                  )}

                  {competencyData?.jobRole && (
                    <span className="rounded-xl border border-white/10 bg-white/[.08] px-3.5 py-2 text-xs font-semibold text-blue-100/80 backdrop-blur-md">
                      {competencyData.jobRole}
                    </span>
                  )}

                  <span className="rounded-xl border border-white/10 bg-white/[.08] px-3.5 py-2 text-xs font-semibold text-blue-100/80 backdrop-blur-md">
                    Personalized Learning
                  </span>

                </div>
              </div>

              {/* SCORE CIRCLE */}

              <div
                className="dashboard-scale flex justify-center lg:justify-end shrink-0"
                style={{ animationDelay: "350ms" }}
              >

                <div className="relative w-44 h-44 sm:w-48 sm:h-48">

                  <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-xl" />

                  <div className="absolute inset-0 rounded-full border border-white/10" />

                  <div className="absolute inset-3 rounded-full border border-white/[.08]" />

                  <div className="absolute inset-6 rounded-full bg-white/[.06] backdrop-blur-md border border-white/10 flex flex-col items-center justify-center">

                    <span className="text-[10px] uppercase tracking-[.18em] font-bold text-blue-200">
                      Skill Score
                    </span>

                    <div className="mt-2 text-5xl font-bold text-white tracking-tight">

                      {loading ? "—" : overallScore}

                      {!loading && (
                        <span className="text-xl text-blue-200">
                          %
                        </span>
                      )}

                    </div>

                    <span className="mt-1 text-xs text-blue-200/70">
                      Overall competency
                    </span>

                  </div>

                  <div className="absolute top-1/2 -right-1 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,.8)]" />

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="mb-7 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">

          {/* SCORE */}

          <div className="dashboard-up group glass soft-shadow rounded-2xl border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Overall Score
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? "—" : `${overallScore}%`}
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🎯
              </div>

            </div>

            <div className="mt-5 h-1.5 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-[1400ms]"
                style={{
                  width: mounted && !loading
                    ? `${overallReadiness}%`
                    : "0%",
                }}
              />

            </div>

            <p className="mt-3 text-xs font-medium text-emerald-600">
              ↑ Keep improving
            </p>

          </div>

          {/* SKILL GAPS */}

          <div className="dashboard-up group glass soft-shadow rounded-2xl border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Skill Gaps
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? "—" : gapCount}
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                ⚡
              </div>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Areas requiring attention
            </p>

            <div className="flex gap-1.5 mt-4">

              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 flex-1 rounded-full ${
                    item <= Math.min(gapCount, 3)
                      ? "bg-indigo-500"
                      : "bg-slate-100"
                  }`}
                />
              ))}

              <span
                className={`h-1.5 flex-1 rounded-full ${
                  gapCount > 3
                    ? "bg-indigo-500"
                    : "bg-slate-100"
                }`}
              />

            </div>

          </div>

          {/* COURSES */}

          <div className="dashboard-up group glass soft-shadow rounded-2xl border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AI Courses
                </p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {loading ? "—" : uniqueCourses.length}
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🤖
              </div>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Personalized for you
            </p>

            <p className="mt-2 text-xs font-semibold text-blue-600">
              AI recommendations →
            </p>

          </div>

          {/* LEARNING */}

          <div className="dashboard-up group glass soft-shadow rounded-2xl border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Learning Status
                </p>

                <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  {loading
                    ? "Loading..."
                    : overallReadiness >= 75
                    ? "Excellent"
                    : overallReadiness >= 50
                    ? "On Track"
                    : "Needs Focus"}
                </h3>

              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                ✓
              </div>

            </div>

            <p className="mt-5 text-sm text-slate-500">
              Continue your learning journey
            </p>

          </div>

        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_.95fr] gap-6 mb-7">

          {/* =================================================
              COMPETENCY
          ================================================= */}

          <section
            ref={skillsRef}
            className="dashboard-up glass soft-shadow rounded-2xl border border-slate-200/80 p-6 md:p-7"
            style={{ animationDelay: "430ms" }}
          >

            <div className="flex items-start justify-between gap-4 mb-8">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    Competency Overview
                  </h2>

                  <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-bold tracking-wider text-blue-600">
                    AI
                  </span>

                </div>

                <p className="mt-1.5 text-sm text-slate-500">
                  Your current competency levels
                </p>

              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Current level
              </div>

            </div>

            {loading ? (

              <div className="space-y-6">

                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="animate-pulse">

                    <div className="flex justify-between mb-3">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-slate-200" />

                        <div>
                          <div className="h-3 w-28 bg-slate-200 rounded" />
                          <div className="h-2 w-36 bg-slate-100 rounded mt-2" />
                        </div>

                      </div>

                      <div className="h-3 w-8 bg-slate-200 rounded" />

                    </div>

                    <div className="h-2 bg-slate-100 rounded-full" />

                  </div>
                ))}

              </div>

            ) : skills.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">

                <div className="text-3xl mb-3">
                  📊
                </div>

                <p className="font-semibold text-slate-800">
                  No competency data available
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Complete your profile to generate your competency analysis.
                </p>

                <Link
                  to="/profile"
                  className="inline-flex mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition"
                >
                  Complete Profile
                </Link>

              </div>

            ) : (

              <div className="space-y-6">

                {skills.map((skill, index) => (

                  <div key={`${skill.domain}-${skill.name}`} className="group">

                    <div className="flex items-center justify-between mb-2.5">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-base group-hover:scale-105 group-hover:bg-blue-50 transition-all">
                          {skill.icon}
                        </div>

                        <div>

                          <p className="text-sm font-semibold text-slate-800">
                            {skill.name}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {skill.description}
                          </p>

                        </div>

                      </div>

                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {skill.score}%
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

                      <div
                        className="skill-progress h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400"
                        style={{
                          width: skillsVisible
                            ? `${skill.score}%`
                            : "0%",
                          animationDelay: `${index * 120}ms`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            )}

            {/* AI INSIGHT */}

            {!loading && skillGaps.length > 0 && (

              <div className="relative mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5">

                <div className="absolute -right-10 -top-10 w-28 h-28 bg-blue-200/30 rounded-full blur-2xl" />

                <div className="relative">

                  <div className="flex items-center gap-2">

                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm shadow-lg shadow-blue-600/20">
                      ✦
                    </div>

                    <div>

                      <p className="text-sm font-bold text-slate-900">
                        AI Insight
                      </p>

                      <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                        Personalized analysis
                      </p>

                    </div>

                  </div>

                  {skillGaps[0].status === "gap" ? (

                    <p className="mt-4 text-sm leading-6 text-slate-600">

                      <span className="font-semibold text-slate-800">
                        {skillGaps[0].skill}
                      </span>{" "}
                      is currently your biggest competency gap.
                      Improve this area to increase your overall readiness.

                    </p>

                  ) : (

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      Great work! Your required competency levels are currently
                      being met.
                    </p>

                  )}

                  {skillGaps[0].status === "gap" && (

                    <Link
                      to={`/course-quiz?course=${
                        getCourseForSkill(skillGaps[0]).id
                      }`}
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-blue-600 hover:text-blue-800 transition"
                    >
                      Improve this skill
                      <span>→</span>
                    </Link>

                  )}

                </div>

              </div>

            )}

          </section>

          {/* =================================================
              COURSES
          ================================================= */}

          <section
            className="dashboard-up glass soft-shadow rounded-2xl border border-slate-200/80 p-6 md:p-7"
            style={{ animationDelay: "500ms" }}
          >

            <div className="flex items-start justify-between mb-8">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-lg font-bold tracking-tight text-slate-900">
                    AI Recommended Courses
                  </h2>

                  <span className="rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-bold tracking-wider text-indigo-600">
                    SMART
                  </span>

                </div>

                <p className="mt-1.5 text-sm text-slate-500">
                  Curated according to your skill gaps
                </p>

              </div>

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
                🤖
              </div>

            </div>

            {loading ? (

              <div className="space-y-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-2xl border border-slate-200 p-4"
                  >

                    <div className="flex gap-4">

                      <div className="w-12 h-12 rounded-xl bg-slate-200" />

                      <div className="flex-1">

                        <div className="h-3 w-40 bg-slate-200 rounded" />

                        <div className="h-2 w-24 bg-slate-100 rounded mt-3" />

                        <div className="h-2 w-full bg-slate-100 rounded mt-5" />

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            ) : uniqueCourses.length === 0 ? (

              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">

                <div className="text-3xl mb-3">
                  🎉
                </div>

                <p className="font-semibold text-slate-800">
                  No courses needed right now
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your current competency levels meet the available
                  requirements.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {uniqueCourses.map((course) => (

                  <div
                    key={course.id}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 p-4 hover:border-blue-200 hover:bg-blue-50/30 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >

                    <div className="flex gap-4">

                      <div className="relative shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-2 transition-all duration-300">
                        {course.icon}
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="font-bold text-sm text-slate-900 leading-5 truncate">
                              {course.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              {course.domain}
                            </p>

                          </div>

                          <span className="shrink-0 rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-1 text-[10px] font-bold text-blue-600">
                            {course.level}
                          </span>

                        </div>

                        <div className="flex items-center justify-between mt-4">

                          <span className="text-[11px] font-medium text-slate-400">
                            ⏱ {course.duration}
                          </span>

                          <Link
                            to={`/course-quiz?course=${course.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-all"
                          >
                            Start learning
                            <span className="group-hover:translate-x-1 transition-transform">
                              →
                            </span>
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

            <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="w-2 h-2 rounded-full bg-emerald-500" />

                <span className="text-xs font-medium text-slate-500">
                  Recommendations updated by AI
                </span>

              </div>

              <span className="text-[10px] font-bold text-slate-400">
                LIVE
              </span>

            </div>

          </section>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section
          className="dashboard-up relative overflow-hidden rounded-2xl bg-[#091f49] premium-shadow"
          style={{ animationDelay: "580ms" }}
        >

          <div className="absolute inset-0 pointer-events-none">

            <div className="absolute -right-24 -top-32 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl float-animation" />

            <div className="absolute left-1/3 -bottom-32 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl" />

          </div>

          <div className="relative z-10 p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div className="flex items-start gap-4">

                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/[.08] border border-white/10 backdrop-blur-md flex items-center justify-center text-xl">
                  🧠
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="text-lg md:text-xl font-bold text-white">
                      Ready to test your knowledge?
                    </h2>

                    <span className="rounded-full bg-cyan-300/10 border border-cyan-300/20 px-2 py-1 text-[9px] font-bold tracking-wider text-cyan-200">
                      AI QUIZ
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-blue-200/70 max-w-xl">
                    Upload your learning material and let SkillSetu generate
                    a personalized quiz to measure your understanding.
                  </p>

                </div>

              </div>

              <Link
                to="/course-quiz"
                className="group inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#091f49] shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Generate AI Quiz

                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>

              </Link>

            </div>

          </div>

        </section>

        {/* FOOTER */}

        <div className="text-center py-7">

          <p className="text-[11px] text-slate-400">
            SkillSetu • AI-Powered Skill Intelligence Platform
          </p>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;