import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export const TestStart = () => {
  const { state } = useLocation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (state) {
      // Simulate question generation
      const generatedQuestions = generateMockQuestions(state);
      setQuestions(generatedQuestions);
    }
  }, [state]);

//   const generateMockQuestions = (config) => {
//     const { numberOfQuestion, testType, subjects, difficulty } = config;
//     const questions = [];

//     for (let i = 1; i <= parseInt(numberOfQuestion); i++) {
//       questions.push({
//         id: i,
//         type: testType.includes("mcq") ? "mcq" : "subjective",
//         question: `Sample question ${i} for ${subjects[0]} (${difficulty})`,
//         options: testType.includes("mcq")
//           ? ["Option A", "Option B", "Option C", "Option D"]
//           : null,
//         correctAnswer: testType.includes("mcq") ? "Option A" : null,
//       });
//     }
//     return questions;
//   };

const generateMockQuestions = (config) => {
    const { numberOfQuestion, testType, subjects, difficulty } = config;
    const questions = [];
    const total = parseInt(numberOfQuestion);
  
    for (let i = 1; i <= total; i++) {
      let type = "subjective";
  
      if (testType === "mcq") {
        type = "mcq";
      } else if (testType === "subjective") {
        type = "subjective";
      } else if (testType === "mcq+subjective") {
        // First half MCQ, rest Subjective
        type = i <= Math.floor(total / 2) ? "mcq" : "subjective";
      }
  
      questions.push({
        id: i,
        type,
        question: `Sample question ${i} for ${subjects[0]} (${difficulty})`,
        options: type === "mcq" ? ["Option A", "Option B", "Option C", "Option D"] : null,
        correctAnswer: type === "mcq" ? "Option A" : null,
      });
    }
  
    return questions;
  };
  

  return (
    <div style={{ marginTop: "120px", padding: "0 100px" }}>
      <h3 style={{ marginBottom: "30px", fontSize: "35px" }}>Test Begins</h3>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "25px" }}>
          <strong>{q.id}. {q.question}</strong>
          {q.type === "mcq" ? (
            <div>
              {q.options.map((opt, i) => (
                <div key={i}>
                  <input type="radio" name={`q${q.id}`} value={opt} /> {opt}
                </div>
              ))}
            </div>
          ) : (
            <textarea rows={3} style={{ width: "100%" }} />
          )}
        </div>
      ))}
    </div>
  );
};
