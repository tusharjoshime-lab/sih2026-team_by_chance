import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE, getAuthToken, postJson } from '../utils/api';

function MaterialQuiz() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizId, setQuizId] = useState(null);


  const generate = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    // Reset old quiz state
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setQuizId(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = getAuthToken();
      const response = await fetch(`${API_BASE}/quiz/generate?num_questions=5`, {
        method: "POST",
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });

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

      setQuestions(data.questions);
      setQuizId(data.quizId);
    } catch (err) {
      console.error(
        "Quiz generation error:",
        err
      );
      setError(err.message || "Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
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

    setLoading(true);
    setError(null);

    try {
      const answersArray = questions.map((q, idx) => {
        const selectedIdx = nextAnswers[idx];
        return q.options[selectedIdx];
      });

      const result = await postJson("/quiz/submit", {
        quizId,
        answers: answersArray,
      });

      navigate("/quiz-result", { state: result });
    } catch (err) {
      console.error("Submit error:", err);
      setError("Failed to submit quiz.");
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswers({});
    setQuizId(null);
    setFile(null);
    setError(null);
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

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

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
                disabled={selected === null || loading}
                className="rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Submitting..." : (current ===
                questions.length - 1
                  ? "Submit Quiz →"
                  : "Next →")}
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