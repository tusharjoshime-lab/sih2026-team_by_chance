import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getJson } from "../utils/api";

export default function Progress() {
  const navigate = useNavigate();
  const [result, setResult] = useState({ score: 0, total: 5 });
  const [history, setHistory] = useState([]);
  const [avg, setAvg] = useState(0);
  const [skills, setSkills] = useState([
    ["Digital Governance", 68],
    ["Public Service Delivery", 72],
    ["Data Literacy", 58],
    ["Cyber Awareness", 64],
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getJson('/dashboard/employee');
        if (res.quizHistory && Array.isArray(res.quizHistory) && res.quizHistory.length > 0) {
          const recent = res.quizHistory[0];
          setResult({ score: recent.score, total: recent.totalQuestions || 5 });
          setHistory(res.quizHistory);
        } else if (res.recentAttempts && Array.isArray(res.recentAttempts) && res.recentAttempts.length > 0) {
          const recent = res.recentAttempts[0];
          setResult({ score: recent.score, total: recent.totalQuestions || 5 });
          setHistory(res.recentAttempts);
        }
        
        if (res.averageScore !== undefined) {
          setAvg(res.averageScore);
        }

        if (res.competencyGaps && Array.isArray(res.competencyGaps.skillGaps)) {
          setSkills(res.competencyGaps.skillGaps.map(g => [g.skill, g.currentLevel]));
        }
      } catch (err) {
        console.error(err);
        try {
          const resLocal = JSON.parse(localStorage.getItem("skillsetuQuizResult")) || { score: 0, total: 5 };
          setResult(resLocal);
        } catch {}
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const quizPercent = result.total ? Math.round((result.score / result.total) * 100) : 0;

  if (loading) return <div className="min-h-screen bg-[#fffaf3] text-stone-900 flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Capability Growth</p>
          <h1 className="mt-2 text-4xl font-bold">Learning Progress</h1>
          <p className="mt-3 text-stone-500">Your competency development across government-relevant capabilities.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-orange-100 bg-white p-6">
            <p className="text-sm text-stone-500">Latest Assessment</p>
            <p className="mt-2 text-3xl font-bold">{result.score}/{result.total}</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-6">
            <p className="text-sm text-stone-500">Assessment Accuracy</p>
            <p className="mt-2 text-3xl font-bold">{quizPercent}%</p>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-6">
            <p className="text-sm text-stone-500">Learning Status</p>
            <p className="mt-2 text-2xl font-bold">{quizPercent >= 70 ? "On Track" : "Continue Learning"}</p>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-orange-100 bg-white p-7">
          <h2 className="text-2xl font-bold">Capability Progress</h2>
          <div className="mt-6 space-y-6">
            {skills.map(([name, base]) => {
              const value = Math.min(100, Math.round(base + quizPercent * 0.12));
              return (
                <div key={name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">{name}</span>
                    <span className="text-stone-500">{value}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-orange-50">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: `${value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-orange-100 bg-white p-7">
          <h2 className="text-2xl font-bold">Next Recommended Action</h2>
          <p className="mt-3 text-stone-500">
            Continue with your recommended government learning course and reassess your competencies after completing the learning path.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate("/courses")} className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-slate-950 hover:bg-orange-400">
              Continue Learning
            </button>
            <button onClick={() => navigate("/assessment")} className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-stone-700 hover:bg-orange-50">
              Reassess Competencies
            </button>
            <button onClick={() => navigate("/dashboard")} className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-stone-700 hover:bg-orange-50">
              Dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
