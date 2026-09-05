import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const fallback = [
  { competency:"Digital Governance & e-Office", gap:34, current:48, id:"igot-digital-governance", title:"Digital Governance & e-Governance", level:"Intermediate", duration:"5 hours", icon:"🏛️" },
  { competency:"Data-Driven Decision Making", gap:36, current:42, id:"igot-data-driven", title:"Data-Driven Decision Making", level:"Intermediate", duration:"7 hours", icon:"📊" },
  { competency:"Citizen-Centric Service Delivery", gap:27, current:58, id:"igot-public-service", title:"Effective Public Service Delivery", level:"Intermediate", duration:"6 hours", icon:"🤝" },
  { competency:"Cyber Security Awareness", gap:35, current:45, id:"igot-cyber-awareness", title:"Cyber Security Awareness for Government", level:"Beginner", duration:"4 hours", icon:"🛡️" },
  { competency:"Ethics, Integrity & Accountability", gap:23, current:65, id:"igot-ethics", title:"Ethics & Integrity in Public Administration", level:"Foundation", duration:"4 hours", icon:"⚖️" },
];

const mapTitle = (name) => {
  const t=name.toLowerCase();
  if(t.includes("digital")) return {id:"igot-digital-governance",title:"Digital Governance & e-Governance",icon:"🏛️",level:"Intermediate",duration:"5 hours"};
  if(t.includes("data")) return {id:"igot-data-driven",title:"Data-Driven Decision Making",icon:"📊",level:"Intermediate",duration:"7 hours"};
  if(t.includes("citizen")) return {id:"igot-public-service",title:"Effective Public Service Delivery",icon:"🤝",level:"Intermediate",duration:"6 hours"};
  if(t.includes("cyber")) return {id:"igot-cyber-awareness",title:"Cyber Security Awareness for Government",icon:"🛡️",level:"Beginner",duration:"4 hours"};
  return {id:"igot-ethics",title:"Ethics & Integrity in Public Administration",icon:"⚖️",level:"Foundation",duration:"4 hours"};
};

function Recommendations(){
  const navigate=useNavigate();
  const recommendations=useMemo(()=>{try{const gaps=JSON.parse(localStorage.getItem("skillsetuFutureGaps")||"[]"); if(gaps.length) return gaps.map(g=>({competency:g.name,current:g.current,gap:g.gap,...mapTitle(g.name)})).sort((a,b)=>b.gap-a.gap)}catch{} return fallback;},[]);
  return <div className="min-h-screen bg-[#fffaf3] text-stone-900"><Navbar/><main className="mx-auto max-w-6xl px-4 py-9 sm:px-6">
    <div className="mb-8"><p className="font-bold text-orange-600">Personalized Learning Plan</p><h1 className="mt-2 text-4xl font-black">Recommended through the iGOT Karmayogi learning ecosystem</h1><p className="mt-3 max-w-3xl text-stone-500">SkillSetu maps your future-role competency gaps to relevant government capacity-building themes. The prototype shows the recommendation layer; authorised iGOT integration would provide the official course hand-off.</p></div>
    <div className="grid gap-5 md:grid-cols-2">{recommendations.map((c,index)=><article key={c.id+index} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4"><div className="flex gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">{c.icon}</div><div><p className="text-xs font-black uppercase tracking-wider text-orange-600">Priority #{index+1} • {c.gap}% future gap</p><h2 className="mt-2 text-xl font-bold">{c.title}</h2><p className="mt-1 text-sm text-stone-500">Competency: {c.competency}</p></div></div><span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">iGOT mapped</span></div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600"><span className="rounded-lg bg-orange-50 px-3 py-2">{c.level}</span><span className="rounded-lg bg-orange-50 px-3 py-2">⏱ {c.duration}</span><span className="rounded-lg bg-orange-50 px-3 py-2">Current: {c.current}%</span></div>
      <button onClick={()=>navigate(`/courses?course=${c.id}`)} className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">View Recommended Learning →</button>
    </article>)}</div>
  </main></div>
}
export default Recommendations;
