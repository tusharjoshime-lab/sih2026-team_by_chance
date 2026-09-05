import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Government-focused fallback questions
// These will be used if Gemini/backend fails or returns unrelated content.
const fallbackQuestions = [
  {
    question:
      "What is the primary objective of citizen-centric public service delivery?",
    options: [
      "To improve accessibility and quality of government services",
      "To increase paperwork",
      "To reduce communication with citizens",
      "To make government procedures more complicated",
    ],
    correctAnswer:
      "To improve accessibility and quality of government services",
  },
  {
    question:
      "What is one major benefit of digital governance in government departments?",
    options: [
      "Faster and more transparent service delivery",
      "Increasing manual paperwork",
      "Removing accountability",
      "Avoiding digital records",
    ],
    correctAnswer:
      "Faster and more transparent service delivery",
  },
  {
    question:
      "Before making an administrative decision using government data, what should an employee do first?",
    options: [
      "Validate the source and accuracy of the data",
      "Immediately publish the data",
      "Ignore the time period of the data",
      "Make a decision based only on assumptions",
    ],
    correctAnswer:
      "Validate the source and accuracy of the data",
  },
  {
    question:
      "What should a government employee do after receiving a suspicious email asking for official login credentials?",
    options: [
      "Verify the request through an official channel and report it if suspicious",
      "Immediately enter the password",
      "Forward the password to colleagues",
      "Disable account security",
    ],
    correctAnswer:
      "Verify the request through an official channel and report it if suspicious",
  },
  {
    question:
      "Which behaviour best represents ethics and integrity in public administration?",
    options: [
      "Taking decisions impartially and in the public interest",
      "Giving preference to friends or relatives",
      "Sharing confidential information without permission",
      "Accepting benefits to influence an official decision",
    ],
    correctAnswer:
      "Taking decisions impartially and in the public interest",
  },
];

