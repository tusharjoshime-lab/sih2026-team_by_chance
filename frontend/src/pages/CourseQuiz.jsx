import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { governmentCourses } from "./Courses";

const learningContent = {
  "igot-public-service": {
    modules: [
      ["Module 1", "Citizen-centric service standards", "Understand timeliness, accessibility and service quality."],
      ["Module 2", "Grievance redressal", "Learn how complaints are tracked, escalated and resolved responsibly."],
      ["Module 3", "Outcome-focused delivery", "Connect service processes with measurable citizen outcomes."],
    ],
    questions: [
      { question: "Which outcome best reflects citizen-centric service delivery?", options: ["More internal paperwork", "Timely and accessible resolution for citizens", "Longer processing chains", "Repeated office visits"], correct: 1 },
      { question: "What is a useful first step when a citizen grievance is delayed?", options: ["Delete the grievance", "Check its status and applicable escalation route", "Ask the citizen to start over", "Ignore the service timeline"], correct: 1 },
      { question: "Why should public services track service standards?", options: ["To support consistent and measurable delivery", "To avoid accountability", "To increase manual steps", "To hide timelines"], correct: 0 },
    ],
  },
  "igot-digital-governance": {
    modules: [
      ["Module 1", "Digital public-service workflows", "Explore how e-Office and digital workflows improve traceability."],
      ["Module 2", "Interoperability", "Understand secure data exchange between authorized government systems."],
      ["Module 3", "Digital service design", "Focus on accessibility, reliability and user-centred delivery."],
    ],
    questions: [
      { question: "What is a major benefit of a digital file workflow?", options: ["Traceability and faster processing", "More duplicate paper files", "No accountability", "Personal-device storage"], correct: 0 },
      { question: "Why is interoperability useful in digital government?", options: ["It enables authorized systems to exchange data", "It blocks all data exchange", "It creates duplicate citizen identities", "It removes security controls"], correct: 0 },
      { question: "Which is important when designing a digital public service?", options: ["Accessibility, reliability and security", "Uncontrolled access", "No user support", "Avoiding service monitoring"], correct: 0 },
    ],
  },
  "igot-data-driven": {
    modules: [
      ["Module 1", "Data quality", "Check sources, completeness and consistency before analysis."],
      ["Module 2", "Dashboards and indicators", "Use visual indicators to monitor programmes and service delivery."],
      ["Module 3", "Evidence-based decisions", "Translate validated data into administrative action."],
    ],
    questions: [
      { question: "What should happen before using data for an important decision?", options: ["Validate its source and quality", "Ignore missing values", "Publish immediately", "Use only one record"], correct: 0 },
      { question: "What can a dashboard help an administrator do?", options: ["Monitor trends and indicators", "Guarantee causation", "Replace all field verification", "Remove context"], correct: 0 },
      { question: "Which decision is most evidence-based?", options: ["One supported by relevant validated information", "One based on rumours", "One made without reviewing data", "One based only on assumptions"], correct: 0 },
    ],
  },
  "igot-cyber-awareness": {
    modules: [
      ["Module 1", "Secure official accounts", "Use strong authentication and protect credentials."],
      ["Module 2", "Phishing awareness", "Identify suspicious links, senders and urgent credential requests."],
      ["Module 3", "Sensitive information", "Handle official information according to access and security rules."],
    ],
    questions: [
      { question: "Which practice best protects an official account?", options: ["Strong unique password and MFA", "Shared team password", "Same password everywhere", "Disabling updates"], correct: 0 },
      { question: "What should you do with a suspicious credential-request email?", options: ["Verify and report it through the official process", "Enter your password", "Forward it to everyone", "Disable security controls"], correct: 0 },
      { question: "Why should access to sensitive information be controlled?", options: ["To reduce unauthorized disclosure", "To remove accountability", "To make all records public by default", "To avoid security review"], correct: 0 },
    ],
  },
  "igot-ethics": {
    modules: [
      ["Module 1", "Integrity in public service", "Understand impartiality, responsible conduct and public interest."],
      ["Module 2", "Conflict of interest", "Recognize situations where private interests can affect official duties."],
      ["Module 3", "Accountability", "Document decisions and remain answerable for public resources and actions."],
    ],
    questions: [
      { question: "What does integrity in public administration require?", options: ["Responsible conduct consistent with ethical standards", "Preference for personal benefit", "Hidden criteria", "Avoiding accountability"], correct: 0 },
      { question: "What is the appropriate response to a tender participant offering an expensive personal gift?", options: ["Decline it and follow applicable conduct rules", "Accept it secretly", "Accept it after office hours", "Ask for a larger gift"], correct: 0 },
      { question: "What does accountability require?", options: ["Being answerable for decisions and actions", "Avoiding written records", "Removing oversight", "Hiding decision criteria"], correct: 0 },
    ],
  },
  "igot-leadership": {
    modules: [
      ["Module 1", "Goal alignment", "Set clear institutional goals and roles."],
      ["Module 2", "Team coordination", "Improve communication, collaboration and responsibility."],
      ["Module 3", "Feedback and capacity", "Use feedback and learning to strengthen performance."],
    ],
    questions: [
      { question: "What supports effective team performance?", options: ["Clear goals and communication", "Unclear responsibilities", "No feedback", "Avoiding coordination"], correct: 0 },
      { question: "Why is capacity building important?", options: ["It strengthens capabilities for improved performance", "It prevents learning", "It removes adaptation", "It eliminates development needs"], correct: 0 },
      { question: "Which is a constructive leadership practice?", options: ["Using feedback to improve performance", "Avoiding feedback", "Ignoring outcomes", "Discouraging collaboration"], correct: 0 },
    ],
  },
};

function CourseQuiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course") || "igot-digital-governance";
  const course = governmentCourses.find((item) => item.id === courseId) || governmentCourses[1];
  const content = learningContent[course.id] || learningContent["igot-digital-governance"];

  const [mode, setMode] = useState("learning");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const progress = useMemo(() => mode === "learning" ? 35 : Math.round(((current + 1) / content.questions.length) * 100), [mode, current, content.questions.length]);

  const next = () => {
    if (selected === null) return;
    const nextAnswers = { ...answers, [current]: selected };
    setAnswers(nextAnswers);
    if (current < content.questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      return;
    }
    const score = content.questions.reduce((sum, question, index) => sum + (nextAnswers[index] === question.correct ? 1 : 0), 0);
    localStorage.setItem("skillsetuQuizResult", JSON.stringify({ score, total: content.questions.length, courseId: course.id, courseTitle: course.title }));
    localStorage.setItem("skillsetuStreak", String(Math.max(Number(localStorage.getItem("skillsetuStreak") || 7), 7)));
    navigate("/quiz-result");
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-2xl">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl">{course.icon}</div><div><span className="text-xs font-bold uppercase tracking-wider text-orange-500">{course.provider}</span><h1 className="mt-1 text-3xl font-bold">{course.title}</h1><p className="mt-2 text-stone-500">{course.category} • {course.duration}</p></div></div>
            <button onClick={() => navigate(`/courses?course=${course.id}`)} className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-orange-50">← Back to Course</button>
          </div>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-orange-50"><div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${progress}%` }} /></div>

          {mode === "learning" ? (
            <div className="mt-8">
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5"><p className="text-sm font-bold text-orange-300">Course learning only</p><p className="mt-1 text-sm text-stone-500">PDF upload has been moved to the separate <strong className="text-stone-700">PDF → AI Quiz</strong> option in the top navigation.</p></div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {content.modules.map(([label, title, description], index) => <div key={title} className="rounded-2xl border border-orange-100 bg-[#fffaf3] p-5"><span className="text-xs font-bold text-orange-500">{label}</span><div className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-bold">{index + 1}</div><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-500">{description}</p></div>)}
              </div>
              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5"><p className="font-black text-amber-900">Full learning continues through iGOT Karmayogi</p><p className="mt-2 text-sm leading-6 text-amber-800">SkillSetu provides the competency match, learning preview and assessment layer. In production, the employee would continue the official learning module on iGOT Karmayogi through an authorised integration.</p><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => navigate(`/karmayogi?course=${courseId}`)} className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-stone-900">Continue on iGOT →</button><button onClick={() => setMode("quiz")} className="rounded-xl border border-orange-200 bg-white px-6 py-3 font-bold text-orange-800">Take Knowledge Check</button></div></div>
            </div>
          ) : (
            <div className="mt-8 max-w-3xl">
              <p className="text-sm font-bold text-orange-500">COURSE KNOWLEDGE CHECK • {current + 1}/{content.questions.length}</p>
              <h2 className="mt-3 text-2xl font-bold leading-relaxed">{content.questions[current].question}</h2>
              <div className="mt-6 grid gap-3">{content.questions[current].options.map((option, index) => <button key={option} onClick={() => setSelected(index)} className={`rounded-2xl border p-4 text-left transition ${selected === index ? "border-orange-400 bg-orange-400/10" : "border-orange-100 bg-[#fffaf3] hover:border-slate-600"}`}><span className="mr-3 font-bold text-orange-300">{String.fromCharCode(65 + index)}.</span>{option}</button>)}</div>
              <button onClick={next} disabled={selected === null} className="mt-7 rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 hover:bg-orange-400 disabled:opacity-40">{current === content.questions.length - 1 ? "Submit & View Result →" : "Next Question →"}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CourseQuiz;
