import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function QuizResult() {
  const nav = useNavigate();
  const location = useLocation();
  const r = useMemo(() => {
    if (location.state) return location.state;
    try { return JSON.parse(localStorage.getItem("skillsetuQuizResult")) || { score: 0, total: 5, totalQuestions: 5 } } catch { return { score: 0, total: 5, totalQuestions: 5 } }
  }, [location.state]);
  const total = r.total || r.totalQuestions || 5;
  const score = r.score || 0;
  const a = total ? Math.round((score / total) * 100) : 0;
  const needs = a < 70;
  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-[30px] border border-orange-100 bg-white p-8 text-center shadow-xl shadow-orange-100/60">
          <p className="text-sm font-black uppercase tracking-[.2em] text-orange-600">Learning Assessment</p>
          <h1 className="mt-3 text-4xl font-black">Assessment Completed</h1>
          <p className="mt-3 text-stone-500">{r.courseTitle || "Government Learning Course"}</p>
          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-stone-500">Score</p>
              <p className="mt-2 text-3xl font-black">{score}/{total}</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-stone-500">Accuracy</p>
              <p className="mt-2 text-3xl font-black">{a}%</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-5">
              <p className="text-sm text-stone-500">Status</p>
              <p className="mt-2 text-2xl font-black">{needs ? "Needs Practice" : "On Track"}</p>
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="h-3 rounded-full bg-orange-100">
              <div className="h-full rounded-full bg-orange-500" style={{ width: `${a}%` }} />
            </div>
          </div>

          {r.feedback && r.feedback.length > 0 && (
            <div className="mx-auto mt-10 max-w-2xl text-left">
              <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>
              <div className="grid gap-6">
                {r.feedback.map((item, index) => (
                  <div key={index} className={`rounded-2xl border p-5 ${item.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <p className="font-bold text-lg mb-2">Q: {item.question}</p>
                    <p className="text-sm mb-1"><strong>Your Answer:</strong> {item.yourAnswer}</p>
                    <p className="text-sm mb-3"><strong>Correct Answer:</strong> {item.correctAnswer}</p>
                    <div className="text-sm bg-white p-3 rounded-lg border border-stone-100">
                      <strong>Explanation:</strong> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {needs && <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left"><p className="font-black text-amber-900">Recommended next step: targeted learning on iGOT Karmayogi</p><p className="mt-2 text-sm leading-6 text-amber-800">Instead of leaving you at “Needs Practice”, SkillSetu maps this result back to the relevant competency and recommends an iGOT Karmayogi learning path. In production, an authorised integration would take you to the official course.</p><button onClick={() => nav(`/karmayogi?course=${r.courseId || "igot-digital-governance"}`)} className="mt-4 rounded-xl bg-orange-600 px-5 py-3 font-bold text-white">View iGOT learning hand-off →</button></div>}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button onClick={() => nav(-1)} className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white">Retake Quiz</button>
            <button onClick={() => nav('/progress')} className="rounded-xl bg-orange-100 px-6 py-3 font-bold text-orange-800">View Learning Progress</button>
            <button onClick={() => nav('/dashboard')} className="rounded-xl border border-stone-200 px-6 py-3 font-bold text-stone-600">Go to Dashboard</button>
          </div>
        </div>
      </main>
    </div>
  );
}
