import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJson } from "../utils/api";
import Navbar from "../components/Navbar";

const baseSkills = [
  { name: "Digital Governance & e-Office", current: 48, future: 82, reason: "Future roles increasingly require digital workflows, online service delivery and platform-based administration." },
  { name: "Data-Driven Decision Making", current: 42, future: 78, reason: "Higher responsibility requires interpreting dashboards, scheme data and performance indicators." },
  { name: "Citizen-Centric Service Delivery", current: 58, future: 85, reason: "Supervisory roles need grievance handling, service standards and outcome-focused citizen delivery." },
  { name: "Cyber Security Awareness", current: 45, future: 80, reason: "Government work increasingly uses digital records and requires secure handling of official information." },
  { name: "Ethics, Integrity & Accountability", current: 65, future: 88, reason: "Greater responsibility brings higher accountability, transparency and public-service decision standards." },
];

function FutureSkills() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("skillsetuCareerProfile") || "{}");
  const [gaps, setGaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaps() {
      try {
        const data = await getJson('/competency/gaps');
        if (data && data.skillGaps) {
          const mappedGaps = data.skillGaps.map(g => ({
            name: g.skill,
            current: g.currentLevel,
            future: g.requiredLevel,
            gap: g.gap,
            reason: `Required level ${g.requiredLevel} for your role`
          }));
          setGaps(mappedGaps);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error("API failed, falling back to local storage", err);
      }

      const existing = profile.previousSkills || [];
      const skills = baseSkills.map((skill) => ({ ...skill, current: existing.some((s)=>s.toLowerCase().includes(skill.name.split(" ")[0].toLowerCase())) ? Math.min(skill.current + 15, 75) : skill.current }));
      setGaps(skills.map((s)=>({ ...s, gap: Math.max(s.future-s.current,0) })));
      setLoading(false);
    }
    fetchGaps();
  }, []);

  const continueFlow = () => {
    const assessment = {};
    gaps.forEach((s)=>{ assessment[s.name] = s.current; });
    localStorage.setItem("skillsetuFutureGaps", JSON.stringify(gaps));
    navigate("/recommendations");
  };

  return <div className="min-h-screen bg-[#fffaf3] text-stone-900"><Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {loading && <div className="text-center py-10">Loading...</div>}
      {!loading && (
        <>
      <section className="overflow-hidden rounded-[30px] bg-gradient-to-br from-orange-700 via-orange-600 to-amber-500 p-7 text-white shadow-xl shadow-orange-100 sm:p-9">
        <p className="text-xs font-black tracking-[.18em] text-orange-100">FUTURE-ROLE COMPETENCY ANALYSIS</p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Skills you may need for your next level of responsibility</h1>
        <p className="mt-4 max-w-3xl text-orange-50/90">Based on your current post <strong>{profile.designation || "government role"}</strong>, field <strong>{profile.governmentField || "public administration"}</strong>, experience <strong>{profile.yearsInService || "provided"}</strong> and career goal, SkillSetu identifies competencies likely to become more important as your role grows.</p>
      </section>

      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="font-bold text-amber-900">Why this matters</p><p className="mt-1 text-sm leading-6 text-amber-800">The goal is not to label an employee as weak. It highlights the difference between present capability and the competency level expected for future responsibilities, so training can be planned early.</p></div>

      <section className="mt-7 grid gap-4">
        {gaps.map((skill, i)=><div key={skill.name} className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-black text-orange-700">{i+1}</span><h2 className="font-bold">{skill.name}</h2></div><p className="mt-3 text-sm leading-6 text-stone-500">{skill.reason}</p></div><div className="min-w-[190px] rounded-xl bg-orange-50 p-4"><div className="flex justify-between text-xs font-bold text-stone-500"><span>Current {skill.current}%</span><span>Future need {skill.future}%</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-orange-100"><div className="h-full rounded-full bg-orange-500" style={{width:`${skill.current}%`}}/></div><p className="mt-2 text-sm font-black text-orange-700">Gap to prepare: {skill.gap}%</p></div></div>
        </div>)}
      </section>

      <div className="mt-8 flex flex-wrap justify-between gap-3"><Link to="/profile" className="rounded-xl border border-stone-200 bg-white px-5 py-3 font-bold text-stone-600">Edit profile</Link><button onClick={continueFlow} className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700">See recommended iGOT learning →</button></div>
        </>
      )}
    </main>
  </div>;
}
export default FutureSkills;
