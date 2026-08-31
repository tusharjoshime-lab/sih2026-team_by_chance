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

    setTimeout(() => {
      setIsGenerating(false);
      setQuizStarted(true);
    }, 1500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF3FB]">

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* PAGE HEADER */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#0B2559] p-8 md:p-10 mb-10 shadow-[0_20px_60px_-15px_rgba(11,37,89,0.55)]">

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -left-16 -bottom-24 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
            <div className="absolute right-1/3 top-0 w-40 h-40 bg-cyan-300/10 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-100 px-4 py-1.5 rounded-full text-xs font-semibold mb-5 backdrop-blur-md border border-white/10 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              🤖 AI LEARNING & ASSESSMENT
            </div>

            <h2 className="text-3xl md:text-[2.5rem] font-bold text-white tracking-tight leading-tight">
              {currentCourse}
            </h2>

            <p className="text-blue-200/80 mt-3 max-w-2xl leading-relaxed">
              Learn new skills and test your knowledge using
              AI-powered assessments based on your learning material.
            </p>

          </div>

        </div>


        {/* UPLOAD CARD */}
        <section className="bg-white rounded-3xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(37,99,235,0.15)] p-7 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Generate AI Quiz
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Upload your learning material and let AI create
                an interactive MCQ assessment.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-md shadow-blue-200">
              ✨ AI Powered
            </div>

          </div>


          {/* DROP AREA */}
          <div className="relative overflow-hidden border-2 border-dashed border-blue-200 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 rounded-2xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/60 transition-all duration-300">

            <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl" />

            <div className="relative mx-auto w-16 h-16 bg-white rounded-2xl shadow-md shadow-blue-100 border border-blue-100/60 flex items-center justify-center text-3xl mb-5">
              📄
            </div>

            <h4 className="relative font-semibold text-slate-800 text-lg">
              Upload your learning material
            </h4>

            <p className="relative text-sm text-slate-500 mt-2">
              Supported formats: PDF, PPTX and DOCX
            </p>


            <label className="relative inline-block mt-6 cursor-pointer">

              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-300/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                📁 Choose File
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

              <div className="relative mt-6 bg-white border border-slate-200 rounded-xl p-4 max-w-md mx-auto shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-200">
                    📄
                  </div>

                  <div className="text-left flex-1 min-w-0">

                    <p className="text-xs text-slate-500">
                      Selected file
                    </p>

                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {selectedFile.name}
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleGenerateQuiz}
                  disabled={isGenerating}
                  className="w-full mt-4 bg-[#0B2559] text-white py-3 rounded-xl font-semibold hover:bg-[#123073] shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                >
                  {isGenerating
                    ? "🤖 Generating Quiz..."
                    : "Generate AI Quiz →"}
                </button>

              </div>

            )}

          </div>

        </section>


        {/* RECOMMENDED COURSE */}
        <section className="bg-white rounded-3xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(37,99,235,0.15)] p-7 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                Recommended Course
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Based on your competency gaps
              </p>

            </div>

            <span className="bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md shadow-orange-200">
              ✨ AI Recommended
            </span>

          </div>


          <div className="relative overflow-hidden border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-[0_12px_30px_-15px_rgba(37,99,235,0.25)] transition-all duration-300">

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

              <div>

                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  Data Analysis with Python
                </h4>

                <p className="text-sm text-slate-500 mt-3 max-w-2xl leading-relaxed">
                  Improve your technical and data analysis skills
                  through practical learning and hands-on exercises.
                </p>

              </div>

              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 flex items-center justify-center text-4xl shadow-inner">
                🐍
              </div>

            </div>


            <div className="flex flex-wrap gap-2.5 mt-6">

              <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full border border-indigo-100">
                Technical
              </span>

              <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-100">
                Intermediate
              </span>

              <span className="text-xs font-semibold bg-cyan-50 text-cyan-700 px-4 py-2 rounded-full border border-cyan-100">
                ⏱ 6 Hours
              </span>

            </div>


            <button className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Start Course →
            </button>

          </div>

        </section>


        {/* QUIZ */}
        {quizStarted && (

          <section className="bg-white rounded-3xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(37,99,235,0.15)] p-7 animate-[fadeIn_0.5s_ease-out]">

            {/* QUIZ HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-7">

              <div>

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 shadow-md shadow-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Quiz Generated
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Knowledge Check
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  AI-generated quiz based on your uploaded material.
                </p>

              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/70 px-5 py-3 rounded-xl text-center">
                <p className="text-xs text-slate-500 font-medium">
                  Question
                </p>

                <p className="font-bold text-slate-900 text-lg">
                  1 / 1
                </p>
              </div>

            </div>


            {/* QUESTION */}
            <div className="border border-slate-200 rounded-2xl p-6 bg-gradient-to-br from-white to-blue-50/30">

              <p className="font-bold text-lg text-slate-900 mb-6">
                Q1. Which of the following is commonly used for
                data analysis?
              </p>


              <div className="space-y-3">

                {["Python", "HTML", "CSS", "XML"].map((answer) => (

                  <label
                    key={answer}
                    className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all duration-200
                    ${
                      selectedAnswer === answer
                        ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >

                    <input
                      type="radio"
                      name="answer"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={(e) =>
                        setSelectedAnswer(e.target.value)
                      }
                      className="w-4 h-4 accent-blue-600"
                    />

                    <span className="font-medium text-slate-700">
                      {answer}
                    </span>

                  </label>

                ))}

              </div>


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
                className="mt-7 w-full md:w-auto bg-[#0B2559] text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:bg-[#123073] transition disabled:opacity-40"
              >
                Submit Answer →
              </button>


              {/* RESULT */}
              {score !== null && (

                <div className={`mt-6 p-5 rounded-2xl border ${
                  score === 1
                    ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200"
                    : "bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200"
                }`}>

                  <div className="flex items-center gap-3">

                    <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center text-2xl shadow-md ${
                      score === 1
                        ? "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-emerald-200"
                        : "bg-gradient-to-br from-rose-400 to-orange-400 shadow-rose-200"
                    }`}>
                      {score === 1 ? "🎉" : "💡"}
                    </div>

                    <div>

                      <p className="font-bold text-slate-900">
                        Your Score: {score}/1
                      </p>

                      <p className="text-sm text-slate-600 mt-1">
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

      </main>

    </div>
  );
}

export default CourseQuiz;