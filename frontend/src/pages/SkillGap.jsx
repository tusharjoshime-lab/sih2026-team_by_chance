import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const requiredCompetencies = [
  { name: "Citizen-Centric Service Delivery", required: 80 },
  { name: "Digital Governance", required: 80 },
  { name: "Data-Driven Decision Making", required: 75 },
  { name: "Cyber Security Awareness", required: 80 },
  { name: "Ethics & Integrity", required: 85 },
];

function SkillGap() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [readiness, setReadiness] = useState(0);

  useEffect(() => {
    let assessment = {};
    try {
      assessment = JSON.parse(localStorage.getItem("skillsetuAssessment") || "{}");
    } catch {
      assessment = {};
    }

    const rows = requiredCompetencies.map((item) => {
      const current = Number(assessment[item.name] ?? 0);
      const safeCurrent = Number.isFinite(current) ? current : 0;
      const gap = Math.max(item.required - safeCurrent, 0);
      const status = gap === 0 ? "Ready" : gap <= 20 ? "Minor Gap" : gap <= 40 ? "Moderate Gap" : "Priority Gap";
      return { ...item, current: safeCurrent, gap, status };
    });

    setSkills(rows);
    setReadiness(Math.round(rows.reduce((sum, row) => sum + row.current, 0) / rows.length));
  }, []);

  const priority = [...skills].filter((s) => s.gap > 0).sort((a, b) => b.gap - a.gap).slice(0, 3);
  const statusStyle = (status) => {
    if (status === "Ready") return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
    if (status === "Minor Gap") return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300";
    if (status === "Moderate Gap") return "border-orange-500/20 bg-orange-500/10 text-orange-300";
    return "border-rose-500/20 bg-rose-500/10 text-rose-300";
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-9">
          <p className="font-semibold text-orange-500">Competency Gap Analysis</p>
          <h1 className="mt-2 text-4xl font-bold">Government Role Readiness</h1>
          <p className="mt-3 max-w-2xl text-stone-500">Your assessment is compared with target competency levels used in this SkillSetu demonstration for public-service capacity building.</p>
        </div>

        <div className="mb-7 grid gap-5 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-orange-100 bg-white p-7">
            <div className="flex items-end justify-between gap-4">
              <div><p className="text-sm text-stone-500">Overall Public-Service Readiness</p><h2 className="mt-1 text-4xl font-bold">{readiness}%</h2></div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-bold text-emerald-300">Assessment Completed</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-orange-50"><div className="h-full rounded-full bg-orange-500" style={{ width: `${readiness}%` }} /></div>
          </div>
          <div className="rounded-2xl border border-orange-100 bg-white p-7">
            <p className="text-sm text-stone-500">Competencies to Strengthen</p>
            <h2 className="mt-1 text-4xl font-bold">{skills.filter((s) => s.gap > 0).length}</h2>
            <p className="mt-2 text-sm text-stone-500">out of {skills.length} assessed areas</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-orange-100 bg-white">
          <div className="border-b border-orange-100 p-6"><h2 className="text-xl font-bold">Competency Breakdown</h2><p className="mt-1 text-sm text-stone-500">Current score vs target readiness level.</p></div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead><tr className="border-b border-orange-100 text-left text-sm text-stone-500"><th className="px-6 py-4">Government Competency</th><th className="px-6 py-4">Current</th><th className="px-6 py-4">Target</th><th className="px-6 py-4">Gap</th><th className="px-6 py-4">Status</th></tr></thead>
              <tbody>{skills.map((skill) => <tr key={skill.name} className="border-b border-orange-100 last:border-0"><td className="px-6 py-5"><p className="font-semibold">{skill.name}</p><div className="mt-2 h-2 w-44 rounded-full bg-orange-50"><div className="h-full rounded-full bg-orange-500" style={{ width: `${skill.current}%` }} /></div></td><td className="px-6 py-5 font-bold">{skill.current}%</td><td className="px-6 py-5 text-stone-600">{skill.required}%</td><td className="px-6 py-5 font-bold text-rose-300">{skill.gap}%</td><td className="px-6 py-5"><span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyle(skill.status)}`}>{skill.status}</span></td></tr>)}</tbody>
            </table>
          </div>
        </div>

        <div className="mt-7 rounded-2xl border border-orange-100 bg-white p-7">
          <h2 className="text-xl font-bold">🎯 Priority Development Areas</h2>
          <p className="mt-1 text-sm text-stone-500">SkillSetu will use these gaps to rank your government learning recommendations.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {priority.map((skill, index) => <div key={skill.name} className="rounded-xl border border-orange-100 bg-[#fffaf3] p-5"><div className="flex justify-between"><span className="text-xs font-bold text-stone-500">PRIORITY {index + 1}</span><span className="font-bold text-rose-300">-{skill.gap}%</span></div><h3 className="mt-3 font-bold">{skill.name}</h3></div>)}
          </div>
          <button onClick={() => navigate("/recommendations")} className="mt-7 rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 hover:bg-orange-400">Get Personalized Learning Plan →</button>
        </div>
      </main>
    </div>
  );
}

export default SkillGap;
