import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ClassForm({ mode = "create", classId, onSuccess }) {
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const [klass, setKlass] = useState({
    educationBoard: "",
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
            subTopics: [], // { name, onePagePdfUrl, fullPdfUrl, oneUploading, fullUploading }
          },
        ],
      },
    ],
  });

  // ----- load existing (edit mode) -----
  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(`${API}/classes/${classId}`);
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed to load class");
        const normalized = {
          educationBoard: data.item.educationBoard || "",
          name: data.item.name,
          subjects: (data.item.subjects || []).map((s) => ({
            name: s.name,
            chapters: (s.chapters || []).map((c) => ({
              name: c.name,
              onePagePdfUrl: c.onePagePdfUrl || "",
              onePagePdfName: c.onePagePdfUrl ? c.onePagePdfUrl.split("/").pop() : "",
              fullPdfUrl: c.fullPdfUrl || "",
              fullPdfName: c.fullPdfUrl ? c.fullPdfUrl.split("/").pop() : "",
              oneUploading: false,
              fullUploading: false,
              subTopics: (c.subTopics || []).map((t) => ({
                name: t.name || "",
                onePagePdfUrl: t.onePagePdfUrl || "",
                fullPdfUrl: t.fullPdfUrl || "",
                oneUploading: false,
                fullUploading: false,
              })),
            })),
          })),
        };
        if (!normalized.subjects.length) {
          normalized.subjects = [
            {
              name: "",
              chapters: [
                {
                  name: "",
                  onePagePdfUrl: "",
                  fullPdfUrl: "",
                  oneUploading: false,
                  fullUploading: false,
                  subTopics: [],
                },
              ],
            },
          ];
        }
        setKlass(normalized);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (mode === "edit" && classId) fetchOne();
  }, [mode, classId]);

  // ----- top-level fields -----
  const updateBoard = (e) => setKlass((k) => ({ ...k, educationBoard: e.target.value }));
  const updateClassName = (e) => setKlass((k) => ({ ...k, name: e.target.value }));

  // ----- subjects -----
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
              fullPdfUrl: "",
              oneUploading: false,
              fullUploading: false,
              subTopics: [],
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

  // ----- chapters -----
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
            fullPdfUrl: "",
            oneUploading: false,
            fullUploading: false,
            subTopics: [],
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

  // ----- sub-topics -----
  const addSubTopic = (si, ci) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      const chapters = [...subjects[si].chapters];
      const ch = { ...chapters[ci] };
      ch.subTopics = [
        ...(ch.subTopics || []),
        {
          name: "",
          onePagePdfUrl: "",
          fullPdfUrl: "",
          oneUploading: false,
          fullUploading: false,
        },
      ];
      chapters[ci] = ch;
      subjects[si] = { ...subjects[si], chapters };
      return { ...k, subjects };
    });

  const removeSubTopic = (si, ci, ti) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      const chapters = [...subjects[si].chapters];
      const ch = { ...chapters[ci] };
      ch.subTopics = (ch.subTopics || []).filter((_, i) => i !== ti);
      chapters[ci] = ch;
      subjects[si] = { ...subjects[si], chapters };
      return { ...k, subjects };
    });

  const updateSubTopicField = (si, ci, ti, field, value) =>
    setKlass((k) => {
      const subjects = [...k.subjects];
      const chapters = [...subjects[si].chapters];
      const ch = { ...chapters[ci] };
      const subs = [...(ch.subTopics || [])];
      subs[ti] = { ...subs[ti], [field]: value };
      ch.subTopics = subs;
      chapters[ci] = ch;
      subjects[si] = { ...subjects[si], chapters };
      return { ...k, subjects };
    });

  // ----- uploads -----
  const uploadPdf = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API}/uploads/pdf`, { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data?.ok) throw new Error(data?.message || "PDF upload failed");
    return { url: data.url, name: data.name };
  };

  const onChapterPdfChange = async (si, ci, kind, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF");
      return;
    }
    try {
      updateChapterField(si, ci, `${kind}Uploading`, true);
      const up = await uploadPdf(file);
      if (kind === "one") {
        updateChapterField(si, ci, "onePagePdfUrl", up.url);
        updateChapterField(si, ci, "onePagePdfName", up.name);
      } else {
        updateChapterField(si, ci, "fullPdfUrl", up.url);
        updateChapterField(si, ci, "fullPdfName", up.name);
      }
    } catch (e2) {
      setError(e2.message);
    } finally {
      updateChapterField(si, ci, `${kind}Uploading`, false);
      e.target.value = "";
    }
  };

  const onSubTopicPdfChange = async (si, ci, ti, kind, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF");
      return;
    }
    try {
      updateSubTopicField(si, ci, ti, `${kind}Uploading`, true);
      const up = await uploadPdf(file);
      if (kind === "one") {
        updateSubTopicField(si, ci, ti, "onePagePdfUrl", up.url);
      } else {
        updateSubTopicField(si, ci, ti, "fullPdfUrl", up.url);
      }
    } catch (e2) {
      setError(e2.message);
    } finally {
      updateSubTopicField(si, ci, ti, `${kind}Uploading`, false);
      e.target.value = "";
    }
  };

  // ----- validation + submit -----
  const validate = () => {
    if (!klass.educationBoard.trim()) return "Please select or enter the Education Board.";
    if (!klass.name.trim()) return "Please enter a class name.";
    if (!klass.subjects.length) return "Add at least one subject.";
    for (const s of klass.subjects) {
      if (!s.name.trim()) return "Each subject needs a name.";
      if (!s.chapters.length) return "Each subject needs at least one chapter.";
      for (const c of s.chapters) {
        if (!c.name.trim()) return "Each chapter needs a name.";
        if (c.subTopics) {
          for (const t of c.subTopics) {
            if (!t.name?.trim()) return "Each sub-topic needs a name.";
          }
        }
      }
    }
    return "";
  };

  const submit = async () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    const payload = {
      educationBoard: (klass.educationBoard || "").trim(),
      name: klass.name,
      subjects: klass.subjects.map((s) => ({
        name: s.name,
        chapters: s.chapters.map((c) => ({
          name: c.name,
          onePagePdfUrl: c.onePagePdfUrl || "",
          fullPdfUrl: c.fullPdfUrl || "",
          subTopics: (c.subTopics || []).map((t) => ({
            name: t.name,
            onePagePdfUrl: t.onePagePdfUrl || "",
            fullPdfUrl: t.fullPdfUrl || "",
          })),
        })),
      })),
    };

    try {
      setSaving(true);
      setError("");
      setMsg("");
      const url = mode === "edit" ? `${API}/classes/${classId}` : `${API}/classes`;
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.message || "Save failed");
      setMsg("Saved!");
      onSuccess?.(data.class || data.item);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <Spinner animation="border" size="sm" /> Loading…
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Form>
          {/* 1) Education Board */}
          <Form.Group className="mb-3">
            <Form.Label>Education Board</Form.Label>
            <Form.Control
              list="boardOptions"
              placeholder="e.g., CBSE"
              value={klass.educationBoard}
              onChange={updateBoard}
            />
            <datalist id="boardOptions">
              <option value="CBSE" />
              <option value="ICSE" />
              <option value="State Board" />
              <option value="IB (International Baccalaureate)" />
              <option value="Cambridge (IGCSE)" />
              <option value="Other" />
            </datalist>
            <Form.Text className="text-muted">
              Pick from suggestions or type your own board name.
            </Form.Text>
          </Form.Group>

          {/* 2) Class Name */}
          <Form.Group className="mb-3">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              placeholder="e.g., Class 10"
              value={klass.name}
              onChange={updateClassName}
            />
          </Form.Group>

          {/* 3) Subjects → Chapters → Sub-topics */}
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
                          placeholder="e.g., Motion, Algebra"
                          value={c.name}
                          onChange={(e) => updateChapterField(si, ci, "name", e.target.value)}
                        />
                      </InputGroup>
                    </Col>

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

                  {/* Sub-topics */}
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Sub-topics</strong>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => addSubTopic(si, ci)}
                      >
                        + Add Sub-topic
                      </Button>
                    </div>

                    {c.subTopics?.length ? (
                      <div className="d-grid gap-3">
                        {c.subTopics.map((t, ti) => (
                          <div key={ti} className="p-2 border rounded">
                            <Row className="g-2">
                              <Col md={4}>
                                <Form.Control
                                  placeholder={`Sub-topic #${ti + 1}`}
                                  value={t.name}
                                  onChange={(e) =>
                                    updateSubTopicField(si, ci, ti, "name", e.target.value)
                                  }
                                />
                              </Col>
                              <Col md={4}>
                                <Form.Label className="small mb-1">1-Page Notes (PDF)</Form.Label>
                                <div className="d-flex align-items-center gap-2">
                                  <Form.Control
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      onSubTopicPdfChange(si, ci, ti, "one", e)
                                    }
                                  />
                                  {t.oneUploading && (
                                    <Spinner size="sm" animation="border" />
                                  )}
                                </div>
                                {t.onePagePdfUrl && (
                                  <div className="mt-1">
                                    <a
                                      href={t.onePagePdfUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      View 1-page PDF
                                    </a>
                                  </div>
                                )}
                              </Col>
                              <Col md={4}>
                                <Form.Label className="small mb-1">Full Notes (PDF)</Form.Label>
                                <div className="d-flex align-items-center gap-2">
                                  <Form.Control
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) =>
                                      onSubTopicPdfChange(si, ci, ti, "full", e)
                                    }
                                  />
                                  {t.fullUploading && (
                                    <Spinner size="sm" animation="border" />
                                  )}
                                </div>
                                {t.fullPdfUrl && (
                                  <div className="mt-1">
                                    <a
                                      href={t.fullPdfUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      View Full PDF
                                    </a>
                                  </div>
                                )}
                              </Col>
                            </Row>

                            {/* Test buttons */}
                            <div className="mt-2 d-flex gap-2">
                              <Button
                                variant="outline-success"
                                size="sm"
                                href={`/test-page?class=${encodeURIComponent(
                                  klass.name
                                )}&subject=${encodeURIComponent(
                                  s.name
                                )}&chapter=${encodeURIComponent(
                                  c.name
                                )}&topic=${encodeURIComponent(
                                  t.name
                                )}&difficulty=beginner`}
                              >
                                Beginner Test
                              </Button>
                              <Button
                                variant="outline-warning"
                                size="sm"
                                href={`/test-page?class=${encodeURIComponent(
                                  klass.name
                                )}&subject=${encodeURIComponent(
                                  s.name
                                )}&chapter=${encodeURIComponent(
                                  c.name
                                )}&topic=${encodeURIComponent(
                                  t.name
                                )}&difficulty=intermediate`}
                              >
                                Intermediate Test
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                href={`/test-page?class=${encodeURIComponent(
                                  klass.name
                                )}&subject=${encodeURIComponent(
                                  s.name
                                )}&chapter=${encodeURIComponent(
                                  c.name
                                )}&topic=${encodeURIComponent(
                                  t.name
                                )}&difficulty=advanced`}
                              >
                                Advanced Test
                              </Button>

                              <Button
                                className="ms-auto"
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removeSubTopic(si, ci, ti)}
                              >
                                Remove Sub-topic
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted small">No sub-topics yet.</div>
                    )}
                  </div>

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
          {msg && <div className="mt-3 text-success small">{msg}</div>}
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end gap-2">
        <Button onClick={submit} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