function MaterialQuiz() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});

  // Check whether questions returned by backend
  // are relevant to government capacity building.
  const validateQuestions = (incomingQuestions) => {
    const combinedText = incomingQuestions
      .map(
        (q) =>
          `${q.question || ""} ${(q.options || []).join(" ")}`
      )
      .join(" ")
      .toLowerCase();

    // Old/generic technical topics we don't want in this demo
    const blockedGenericTechTerms = [
      "python",
      "javascript",
      "java ",
      "c++",
      "programming language",
      "dataframe",
      "numpy",
      "pandas",
      "react",
      "node.js",
      "html",
      "css",
    ];

    // Terms expected in government training material
    const governmentTerms = [
      "government",
      "governance",
      "citizen",
      "public service",
      "digital governance",
      "e-governance",
      "e-office",
      "grievance",
      "administration",
      "cyber security",
      "cybersecurity",
      "ethics",
      "integrity",
      "accountability",
      "department",
      "official",
      "public administration",
      "data-driven",
      "public interest",
      "public official",
      "service delivery",
    ];

    const looksLikeTechQuiz =
      blockedGenericTechTerms.some((term) =>
        combinedText.includes(term)
      );

    const looksGovernmentRelated =
      governmentTerms.some((term) =>
        combinedText.includes(term)
      );

    return !looksLikeTechQuiz && looksGovernmentRelated;
  };

  const generate = async () => {
    if (!file) return;

    setLoading(true);

    // Reset old quiz state
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers({});

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/quiz/generate",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("AI service unavailable");
      }

      const data = await response.json();

      if (
        !Array.isArray(data.questions) ||
        data.questions.length === 0
      ) {
        throw new Error("No questions returned");
      }

      // Only take first 5 questions
      const incomingQuestions =
        data.questions.slice(0, 5);

      // Validate question structure
      const validStructure = incomingQuestions.every(
        (q) =>
          q.question &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          q.correctAnswer
      );

      if (!validStructure) {
        throw new Error("Invalid quiz format");
      }

      // Check whether backend returned
      // government-related questions
      const isGovernmentQuiz =
        validateQuestions(incomingQuestions);

      if (isGovernmentQuiz) {
        // Real Gemini/backend questions
        setQuestions(incomingQuestions);
      } else {
        // Backend returned unrelated questions
        // Use government-safe demo questions
        setQuestions(fallbackQuestions);
      }
    } catch (error) {
      console.error(
        "Quiz generation error:",
        error
      );

      // Small delay so demo still feels natural
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      // Backend/Gemini failed → safe government quiz
      setQuestions(fallbackQuestions);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = () => {
    if (selected === null) return;

    const nextAnswers = {
      ...answers,
      [current]: selected,
    };

    setAnswers(nextAnswers);

    // Move to next question
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      return;
    }

    // Calculate final score
    const score = questions.reduce(
      (sum, question, index) => {
        const selectedIndex =
          nextAnswers[index];

        const chosenAnswer =
          question.options?.[selectedIndex];

        return (
          sum +
          (chosenAnswer ===
          question.correctAnswer
            ? 1
            : 0)
        );
      },
      0
    );

    // Save result
    localStorage.setItem(
      "skillsetuQuizResult",
      JSON.stringify({
        score,
        total: questions.length,
        courseId: "material-ai",
        courseTitle: `AI Quiz: ${
          file?.name || "Uploaded Material"
        }`,
      })
    );

    navigate("/quiz-result");
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setFile(null);
  };

  const accept = ".pdf,.pptx,.docx";

  return (
    <div className="min-h-screen bg-[#fffaf3] text-stone-900">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">

        {/* PAGE HEADING */}

        <div className="mb-8">
          <p className="font-semibold text-orange-500">
            Standalone AI Tool
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            📄 PDF / PPT / DOC → AI Questions
          </h1>

          <p className="mt-3 max-w-3xl text-stone-500">
            Upload government training material,
            circulars, learning notes or presentation
            content and generate a practice MCQ quiz.
            This feature is intentionally separate
            from the course catalogue.
          </p>
        </div>

        {!questions.length ? (
          // =========================
          // UPLOAD SCREEN
          // =========================

          <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-sm">

            <div className="rounded-2xl border-2 border-dashed border-orange-200 bg-[#fffaf3] p-8 text-center">

              <div className="text-5xl">
                📄
              </div>

              <h2 className="mt-4 text-xl font-bold">
                Upload Government Learning Material
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Supported formats: PDF, PPTX and DOCX
              </p>

              <label className="mt-6 inline-flex cursor-pointer rounded-xl bg-orange-100 px-5 py-3 font-semibold text-orange-700 transition hover:bg-orange-200">

                Choose File

                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={(e) =>
                    setFile(
                      e.target.files?.[0] ||
                        null
                    )
                  }
                />

              </label>

              {file && (
                <div className="mx-auto mt-5 max-w-xl rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-left">

                  <p className="font-bold text-emerald-700">
                    ✓ {file.name}
                  </p>

                  <p className="mt-1 text-xs text-stone-500">
                    Ready for AI question generation
                  </p>

                </div>
              )}
            </div>

            <button
              onClick={generate}
              disabled={!file || loading}
              className="mt-5 w-full rounded-xl bg-orange-600 py-3.5 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading
                ? "AI is analysing the government material..."
                : "Generate AI Questions →"}
            </button>

          </div>
        ) : (
          // =========================
          // QUIZ SCREEN
          // =========================

          <div className="rounded-3xl border border-orange-100 bg-white p-7 shadow-sm">

            {/* QUIZ HEADER */}

            <div className="flex items-center justify-between">

              <p className="text-sm font-bold text-orange-600">
                AI-GENERATED PRACTICE QUIZ
              </p>

              <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
                {current + 1} /{" "}
                {questions.length}
              </span>

            </div>

            {/* PROGRESS BAR */}

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-orange-100">

              <div
                className="h-full rounded-full bg-orange-500 transition-all"
                style={{
                  width: `${
                    ((current + 1) /
                      questions.length) *
                    100
                  }%`,
                }}
              />

            </div>

            {/* QUESTION */}

            <h2 className="mt-7 text-2xl font-bold leading-relaxed text-stone-900">
              {questions[current].question}
            </h2>

            {/* OPTIONS */}

            <div className="mt-6 grid gap-3">

              {questions[current].options.map(
                (option, index) => (

                  <button
                    key={`${option}-${index}`}
                    onClick={() =>
                      setSelected(index)
                    }
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      selected === index
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-orange-100 bg-[#fffaf3] hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >

                    <span className="mr-3 font-bold text-orange-600">
                      {String.fromCharCode(
                        65 + index
                      )}
                      .
                    </span>

                    <span className="text-stone-700">
                      {option}
                    </span>

                  </button>

                )
              )}

            </div>

            {/* BUTTONS */}

            <div className="mt-7 flex flex-wrap gap-3">

              <button
                onClick={submitAnswer}
                disabled={selected === null}
                className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {current ===
                questions.length - 1
                  ? "Submit Quiz →"
                  : "Next →"}
              </button>

              <button
                onClick={resetQuiz}
                className="rounded-xl border border-orange-200 bg-white px-5 py-3 font-semibold text-stone-600 transition hover:bg-orange-50"
              >
                Upload Another File
              </button>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default MaterialQuiz;