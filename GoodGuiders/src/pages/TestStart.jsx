import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";

export const TestStart = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const questionRefs = useRef([]);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load userAnswers from localStorage on first render
  useEffect(() => {
    const savedAnswers = localStorage.getItem("userAnswers");
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  // Fetch or load questions from localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem("currentTestQuestions");

    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/questions/fetch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            class: state.class,
            subject: state.subjects,
            type: state.testType,
            count: parseInt(state.numberOfQuestion),
          }),
        });

        const data = await res.json();
        if (Array.isArray(data)) {
          setQuestions(data);
          localStorage.setItem("currentTestQuestions", JSON.stringify(data));
        } else {
          console.error("Invalid question format:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
      setLoading(false);
    } else if (state) {
      fetchQuestions();
    }
  }, [state]);

  const answeredCount = useMemo(() => {
    return questions.filter((q) => {
      const ans = userAnswers[q._id];
      if (q.type === "mcq") {
        return ans?.selectedAnswer?.trim();
      } else {
        return ans?.writtenAnswer?.trim();
      }
    }).length;
  }, [questions, userAnswers]);

  const handleMCQChange = (questionId, selectedOption) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: { ...prev[questionId], selectedAnswer: selectedOption },
      };
      localStorage.setItem("userAnswers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubjectiveChange = (questionId, text) => {
    setUserAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: { ...prev[questionId], writtenAnswer: text },
      };
      localStorage.setItem("userAnswers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (submitted) return; // prevent double submit
    setSubmitted(true); // disable button immediately

    const formattedAnswers = questions.map((q) => ({
      questionId: q._id,
      type: q.type,
      selectedAnswer: userAnswers[q._id]?.selectedAnswer || null,
      writtenAnswer: userAnswers[q._id]?.writtenAnswer || null,
    }));

    const unansweredIndexes = formattedAnswers
      .map((ans, i) => {
        if (
          (ans.type === "mcq" && !ans.selectedAnswer) ||
          (ans.type === "subjective" &&
            (!ans.writtenAnswer || ans.writtenAnswer.trim() === ""))
        ) {
          return i;
        }
        return null;
      })
      .filter((i) => i !== null);

    if (unansweredIndexes.length > 0) {
      const firstUnansweredIndex = unansweredIndexes[0];
      questionRefs.current[firstUnansweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      alert("⚠️ Please answer all the questions before submitting.");
      setSubmitted(false); // re-enable on failure
      return;
    }

    if (!window.confirm("Are you sure you want to submit the test?")) {
      setSubmitted(false); // re-enable if cancelled
      return;
    }

    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const userEmail = user?.email;

    try {
      const res = await fetch("http://localhost:5000/api/questions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          class: state.class,
          subjects: state.subjects,
          type: state.testType,
          answers: formattedAnswers,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert(data.message);
        localStorage.removeItem("userAnswers");
        localStorage.removeItem("currentTestQuestions");
        navigate("/test-end");
      } else {
        alert("Submission failed: " + data.message);
        setSubmitted(false); // re-enable on failure
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error submitting test.");
      setSubmitted(false); // re-enable on error
    }
  };


  if (loading) return <div style={{ marginTop: "120px", padding: "0 100px", fontSize: "45px" }}>Loading questions...</div>;

  return (
    <div style={{ marginTop: "120px", padding: "0 100px" }}>
      <h3 style={{ marginBottom: "30px", fontSize: "35px" }}>Test Begins</h3>

      {questions.map((q, index) => (
        <div key={q._id || index} ref={(el) => (questionRefs.current[index] = el)} style={{ marginBottom: "25px" }}>
          <strong>{index + 1}. {q.question}</strong>

          {q.type === "mcq" ? (
            <div style={{ marginTop: "10px" }}>
              {q.options.map((opt, i) => (
                <div key={i} style={{ marginBottom: "5px" }}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={opt}
                    onChange={() => handleMCQChange(q._id, opt)}
                    checked={userAnswers[q._id]?.selectedAnswer === opt}
                  />{" "}
                  {opt}
                </div>
              ))}
            </div>
          ) : (
            <textarea
              rows={3}
              style={{ width: "100%", marginTop: "10px" }}
              placeholder="Type your answer here..."
              onChange={(e) => handleSubjectiveChange(q._id, e.target.value)}
              value={userAnswers[q._id]?.writtenAnswer || ""}
            />
          )}
        </div>
      ))}

      <p style={{ marginTop: "20px", fontSize: "18px", color: "#333" }}>
        Answered {answeredCount} of {questions.length} questions
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "35px" }}>
        <button
          onClick={handleSubmit}
          disabled={submitted}
          style={{
            marginTop: "30px",
            padding: "10px 25px",
            backgroundColor: submitted ? "#6c757d" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: submitted ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {submitted ? "Submitting..." : "Submit Test"}
        </button>

        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all your answers?")) {
              localStorage.removeItem("userAnswers");
              setUserAnswers({});
            }
          }}
          style={{
            marginTop: "30px",
            padding: "10px 25px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Reset Test
        </button>
      </div>

    </div>
  );
};
