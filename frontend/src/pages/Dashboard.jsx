import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getJson } from "../utils/api";

function Dashboard(){
  const [profile, setProfile] = useState({});
  const [gaps, setGaps] = useState([]);
  const [quiz, setQuiz] = useState({score: 0, total: 0});
  const [avg, setAvg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getJson('/dashboard/employee');
        const localProfile = JSON.parse(localStorage.getItem("skillsetuCareerProfile")||localStorage.getItem("skillsetuProfile")||"{}");
        const mergedProfile = { ...localProfile, ...(res.user || {}), name: res.name || localProfile.name, jobRole: res.jobRole || localProfile.jobRole };
        setProfile(mergedProfile);

        let mappedGaps = [];
        if (res.competencyGaps && res.competencyGaps.skillGaps) {
          mappedGaps = res.competencyGaps.skillGaps.map(g => ({
            name: g.skill,
            current: g.currentLevel,
            future: g.requiredLevel,
            gap: g.gap
          }));
        } else {
          try{mappedGaps=JSON.parse(localStorage.getItem("skillsetuFutureGaps")||"[]")}catch{}
          if(!mappedGaps.length) mappedGaps=[{name:"Digital Governance & e-Office",current:48,future:82,gap:34},{name:"Data-Driven Decision Making",current:42,future:78,gap:36},{name:"Citizen-Centric Service Delivery",current:58,future:85,gap:27},{name:"Cyber Security Awareness",current:45,future:80,gap:35}];
        }
        setGaps(mappedGaps);
        setAvg(res.averageScore !== undefined ? res.averageScore : Math.round(mappedGaps.reduce((s,g)=>s+(g.current||0),0)/mappedGaps.length));

        if (res.quizHistory && res.quizHistory.length > 0) {
          const recent = res.quizHistory[0];
          setQuiz({ score: recent.score, total: recent.totalQuestions || 5 });
        } else if (res.recentAttempts && res.recentAttempts.length > 0) {
          const recent = res.recentAttempts[0];
          setQuiz({ score: recent.score, total: recent.totalQuestions || 5 });
        } else {
          let q={score:0,total:0}; try{q=JSON.parse(localStorage.getItem("skillsetuQuizResult")||"{}")||q}catch{}
          setQuiz(q);
        }
      } catch (err) {
        console.error("Dashboard fetch failed, using fallback", err);
        const localProfile = JSON.parse(localStorage.getItem("skillsetuCareerProfile")||localStorage.getItem("skillsetuProfile")||"{}");
        setProfile(localProfile);
        let localGaps=[]; try{localGaps=JSON.parse(localStorage.getItem("skillsetuFutureGaps")||"[]")}catch{}
        if(!localGaps.length) localGaps=[{name:"Digital Governance & e-Office",current:48,future:82,gap:34},{name:"Data-Driven Decision Making",current:42,future:78,gap:36},{name:"Citizen-Centric Service Delivery",current:58,future:85,gap:27},{name:"Cyber Security Awareness",current:45,future:80,gap:35}];
        setGaps(localGaps);
        let q={score:0,total:0}; try{q=JSON.parse(localStorage.getItem("skillsetuQuizResult")||"{}")||q}catch{}
        setQuiz(q);
        setAvg(Math.round(localGaps.reduce((s,g)=>s+(g.current||0),0)/localGaps.length));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const streak = Number(localStorage.getItem("skillsetuStreak") || 7);
  const actions=[
    {to:"/future-skills",icon:"◎",title:"Future Skill Gaps",text:"See skills likely to matter for your next role."},
    {to:"/recommendations",icon:"✨",title:"Recommendations",text:"View prioritized iGOT-mapped learning paths."},
    {to:"/courses",icon:"🎓",title:"Government Courses",text:"Browse capacity-building course references."},
    {to:"/material-quiz",icon:"📄",title:"PDF → AI Quiz",text:"Upload official learning material and generate MCQs."},
    {to:"/assessment",icon:"✓",title:"Reassess",text:"Take the government competency assessment again."},
    {to:"/progress",icon:"↗",title:"Progress",text:"Track learning, quiz results and streak."},
  ];
  return <div className="min-h-screen bg-[#fffaf3] text-stone-900"><Navbar/><main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
    <section className="overflow-hidden rounded-[32px] bg-gradient-to-br from-orange-700 via-orange-600 to-amber-500 p-7 text-white shadow-xl shadow-orange-100 sm:p-10"><div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black tracking-[.2em] text-orange-100">AI-POWERED CAPACITY BUILDING</p><h1 className="mt-3 text-4xl font-black">Welcome{profile.name?`, ${profile.name}`:""}</h1><p className="mt-4 max-w-2xl text-orange-50/90">Your dashboard connects service profile → future competency gaps → iGOT-mapped learning → assessment → progress.</p><div className="mt-5 flex flex-wrap gap-2">{profile.designation&&<span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">{profile.designation}</span>}{profile.department&&<span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">{profile.department}</span>}{profile.yearsInService&&<span className="rounded-full bg-white/15 px-3 py-2 text-xs font-bold">{profile.yearsInService}</span>}</div></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-white/15 p-4 text-center"><div className="text-3xl font-black">{avg}%</div><div className="text-xs">Current readiness</div></div><div className="rounded-2xl bg-white/15 p-4 text-center"><div className="text-3xl font-black">{gaps.length}</div><div className="text-xs">Future gaps</div></div><div className="rounded-2xl bg-white/15 p-4 text-center"><div className="text-3xl font-black">🔥 {streak}</div><div className="text-xs">Day streak</div></div></div></div></section>

    <section className="mt-7 grid gap-4 md:grid-cols-3">{actions.map(a=><Link key={a.to} to={a.to} className="group rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl text-orange-700">{a.icon}</div><h2 className="mt-4 font-black group-hover:text-orange-700">{a.title}</h2><p className="mt-2 text-sm leading-6 text-stone-500">{a.text}</p><p className="mt-4 text-sm font-bold text-orange-600">Open →</p></Link>)}</section>

    <section className="mt-7 grid gap-5 lg:grid-cols-[1.4fr_.6fr]"><div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-orange-600">Priority competency gaps</p><h2 className="mt-1 text-2xl font-black">Prepare before the role requires it</h2></div><Link to="/future-skills" className="text-sm font-bold text-orange-600">View all →</Link></div><div className="mt-5 space-y-4">{gaps.slice(0,4).map(g=><div key={g.name}><div className="flex justify-between gap-3 text-sm"><span className="font-bold">{g.name}</span><span className="font-black text-orange-600">Gap {g.gap}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-orange-100"><div className="h-full rounded-full bg-orange-500" style={{width:`${g.current}%`}}/></div></div>)}</div></div>
    <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"><p className="text-sm font-bold text-orange-600">Latest knowledge check</p><h2 className="mt-1 text-2xl font-black">{quiz.total?`${quiz.score}/${quiz.total}`:"Not attempted"}</h2><p className="mt-3 text-sm leading-6 text-stone-500">Course quizzes and PDF-generated assessments feed back into your progress view.</p><div className="mt-5 grid gap-3"><Link to="/progress" className="rounded-xl bg-orange-600 px-4 py-3 text-center font-bold text-white">View progress</Link><Link to="/material-quiz" className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center font-bold text-orange-800">Generate PDF quiz</Link></div></div></section>
  </main></div>
}
export default Dashboard;
