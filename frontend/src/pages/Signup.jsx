import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { apiRequest, saveAuthSession } from "../utils/api";

const FIELD_OPTIONS = [
  "Administration & Governance",
  "Finance & Accounts",
  "Rural Development",
  "Urban Development",
  "Health & Public Welfare",
  "Education",
  "Digital Governance / IT",
  "Statistics & Data",
  "Public Grievance & Citizen Services",
];

const SKILL_OPTIONS = [
  "Citizen Service Delivery",
  "Digital File & e-Office Working",
  "Data Interpretation",
  "Cyber Security Awareness",
  "Public Communication",
  "Ethics & Integrity",
  "Policy Implementation",
  "Team Leadership",
];

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    jobRole: "",
    education: "",
    governmentField: "",
    yearsInService: "",
    promotionGoal: "",
    previousSkills: [],
  });

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const setField = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));
  const toggleSkill = (skill) => setFormData((prev) => ({
    ...prev,
    previousSkills: prev.previousSkills.includes(skill)
      ? prev.previousSkills.filter((item) => item !== skill)
      : [...prev.previousSkills, skill],
  }));

  const next = () => {
    setError("");
    if (step === 1 && (!formData.name || !formData.email || !formData.password)) {
      setError("Please complete your account details."); return;
    }
    if (step === 2 && (!formData.designation || !formData.department || !formData.governmentField || !formData.yearsInService)) {
      setError("Please complete your government service profile."); return;
    }
    setStep((s) => Math.min(3, s + 1));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.jobRole || !formData.education || !formData.promotionGoal) {
      setError("Please complete your role, education and career goal."); return;
    }
    setLoading(true);
    try {
      const backendPayload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        designation: formData.designation,
        department: formData.department,
        jobRole: formData.jobRole,
        education: formData.education,
      };
      const data = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(backendPayload),
      });
      saveAuthSession(data);
      localStorage.setItem("skillsetuCareerProfile", JSON.stringify(formData));
      localStorage.setItem("skillsetuProfile", JSON.stringify(formData));
      localStorage.removeItem("skillsetuAssessment");
      navigate("/future-skills");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-orange-100 bg-orange-50/40 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100";

  return (
    <div className="min-h-screen bg-[#fffaf3] px-4 py-10 text-stone-900">
      <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-[32px] border border-orange-100 bg-white shadow-2xl shadow-orange-100/70">
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-7 text-white sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs font-bold tracking-[.2em] text-orange-100">SKILLSETU • GOVERNMENT CAPACITY BUILDING</p><h1 className="mt-2 text-3xl font-extrabold">Create your service profile</h1><p className="mt-2 max-w-xl text-sm text-orange-50/90">Your post, department, experience and existing skills help us identify future competency needs.</p></div>
            <div className="hidden rounded-2xl bg-white/15 px-4 py-3 text-center sm:block"><div className="text-2xl font-black">{step}/3</div><div className="text-xs">Profile setup</div></div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} /></div>
        </div>

        <form onSubmit={handleSignup} className="p-7 sm:p-9">
          {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

          {step === 1 && <div className="space-y-5">
            <div><h2 className="text-xl font-bold">Account details</h2><p className="mt-1 text-sm text-stone-500">Basic details for your SkillSetu account.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Full name<input className={`${inputClass} mt-2`} value={formData.name} onChange={(e)=>setField("name",e.target.value)} placeholder="Your full name" /></label>
              <label className="text-sm font-semibold">Official / work email<input type="email" className={`${inputClass} mt-2`} value={formData.email} onChange={(e)=>setField("email",e.target.value)} placeholder="name@example.com" /></label>
            </div>
            <label className="block text-sm font-semibold">Password<input type="password" className={`${inputClass} mt-2`} value={formData.password} onChange={(e)=>setField("password",e.target.value)} placeholder="Create a password" /></label>
          </div>}

          {step === 2 && <div className="space-y-5">
            <div><h2 className="text-xl font-bold">Government service profile</h2><p className="mt-1 text-sm text-stone-500">Tell us where you currently work and how long you have served.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Current post / designation<input className={`${inputClass} mt-2`} value={formData.designation} onChange={(e)=>setField("designation",e.target.value)} placeholder="e.g. Section Officer" /></label>
              <label className="text-sm font-semibold">Department / ministry<input className={`${inputClass} mt-2`} value={formData.department} onChange={(e)=>setField("department",e.target.value)} placeholder="e.g. Rural Development" /></label>
              <label className="text-sm font-semibold">Government field<select className={`${inputClass} mt-2`} value={formData.governmentField} onChange={(e)=>setField("governmentField",e.target.value)}><option value="">Select field</option>{FIELD_OPTIONS.map((x)=><option key={x}>{x}</option>)}</select></label>
              <label className="text-sm font-semibold">Experience in service<select className={`${inputClass} mt-2`} value={formData.yearsInService} onChange={(e)=>setField("yearsInService",e.target.value)}><option value="">Select experience</option><option>Less than 1 year</option><option>1–3 years</option><option>3–7 years</option><option>7–15 years</option><option>15+ years</option></select></label>
            </div>
          </div>}

          {step === 3 && <div className="space-y-5">
            <div><h2 className="text-xl font-bold">Role, future goal & existing skills</h2><p className="mt-1 text-sm text-stone-500">This is used to build your future skill-gap map.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Current job role<input className={`${inputClass} mt-2`} value={formData.jobRole} onChange={(e)=>setField("jobRole",e.target.value)} placeholder="e.g. Programme implementation" /></label>
              <label className="text-sm font-semibold">Highest education<input className={`${inputClass} mt-2`} value={formData.education} onChange={(e)=>setField("education",e.target.value)} placeholder="e.g. Graduate / Postgraduate" /></label>
            </div>
            <label className="block text-sm font-semibold">Career / promotion goal<input className={`${inputClass} mt-2`} value={formData.promotionGoal} onChange={(e)=>setField("promotionGoal",e.target.value)} placeholder="e.g. Prepare for higher supervisory responsibility" /></label>
            <div><p className="text-sm font-semibold">Skills you already use</p><div className="mt-3 flex flex-wrap gap-2">{SKILL_OPTIONS.map((skill)=><button type="button" key={skill} onClick={()=>toggleSkill(skill)} className={`rounded-full border px-3 py-2 text-xs font-bold transition ${formData.previousSkills.includes(skill)?"border-orange-500 bg-orange-500 text-white":"border-orange-100 bg-orange-50 text-stone-600 hover:border-orange-300"}`}>{formData.previousSkills.includes(skill)?"✓ ":""}{skill}</button>)}</div></div>
          </div>}

          <div className="mt-8 flex items-center justify-between gap-3">
            <div>{step > 1 ? <button type="button" onClick={()=>setStep((s)=>s-1)} className="rounded-xl border border-stone-200 px-5 py-3 font-bold text-stone-600 hover:bg-stone-50">← Back</button> : <Link to="/" className="text-sm font-semibold text-stone-500 hover:text-orange-600">Already have an account?</Link>}</div>
            {step < 3 ? <button type="button" onClick={next} className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700">Continue →</button> : <button disabled={loading} className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:opacity-60">{loading?"Creating profile...":"Create Account & Analyse Skills →"}</button>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
