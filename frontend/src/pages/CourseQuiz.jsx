import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function CourseQuiz() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");

  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const courseTitles = {
    python: "Data Analysis with Python",
    statistics: "Statistical Methods & Applications",
    governance: "Digital Governance Fundamentals",
  };

  const currentCourse =
    courseTitles[courseId] || "Learning & Assessment";

  const handleGenerateQuiz = () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setIsGenerating(true);
    setScore(null);
    setSelectedAnswer("");

    setTimeout(() => {
      setIsGenerating(false);
      setQuizStarted(true);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setQuizStarted(false);
      setScore(null);
      setSelectedAnswer("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (
        allowedTypes.includes(file.type) ||
        /\.(pdf|pptx|docx)$/i.test(file.name)
      ) {
        setSelectedFile(file);
        setQuizStarted(false);
        setScore(null);
        setSelectedAnswer("");
      } else {
        alert("Please upload a PDF, PPTX or DOCX file.");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(1)} MB`;
    }

    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 overflow-x-hidden">

      {/* ===================== STYLES ===================== */}

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-15px, 12px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(220%);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes successPop {
          0% {
            opacity: 0;
            transform: scale(.85);
          }
          70% {
            transform: scale(1.04);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .page-up {
          animation: fadeUp .7s cubic-bezier(.16,1,.3,1) both;
        }

        .page-scale {
          animation: fadeScale .7s cubic-bezier(.16,1,.3,1) both;
        }

        .floating {
          animation: float 10s ease-in-out infinite;
        }

        .success-pop {
          animation: successPop .55s cubic-bezier(.16,1,.3,1) both;
        }

        .glass {
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .soft-shadow {
          box-shadow:
            0 1px 2px rgba(15,23,42,.03),
            0 16px 40px rgba(15,23,42,.06);
        }

        .premium-shadow {
          box-shadow:
            0 20px 60px rgba(9,31,73,.15);
        }

        .spinner {
          animation: spin .8s linear infinite;
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

      {/* ===================== BACKGROUND ===================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="floating absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-3xl" />

        <div className="floating absolute -bottom-48 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-300/10 blur-3xl" />

      </div>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="page-up relative overflow-hidden rounded-[30px] bg-[#091f49] premium-shadow mb-7"
          style={{ animationDelay: "50ms" }}
        >

          <div className="absolute inset-0 pointer-events-none">

            <div className="floating absolute -right-24 -top-32 w-[430px] h-[430px] rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute -left-20 -bottom-32 w-[380px] h-[380px] rounded-full bg-indigo-400/10 blur-3xl" />

            <div
              className="absolute inset-0 opacity-[.055]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />

          </div>

          <div className="relative z-10 p-7 sm:p-9 md:p-11">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              <div className="max-w-3xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.08] backdrop-blur-md px-3.5 py-2 text-[10px] sm:text-[11px] font-bold tracking-[.12em] text-blue-100">

                  <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />

                  AI LEARNING & ASSESSMENT

                </div>

                <h1
                  className="page-up mt-5 text-3xl sm:text-4xl md:text-[2.8rem] font-bold leading-[1.08] tracking-tight text-white"
                  style={{ animationDelay: "180ms" }}
                >
                  {currentCourse}
                </h1>

                <p
                  className="page-up mt-4 max-w-2xl text-sm sm:text-[15px] leading-7 text-blue-100/75"
                  style={{ animationDelay: "260ms" }}
                >
                  Upload your learning material and let SkillSetu
                  transform it into an interactive AI-powered assessment.
                </p>

              </div>

              {/* AI ICON */}

              <div
                className="page-scale hidden sm:flex w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-[24px] border border-white/10 bg-white/[.07] backdrop-blur-md items-center justify-center text-4xl shadow-inner"
                style={{ animationDelay: "300ms" }}
              >
                🧠
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROGRESS STEPS
        ===================================================== */}

        <div
          className="page-up flex items-center justify-center mb-7"
          style={{ animationDelay: "120ms" }}
        >

          <div className="flex items-center w-full max-w-xl">

            {/* STEP 1 */}

            <div className="flex items-center gap-2">

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                  ${
                    selectedFile
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                      : "bg-white text-blue-600 border-blue-200"
                  }`}
              >
                {selectedFile ? "✓" : "1"}
              </div>

              <span className="hidden sm:block text-xs font-semibold text-slate-600">
                Upload
              </span>

            </div>

            <div
              className={`h-px flex-1 mx-3 transition-colors ${
                selectedFile ? "bg-blue-400" : "bg-slate-200"
              }`}
            />

            {/* STEP 2 */}

            <div className="flex items-center gap-2">

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                  ${
                    quizStarted
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
              >
                2
              </div>

              <span className="hidden sm:block text-xs font-semibold text-slate-600">
                Generate
              </span>

            </div>

            <div
              className={`h-px flex-1 mx-3 transition-colors ${
                quizStarted ? "bg-blue-400" : "bg-slate-200"
              }`}
            />

            {/* STEP 3 */}

            <div className="flex items-center gap-2">

              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all
                  ${
                    score !== null
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : "bg-white text-slate-400 border-slate-200"
                  }`}
              >
                3
              </div>

              <span className="hidden sm:block text-xs font-semibold text-slate-600">
                Result
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            UPLOAD
        ===================================================== */}

        <section
          className="page-up glass soft-shadow rounded-3xl border border-slate-200/80 p-6 sm:p-7 md:p-8 mb-7"
          style={{ animationDelay: "200ms" }}
        >

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                  Generate AI Quiz
                </h2>

                <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-bold tracking-wider text-blue-600">
                  AI
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-2">
                Upload your notes, presentation or document.
              </p>

            </div>

            <div className="inline-flex self-start sm:self-auto items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-[11px] font-bold shadow-lg shadow-blue-500/20">
              ✦ AI Powered
            </div>

          </div>

          {/* DROP ZONE */}

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-7 sm:p-10 md:p-12 text-center transition-all duration-300
              ${
                dragActive
                  ? "border-blue-500 bg-blue-50 scale-[1.01]"
                  : "border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 hover:border-blue-400 hover:bg-blue-50/60"
              }`}
          >

            <div className="absolute -right-12 -top-12 w-44 h-44 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">

              {/* ICON */}

              <div className="mx-auto w-20 h-20 rounded-[22px] bg-white border border-blue-100 shadow-xl shadow-blue-100/50 flex items-center justify-center text-4xl">
                {selectedFile ? "📄" : "☁️"}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                {selectedFile
                  ? "Material ready for AI analysis"
                  : "Drop your learning material here"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {selectedFile
                  ? "You can replace the file anytime."
                  : "or choose a file from your computer"}
              </p>

              <p className="mt-2 text-[11px] font-medium text-slate-400">
                PDF • PPTX • DOCX
              </p>

              {/* BUTTON */}

              <label className="inline-block mt-6 cursor-pointer">

                <span className="inline-flex items-center gap-2 rounded-xl bg-[#091f49] text-white px-6 py-3.5 text-sm font-bold shadow-xl shadow-blue-900/15 hover:bg-[#123073] hover:-translate-y-0.5 transition-all duration-200">
                  📁
                  {selectedFile ? "Choose Another File" : "Choose File"}
                </span>

                <input
                  type="file"
                  accept=".pdf,.pptx,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />

              </label>

              {/* SELECTED FILE */}

              {selectedFile && (

                <div className="page-scale relative mt-7 max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200/50">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xl text-white shadow-lg shadow-blue-500/20">
                      📄
                    </div>

                    <div className="text-left flex-1 min-w-0">

                      <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600">
                        Selected material
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800 truncate">
                        {selectedFile.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatFileSize(selectedFile.size)}
                      </p>

                    </div>

                    <div className="hidden sm:flex w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 items-center justify-center text-sm">
                      ✓
                    </div>

                  </div>

                  {/* GENERATE */}

                  <button
                    type="button"
                    onClick={handleGenerateQuiz}
                    disabled={isGenerating}
                    className="relative overflow-hidden w-full mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >

                    {isGenerating ? (

                      <span className="flex items-center justify-center gap-3">

                        <span className="spinner w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />

                        AI is analyzing your material...

                      </span>

                    ) : (
                      "✨ Generate AI Quiz →"
                    )}

                  </button>

                </div>

              )}

            </div>

          </div>

          {/* INFO ROW */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">

              <p className="text-xs font-bold text-slate-700">
                📄 Multiple formats
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                PDF, PPTX & DOCX
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">

              <p className="text-xs font-bold text-slate-700">
                🤖 AI Generated
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                Questions from your material
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5">

              <p className="text-xs font-bold text-slate-700">
                ⚡ Instant Assessment
              </p>

              <p className="text-[11px] text-slate-400 mt-1">
                Test your understanding
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            RECOMMENDED COURSE
        ===================================================== */}

        <section
          className="page-up glass soft-shadow rounded-3xl border border-slate-200/80 p-6 sm:p-7 md:p-8 mb-7"
          style={{ animationDelay: "280ms" }}
        >

          <div className="flex items-start justify-between gap-4 mb-6">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                  Recommended Course
                </h2>

                <span className="rounded-md bg-amber-50 px-2 py-1 text-[9px] font-bold tracking-wider text-amber-600">
                  AI PICK
                </span>

              </div>

              <p className="text-sm text-slate-500 mt-2">
                Based on your current competency gaps.
              </p>

            </div>

            <div className="hidden sm:flex w-11 h-11 rounded-xl bg-emerald-50 items-center justify-center text-xl">
              🐍
            </div>

          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-5 sm:p-6 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">

            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-blue-100/50 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div className="flex gap-4">

                <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🐍
                </div>

                <div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Data Analysis with Python
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 max-w-xl leading-6">
                    Improve your technical and data analysis skills through
                    practical learning and hands-on exercises.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">

                    <span className="text-[10px] font-bold rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1.5">
                      Technical
                    </span>

                    <span className="text-[10px] font-bold rounded-lg bg-purple-50 text-purple-600 border border-purple-100 px-3 py-1.5">
                      Intermediate
                    </span>

                    <span className="text-[10px] font-bold rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100 px-3 py-1.5">
                      ⏱ 6 Hours
                    </span>

                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="shrink-0 rounded-xl bg-[#091f49] text-white px-5 py-3 text-sm font-bold shadow-lg hover:bg-[#123073] hover:-translate-y-0.5 transition-all"
              >
                Start Course →
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            QUIZ
        ===================================================== */}

        {quizStarted && (

          <section
            className="page-scale glass soft-shadow rounded-3xl border border-slate-200/80 p-6 sm:p-7 md:p-8"
          >

            {/* QUIZ TOP */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 pb-6 border-b border-slate-100">

              <div>

                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-600">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                  QUIZ GENERATED

                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                  Knowledge Check
                </h2>

                <p className="text-sm text-slate-500 mt-1.5">
                  Test what you learned from your uploaded material.
                </p>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-center">

                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Question
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    1 <span className="text-slate-400">/ 1</span>
                  </p>

                </div>

              </div>

            </div>

            {/* QUESTION */}

            <div className="mt-7 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/30 p-5 sm:p-7">

              <div className="flex items-start gap-4 mb-7">

                <div className="w-9 h-9 shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-600/20">
                  Q1
                </div>

                <h3 className="text-base sm:text-lg font-bold leading-7 text-slate-900">
                  Which of the following is commonly used for data analysis?
                </h3>

              </div>

              {/* ANSWERS */}

              <div className="space-y-3">

                {["Python", "HTML", "CSS", "XML"].map(
                  (answer, index) => {

                    const selected = selectedAnswer === answer;

                    const letters = ["A", "B", "C", "D"];

                    return (
                      <label
                        key={answer}
                        className={`group flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all duration-200
                          ${
                            selected
                              ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10"
                              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                          }`}
                      >

                        <input
                          type="radio"
                          name="answer"
                          value={answer}
                          checked={selected}
                          onChange={(e) =>
                            setSelectedAnswer(e.target.value)
                          }
                          className="hidden"
                        />

                        <span
                          className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold border transition-all
                            ${
                              selected
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-slate-50 text-slate-500 border-slate-200 group-hover:border-blue-200"
                            }`}
                        >
                          {letters[index]}
                        </span>

                        <span
                          className={`text-sm font-semibold ${
                            selected
                              ? "text-blue-700"
                              : "text-slate-700"
                          }`}
                        >
                          {answer}
                        </span>

                        {selected && (
                          <span className="ml-auto w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                            ✓
                          </span>
                        )}

                      </label>
                    );
                  }
                )}

              </div>

              {/* SUBMIT */}

              <button
                type="button"
                disabled={!selectedAnswer}
                onClick={() => {
                  if (selectedAnswer === "Python") {
                    setScore(1);
                  } else {
                    setScore(0);
                  }
                }}
                className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#091f49] text-white px-7 py-3.5 text-sm font-bold shadow-lg hover:bg-[#123073] hover:-translate-y-0.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Submit Answer
                <span>→</span>
              </button>

              {/* =================================================
                  RESULT
              ================================================= */}

              {score !== null && (

                <div
                  className={`success-pop mt-6 rounded-2xl border p-5 sm:p-6 ${
                    score === 1
                      ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                      : "bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200"
                  }`}
                >

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                    <div
                      className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                        score === 1
                          ? "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-emerald-200"
                          : "bg-gradient-to-br from-rose-400 to-orange-400 shadow-rose-200"
                      }`}
                    >
                      {score === 1 ? "🎉" : "💡"}
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <p className="text-lg font-bold text-slate-900">
                          {score === 1
                            ? "Excellent work!"
                            : "Keep learning!"}
                        </p>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            score === 1
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          Score: {score}/1
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {score === 1
                          ? "Correct! Python is commonly used for data analysis."
                          : "Incorrect. The correct answer is Python."}
                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </section>

        )}

        {/* FOOTER */}

        <div className="text-center py-8">

          <p className="text-[11px] text-slate-400">
            SkillSetu • AI-Powered Learning & Assessment
          </p>

        </div>

      </main>

    </div>
  );
}

export default CourseQuiz;