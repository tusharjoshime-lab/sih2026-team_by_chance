import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getJson } from '../utils/api';

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
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getJson('/recommendations')
      .then(data => {
        if (data && data.recommendations) {
          setRecommendations(data.recommendations.map(r => ({
            ...r,
            icon: "💡", 
            competency: r.domain,
            duration: r.durationHrs ? `${r.durationHrs} hours` : 'N/A'
          })));
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setError(true);
        try {
          const gaps=JSON.parse(localStorage.getItem("skillsetuFutureGaps")||"[]"); 
          if(Array.isArray(gaps) && gaps.length) {
            setRecommendations(gaps.map(g=>({competency:g.name,current:g.current,gap:g.gap,...mapTitle(g.name)})).sort((a,b)=>b.gap-a.gap));
          } else {
            setRecommendations(fallback);
          }
        } catch {
          setRecommendations(fallback);
        }
        setLoading(false);
      });
  }, []);

  return <div className="min-h-screen bg-[#fffaf3] text-stone-900"><Navbar/><main className="mx-auto max-w-6xl px-4 py-9 sm:px-6">
    <div className="mb-8">
      <p className="font-bold text-orange-600">Personalized Learning Plan</p>
      <h1 className="mt-2 text-4xl font-black">Recommended through the iGOT Karmayogi learning ecosystem</h1>
      <p className="mt-3 max-w-3xl text-stone-500">SkillSetu maps your future-role competency gaps to relevant government capacity-building themes. The prototype shows the recommendation layer; authorised iGOT integration would provide the official course hand-off.</p>
    </div>
    
    {loading && (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-orange-600"></div>
        <p className="mt-4 font-medium text-stone-600">AI is analyzing your skill gaps and finding the best courses...</p>
      </div>
    )}

    {!loading && error && (
      <div className="mb-6 rounded-xl bg-orange-50 p-4 text-sm text-orange-800">
        Note: Could not connect to the recommendation engine. Showing default mapped recommendations instead.
      </div>
    )}

    {!loading && (
      <div className="grid gap-5 md:grid-cols-2">
        {recommendations.map((c,index)=>
          <article key={c.id+index} className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">{c.icon || "📚"}</div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-orange-600">Priority #{index+1} {c.gap ? `• ${c.gap}% future gap` : ''}</p>
                  <h2 className="mt-2 text-xl font-bold">{c.title}</h2>
                  <p className="mt-1 text-sm text-stone-500">Domain: {c.competency}</p>
                </div>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">iGOT mapped</span>
            </div>
            {c.justification && (
              <p className="mt-3 text-sm italic text-stone-600">"{c.justification}"</p>
            )}
            {!c.justification && c.description && (
              <p className="mt-3 text-sm text-stone-600">{c.description}</p>
            )}
            
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-stone-600">
              <span className="rounded-lg bg-orange-50 px-3 py-2">{c.level}</span>
              <span className="rounded-lg bg-orange-50 px-3 py-2">⏱ {c.duration}</span>
              {c.current && <span className="rounded-lg bg-orange-50 px-3 py-2">Current: {c.current}%</span>}
              {c.skillTags && c.skillTags.map(tag => (
                <span key={tag} className="rounded-lg bg-orange-50 px-3 py-2">{tag}</span>
              ))}
            </div>
            <button onClick={()=>navigate(`/courses?course=${c.id}`)} className="mt-6 w-full rounded-xl bg-orange-600 px-5 py-3 font-bold text-white hover:bg-orange-700">View Recommended Learning →</button>
          </article>
        )}
      </div>
    )}
  </main></div>
}
export default Recommendations;

