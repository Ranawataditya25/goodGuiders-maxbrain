// src/pages/CreateClassPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container, Row, Col, Card, Form, Button, InputGroup, Spinner
} from "react-bootstrap";
import PageBreadcrumb from "../componets/PageBreadcrumb";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CreateClassPage() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [error, setError] = useState("");

  const [klass, setKlass] = useState({
    name: "",
    subjects: [
      {
        name: "",
        chapters: [
          {
            name: "",
            onePagePdfUrl: "",
            onePagePdfName: "",
            fullPdfUrl: "",
            fullPdfName: "",
            oneUploading: false,
            fullUploading: false,
          },
        ],
      },
    ],
  });

  const updateClassName = (e) => setKlass((k) => ({ ...k, name: e.target.value }));

  const addSubject = () =>
    setKlass((k) => ({
      ...k,
      subjects: [
        ...k.subjects,
        {
          name: "",
          chapters: [
            {
              name: "",
              onePagePdfUrl: "",
              onePagePdfName: "",
              fullPdfUrl: "",
              fullPdfName: "",
              oneUploading: false,
              fullUploading: false,
            },
          ],
        },
      ],
    }));

  const removeSubject = (si) =>
    setKlass((k) => ({ ...k, subjects: k.subjects.filter((_, i) => i !== si) }));

  const updateSubjectName = (si, value) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      subjects[si] = { ...subjects[si], name: value };
      return { ...k, subjects };
    });

  const addChapter = (si) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      subjects[si] = {
        ...subjects[si],
        chapters: [
          ...subjects[si].chapters,
          {
            name: "",
            onePagePdfUrl: "",
            onePagePdfName: "",
            fullPdfUrl: "",
            fullPdfName: "",
            oneUploading: false,
            fullUploading: false,
          },
        ],
      };
      return { ...k, subjects };
    });

  const removeChapter = (si, ci) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      subjects[si] = {
        ...subjects[si],
        chapters: subjects[si].chapters.filter((_, i) => i !== ci),
      };
      return { ...k, subjects };
    });

  const updateChapterField = (si, ci, field, value) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      const chapters = [...subjects[si].chapters];
      chapters[ci] = { ...chapters[ci], [field]: value };
      subjects[si] = { ...subjects[si], chapters };
      return { ...k, subjects };
    });

  // Upload PDF to server (POST /api/uploads/pdf) and return {url, name}
  const uploadPdf = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/uploads/pdf`, { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data?.ok) throw new Error(data?.message || "PDF upload failed");
    return { url: data.url, name: data.name };
  };

  // kind: "one" | "full"
  const onChapterPdfChange = async (si, ci, kind, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    try {
      updateChapterField(si, ci, `${kind}Uploading`, true);
      const uploaded = await uploadPdf(file);
      if (kind === "one") {
        updateChapterField(si, ci, "onePagePdfUrl", uploaded.url);
        updateChapterField(si, ci, "onePagePdfName", uploaded.name);
      } else {
        updateChapterField(si, ci, "fullPdfUrl", uploaded.url);
        updateChapterField(si, ci, "fullPdfName", uploaded.name);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      updateChapterField(si, ci, `${kind}Uploading`, false);
      e.target.value = "";
    }
  };

  const validate = () => {
    if (!klass.name.trim()) return "Please enter a class name.";
    if (klass.subjects.length === 0) return "Please add at least one subject.";
    for (const s of klass.subjects) {
      if (!s.name.trim()) return "Each subject needs a name.";
      if (!Array.isArray(s.chapters) || s.chapters.length === 0)
        return "Each subject needs at least one chapter.";
      for (const c of s.chapters) {
        if (!c.name.trim()) return "Each chapter needs a name.";
        // If you want to enforce at least one PDF, uncomment below:
        // if (!c.onePagePdfUrl && !c.fullPdfUrl) return "Add at least one PDF (1-page or full) for each chapter.";
      }
    }
    return "";
  };

  const submit = async () => {
    const v = validate();
    if (v) { setError(v); return; }

    const payload = {
      name: klass.name,
      subjects: klass.subjects.map((s) => ({
        name: s.name,
        chapters: s.chapters.map((c) => ({
          name: c.name,
          onePagePdfUrl: c.onePagePdfUrl || "",
          fullPdfUrl: c.fullPdfUrl || "",
        })),
      })),
    };

    try {
      setSaving(true);
      setError("");
      setSaveMsg("");
      const res = await fetch(`${API}/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed to save class.");
      setSaveMsg("Class created successfully!");
      setTimeout(() => navigate("/"), 800); // go back to dashboard
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Create Class" />
      <Container fluid className="pb-4">
        <Row>
          <Col lg={10} xl={9}>
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Create Class</h4>
                <div className="d-flex gap-2">
                  <Link to="/" className="btn btn-outline-secondary">Back</Link>
                  <Button onClick={submit} disabled={saving}>
                    {saving ? "Saving..." : "Save Class"}
                  </Button>
                </div>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Class Name</Form.Label>
                    <Form.Control
                      placeholder="e.g., Class 10, Grade 8, B.Sc. Sem-2"
                      value={klass.name}
                      onChange={updateClassName}
                    />
                  </Form.Group>

                  {klass.subjects.map((s, si) => (
                    <div key={si} className="p-3 mb-3 border rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Form.Label className="mb-0 fw-semibold">Subject #{si + 1}</Form.Label>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeSubject(si)}
                          disabled={klass.subjects.length === 1}
                        >
                          Remove Subject
                        </Button>
                      </div>

                      <Form.Group className="mb-3">
                        <Form.Control
                          placeholder="e.g., Physics, Maths, Hindi"
                          value={s.name}
                          onChange={(e) => updateSubjectName(si, e.target.value)}
                        />
                      </Form.Group>

                      <Form.Label className="fw-semibold">Chapters</Form.Label>
                      {s.chapters.map((c, ci) => (
                        <div key={ci} className="p-2 mb-2 border rounded">
                          <Row className="g-2 align-items-start">
                            <Col md={4}>
                              <InputGroup>
                                <InputGroup.Text>Chapter</InputGroup.Text>
                                <Form.Control
                                  placeholder="e.g., Motion, Algebra, Varnamala"
                                  value={c.name}
                                  onChange={(e) => updateChapterField(si, ci, "name", e.target.value)}
                                />
                              </InputGroup>
                            </Col>

                            {/* 1-Page PDF */}
                            <Col md={4}>
                              <Form.Label className="small mb-1">1-Page Notes (PDF)</Form.Label>
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) => onChapterPdfChange(si, ci, "one", e)}
                                />
                                {c.oneUploading && <Spinner size="sm" animation="border" />}
                              </div>
                              {c.onePagePdfUrl && (
                                <div className="mt-1">
                                  <a href={c.onePagePdfUrl} target="_blank" rel="noreferrer">
                                    {c.onePagePdfName || "View 1-page PDF"}
                                  </a>
                                </div>
                              )}
                            </Col>

                            {/* Full Notes PDF */}
                            <Col md={4}>
                              <Form.Label className="small mb-1">Full Notes (PDF)</Form.Label>
                              <div className="d-flex align-items-center gap-2">
                                <Form.Control
                                  type="file"
                                  accept="application/pdf"
                                  onChange={(e) => onChapterPdfChange(si, ci, "full", e)}
                                />
                                {c.fullUploading && <Spinner size="sm" animation="border" />}
                              </div>
                              {c.fullPdfUrl && (
                                <div className="mt-1">
                                  <a href={c.fullPdfUrl} target="_blank" rel="noreferrer">
                                    {c.fullPdfName || "View Full PDF"}
                                  </a>
                                </div>
                              )}
                            </Col>
                          </Row>

                          <div className="mt-2">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeChapter(si, ci)}
                              disabled={s.chapters.length === 1}
                            >
                              Remove Chapter
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline-secondary" size="sm" onClick={() => addChapter(si)}>
                        + Add Chapter
                      </Button>
                    </div>
                  ))}

                  <Button variant="outline-primary" onClick={addSubject}>
                    + Add Subject
                  </Button>

                  {error && <div className="mt-3 text-danger small">{error}</div>}
                  {saveMsg && <div className="mt-3 text-success small">{saveMsg}</div>}
                </Form>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-end gap-2">
                <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
                <Button onClick={submit} disabled={saving}>
                  {saving ? "Saving..." : "Save Class"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
