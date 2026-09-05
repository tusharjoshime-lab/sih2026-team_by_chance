import { Link, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const titles = {
  "igot-public-service": "Effective Public Service Delivery",
  "igot-digital-governance": "Digital Governance & e-Governance",
  "igot-data-driven": "Data-Driven Decision Making",
  "igot-cyber-awareness": "Cyber Security Awareness for Government",
  "igot-leadership": "Leadership & Capacity Building",
  "igot-ethics": "Ethics & Integrity in Public Administration",
};

function KarmayogiRedirect(){
  const [params] = useSearchParams(); const id=params.get("course")||"igot-digital-governance"; const title=titles[id]||"Recommended Capacity Building Course";
  return <div className="min-h-screen bg-[#fffaf3]"><Navbar/><main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <div className="rounded-[30px] border border-orange-100 bg-white p-8 text-center shadow-xl shadow-orange-100/60 sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">🏛️</div>
      <p className="mt-5 text-xs font-black tracking-[.18em] text-orange-600">iGOT KARMAYOGI LEARNING REFERENCE</p>
      <h1 className="mt-3 text-3xl font-black text-stone-900">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">In production, SkillSetu would pass the recommended competency/course reference to the authorised iGOT Karmayogi integration and the employee would continue learning on the official platform.</p>
      <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left"><p className="font-bold text-amber-900">Demo integration boundary</p><p className="mt-2 text-sm leading-6 text-amber-800">This prototype does not claim access to protected iGOT APIs or employee learning records. This screen intentionally demonstrates the hand-off point where authorised API/SSO integration would be connected.</p></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-orange-50 p-4"><div className="font-bold">1. Skill gap</div><div className="mt-1 text-xs text-stone-500">SkillSetu identifies competency need</div></div><div className="rounded-xl bg-orange-50 p-4"><div className="font-bold">2. Course match</div><div className="mt-1 text-xs text-stone-500">Relevant iGOT course reference selected</div></div><div className="rounded-xl bg-orange-50 p-4"><div className="font-bold">3. Official hand-off</div><div className="mt-1 text-xs text-stone-500">Employee continues on iGOT</div></div></div>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to={`/courses?course=${id}`} className="rounded-xl border border-stone-200 px-5 py-3 font-bold text-stone-600">← Back to course</Link><Link to="/progress" className="rounded-xl bg-orange-600 px-5 py-3 font-bold text-white">Mark learning planned →</Link></div>
    </div>
  </main></div>
}
export default KarmayogiRedirect;
