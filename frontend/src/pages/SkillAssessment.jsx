import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putJson } from "../utils/api";
import Navbar from "../components/Navbar";

const questions = [
  {
    competency: "Citizen-Centric Service Delivery",
    question: "A citizen reports that an online public service application is delayed beyond the notified timeline. What should be the most appropriate first response?",
    options: [
      "Ask the citizen to apply again without checking the case",
      "Check the application status, explain the delay and guide the citizen on the grievance/escalation channel",
      "Ignore the request until the citizen visits the office",
      "Ask the citizen to contact a different department without verification",
    ],
    correct: 1,
  },
  {
    competency: "Digital Governance",
    question: "What is the main purpose of an e-Office or digital file workflow in government?",
    options: [
      "To increase paper movement between sections",
      "To make official work traceable, faster and easier to monitor",
      "To remove all approval responsibilities",
      "To keep records only on personal devices",
    ],
    correct: 1,
  },
  {
    competency: "Data-Driven Decision Making",
    question: "Before using a district-level dataset for an important administrative decision, what should an officer do first?",
    options: [
      "Verify the source, completeness and quality of the data",
      "Use only the largest number in the sheet",
      "Publish the decision before reviewing the data",
      "Ignore missing or inconsistent entries",
    ],
    correct: 0,
  },
  {
    competency: "Cyber Security Awareness",
    question: "You receive an email on your official account asking you to urgently click a link and re-enter your password. What is the safest action?",
    options: [
      "Click immediately because the message says urgent",
      "Forward the email to colleagues and ask them to test it",
      "Verify the sender and report the suspicious message through the official security process",
      "Reply with your password for verification",
    ],
    correct: 2,
  },
  {
    competency: "Ethics & Integrity",
    question: "A vendor who is participating in a government tender offers you an expensive personal gift. What is the most appropriate response?",
    options: [
      "Accept it because no decision has been taken yet",
      "Accept it but do not tell anyone",
      "Decline it and follow the applicable conduct and disclosure rules",
      "Ask the vendor to give the gift after the tender closes",
    ],
    correct: 2,
  },
  {
    competency: "Citizen-Centric Service Delivery",
    question: "Which measure best reflects citizen-centric public service delivery?",
    options: [
      "Number of internal meetings held",
      "Ease of access, timeliness and resolution quality for citizens",
      "Amount of paperwork generated",
      "Number of times a citizen is asked to revisit an office",
    ],
    correct: 1,
  },
  {
    competency: "Digital Governance",
    question: "Why is interoperability important between government digital systems?",
    options: [
      "It helps authorized systems exchange data and reduces repeated manual entry",
      "It prevents departments from sharing any information",
      "It requires every service to use a different citizen identity",
      "It increases duplicate records by design",
    ],
    correct: 0,
  },
  {
    competency: "Data-Driven Decision Making",
    question: "A dashboard shows that grievance pendency has increased for three consecutive months. What is the most useful next step?",
    options: [
      "Ignore the trend because dashboards are only for display",
      "Examine category, location and processing-stage data to identify the cause",
      "Delete older grievance records",
      "Stop collecting new data",
    ],
    correct: 1,
  },
  {
    competency: "Cyber Security Awareness",
    question: "Which practice is most appropriate for an official government account?",
    options: [
      "Use a strong unique password and multi-factor authentication where available",
      "Share the password with the entire team",
      "Reuse the same easy password across all services",
      "Turn off security updates to avoid interruptions",
    ],
    correct: 0,
  },
  {
    competency: "Ethics & Integrity",
    question: "What does accountability in public administration primarily require?",
    options: [
      "Avoiding written records of decisions",
      "Being answerable for decisions, actions and use of public resources",
      "Keeping criteria hidden from citizens",
      "Giving preference to personal relationships",
    ],
    correct: 1,
  },
];

function SkillAssessment() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [responses, setResponses] = useState({});

  const item = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = async () => {
    if (selected === null) return;

    const nextResponses = { ...responses, [currentQuestion]: selected };
    setResponses(nextResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      return;
    }

    const competencyStats = {};
    questions.forEach((question, index) => {
      if (!competencyStats[question.competency]) {
        competencyStats[question.competency] = { correct: 0, total: 0 };
      }
      competencyStats[question.competency].total += 1;
      if (nextResponses[index] === question.correct) {
        competencyStats[question.competency].correct += 1;
      }
    });

    const assessment = Object.fromEntries(
      Object.entries(competencyStats).map(([name, stat]) => [
        name,
        Math.round((stat.correct / stat.total) * 100),
      ])
    );

    localStorage.setItem("skillsetuAssessment", JSON.stringify(assessment));
    localStorage.setItem("skillsetuAssessmentResponses", JSON.stringify(nextResponses));

    try {
      await putJson('/profile', { competencyScores: assessment });
    } catch (err) {
      console.error('Failed to sync scores to backend:', err);
    }

    navigate("/skill-gap");
  };

  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-300">
            Government Competency Diagnostic
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">Public Service Readiness Assessment</h1>
          <p className="mx-auto mt-3 max-w-2xl text-stone-500">
            Scenario-based questions covering citizen service, digital governance, data use, cyber awareness and public-service ethics.
          </p>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-2xl sm:p-8">
          <div className="mb-7 flex items-center justify-between text-sm">
            <span className="font-semibold text-stone-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="font-semibold text-orange-300">{Math.round(progress)}%</span>
          </div>
          <div className="mb-8 h-2 overflow-hidden rounded-full bg-orange-50">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <span className="inline-flex rounded-full bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-300">
            {item.competency}
          </span>
          <h2 className="mt-5 text-xl font-bold leading-relaxed text-stone-900 sm:text-2xl">{item.question}</h2>

          <div className="mt-7 grid gap-3">
            {item.options.map((option, index) => {
              const active = selected === index;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-orange-400 bg-orange-400/10 shadow-lg shadow-orange-950/30"
                      : "border-orange-100 bg-[#fffaf3]/70 hover:border-slate-600"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${active ? "bg-orange-400 text-slate-950" : "bg-orange-50 text-stone-600"}`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="pt-1 text-sm leading-6 text-stone-700 sm:text-base">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs text-stone-500">Responses are used only to generate your demo competency profile.</p>
            <button
              type="button"
              onClick={handleNext}
              disabled={selected === null}
              className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentQuestion === questions.length - 1 ? "View Skill Gaps →" : "Next Question →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SkillAssessment;
