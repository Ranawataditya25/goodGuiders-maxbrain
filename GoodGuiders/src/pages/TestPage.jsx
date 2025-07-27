import { useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const TestPage = () => {
  const [formData, setFormData] = useState({
    class: "",
    subjects: [],
    testType: "",
    difficulty: "",
    numberOfQuestion: "",
  });

  const navigate = useNavigate();

  const [subjectInput, setSubjectInput] = useState(""); // for raw input

  const handleSubjectsChange = (e) => {
    setSubjectInput(e.target.value); // always update input field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectList = subjectInput
      .split(",")
      .map((subj) => subj.trim())
      .filter((subj) => subj);

    if (subjectList.length > 3) {
      alert("Please enter up to 3 subjects only.");
      return;
    }

    const updatedFormData = {
      ...formData,
      subjects: subjectList,
    };

    console.log("Form Submitted:", updatedFormData);
    // Proceed to next step
    navigate("/test-start", { state: updatedFormData });
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Container>
        <h2 className="mb-40 text-center">Take a Test</h2>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-45">
            <Form.Group className="mb-20">
              <Form.Label>Select Class</Form.Label>
              <Form.Control
                as="select"
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                required
              >
                <option value="">-- Select --</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-20">
              <Form.Label>Subjects (max 3, comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Math, Science, English"
                value={subjectInput}
                onChange={handleSubjectsChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-20">
              <Form.Label>Select Type</Form.Label>
              <Form.Control
                as="select"
                value={formData.testType}
                onChange={(e) =>
                  setFormData({ ...formData, testType: e.target.value })
                }
                required
              >
                <option value="">-- Select --</option>
                <option value="mcq">MCQ</option>
                <option value="subjective">Subjective</option>
                <option value="mcq+subjective">MCQ + Subjective</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-20">
              <Form.Label>Choose Difficulty Level</Form.Label>
              <Form.Control
                as="select"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
                required
              >
                <option value="">-- Select --</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Number Of Question</Form.Label>
              <Form.Control
                as="select"
                value={formData.numberOfQuestion}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfQuestion: e.target.value })
                }
                required
              >
                <option value="">-- Select --</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Start Test
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
