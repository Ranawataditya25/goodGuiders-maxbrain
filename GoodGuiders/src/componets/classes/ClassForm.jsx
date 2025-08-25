import { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ClassForm({ mode = "create", classId, onSuccess }) {
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
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

  // fetch existing on edit
  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(`${API}/classes/${classId}`);
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error(data?.message || "Failed to load class");
        // normalize into UI state (add upload flags)
        const normalized = {
          name: data.item.name,
          subjects: (data.item.subjects || []).map(s => ({
            name: s.name,
            chapters: (s.chapters || []).map(c => ({
              name: c.name,
              onePagePdfUrl: c.onePagePdfUrl || "",
              onePagePdfName: c.onePagePdfUrl ? c.onePagePdfUrl.split("/").pop() : "",
              fullPdfUrl: c.fullPdfUrl || "",
              fullPdfName: c.fullPdfUrl ? c.fullPdfUrl.split("/").pop() : "",
              oneUploading: false,
              fullUploading: false,
            })),
          })),
        };
        if (!normalized.subjects.length) {
          normalized.subjects = [{ name: "", chapters: [{ name: "", onePagePdfUrl: "", fullPdfUrl: "", oneUploading: false, fullUploading: false }] }];
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

  const updateClassName = (e) => setKlass(k => ({ ...k, name: e.target.value }));

  const addSubject = () =>
    setKlass(k => ({
      ...k,
      subjects: [...k.subjects, { name: "", chapters: [{ name: "", onePagePdfUrl: "", fullPdfUrl: "", oneUploading: false, fullUploading: false }] }],
    }));

  const removeSubject = (si) =>
    setKlass(k => ({ ...k, subjects: k.subjects.filter((_, i) => i !== si) }));

  const updateSubjectName = (si, value) =>
    setKlass(k => {
      const subjects = [...k.subjects];
      subjects[si] = { ...subjects[si], name: value };
      return { ...k, subjects };
    });

  const addChapter = (si) =>
    setKlass(k => {
      const subjects = [...k.subjects];
      subjects[si] = {
        ...subjects[si],
        chapters: [...subjects[si].chapters, { name: "", onePagePdfUrl: "", fullPdfUrl: "", oneUploading: false, fullUploading: false }],
      };
      return { ...k, subjects };
    });

  const removeChapter = (si, ci) =>
    setKlass(k => {
      const subjects = [...k.subjects];
      subjects[si] = {
        ...subjects[si],
        chapters: subjects[si].chapters.filter((_, i) => i !== ci),
      };
      return { ...k, subjects };
    });

  const updateChapterField = (si, ci, field, value) =>
    setKlass(k => {
      const subjects = [...k.subjects];
      const chapters = [...subjects[si].chapters];
      chapters[ci] = { ...chapters[ci], [field]: value };
      subjects[si] = { ...subjects[si], chapters };
      return { ...k, subjects };
    });

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
    if (file.type !== "application/pdf") { setError("Please upload a PDF"); return; }
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

  const validate = () => {
    if (!klass.name.trim()) return "Please enter a class name.";
    if (!klass.subjects.length) return "Add at least one subject.";
    for (const s of klass.subjects) {
      if (!s.name.trim()) return "Each subject needs a name.";
      if (!s.chapters.length) return "Each subject needs at least one chapter.";
      for (const c of s.chapters) {
        if (!c.name.trim()) return "Each chapter needs a name.";
      }
    }
    return "";
  };

  const submit = async () => {
    const v = validate();
    if (v) { setError(v); return; }

    const payload = {
      name: klass.name,
      subjects: klass.subjects.map(s => ({
        name: s.name,
        chapters: s.chapters.map(c => ({
          name: c.name,
          onePagePdfUrl: c.onePagePdfUrl || "",
          fullPdfUrl: c.fullPdfUrl || "",
        })),
      })),
    };

    try {
      setSaving(true); setError(""); setMsg("");
      const url = mode === "edit" ? `${API}/classes/${classId}` : `${API}/classes`;
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
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

  if (loading) return <div className="p-4"><Spinner animation="border" size="sm" /> Loading…</div>;

  return (
    <Card>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Class Name</Form.Label>
            <Form.Control placeholder="e.g., Class 10" value={klass.name} onChange={updateClassName} />
          </Form.Group>

          {klass.subjects.map((s, si) => (
            <div key={si} className="p-3 mb-3 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="mb-0 fw-semibold">Subject #{si + 1}</Form.Label>
                <Button variant="outline-danger" size="sm" onClick={() => removeSubject(si)} disabled={klass.subjects.length === 1}>
                  Remove Subject
                </Button>
              </div>

              <Form.Group className="mb-3">
                <Form.Control placeholder="e.g., Physics, Maths, Hindi" value={s.name} onChange={(e) => updateSubjectName(si, e.target.value)} />
              </Form.Group>

              <Form.Label className="fw-semibold">Chapters</Form.Label>
              {s.chapters.map((c, ci) => (
                <div key={ci} className="p-2 mb-2 border rounded">
                  <Row className="g-2 align-items-start">
                    <Col md={4}>
                      <InputGroup>
                        <InputGroup.Text>Chapter</InputGroup.Text>
                        <Form.Control placeholder="e.g., Motion, Algebra" value={c.name}
                          onChange={(e) => updateChapterField(si, ci, "name", e.target.value)} />
                      </InputGroup>
                    </Col>

                    <Col md={4}>
                      <Form.Label className="small mb-1">1-Page Notes (PDF)</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control type="file" accept="application/pdf"
                          onChange={(e) => onChapterPdfChange(si, ci, "one", e)} />
                        {c.oneUploading && <Spinner size="sm" animation="border" />}
                      </div>
                      {c.onePagePdfUrl && <div className="mt-1"><a href={c.onePagePdfUrl} target="_blank" rel="noreferrer">{c.onePagePdfName || "View 1-page PDF"}</a></div>}
                    </Col>

                    <Col md={4}>
                      <Form.Label className="small mb-1">Full Notes (PDF)</Form.Label>
                      <div className="d-flex align-items-center gap-2">
                        <Form.Control type="file" accept="application/pdf"
                          onChange={(e) => onChapterPdfChange(si, ci, "full", e)} />
                        {c.fullUploading && <Spinner size="sm" animation="border" />}
                      </div>
                      {c.fullPdfUrl && <div className="mt-1"><a href={c.fullPdfUrl} target="_blank" rel="noreferrer">{c.fullPdfName || "View Full PDF"}</a></div>}
                    </Col>
                  </Row>

                  <div className="mt-2">
                    <Button variant="outline-danger" size="sm" onClick={() => removeChapter(si, ci)} disabled={s.chapters.length === 1}>
                      Remove Chapter
                    </Button>
                  </div>
                </div>
              ))}

              <Button variant="outline-secondary" size="sm" onClick={() => addChapter(si)}>+ Add Chapter</Button>
            </div>
          ))}

          <Button variant="outline-primary" onClick={addSubject}>+ Add Subject</Button>

          {error && <div className="mt-3 text-danger small">{error}</div>}
          {msg && <div className="mt-3 text-success small">{msg}</div>}
        </Form>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end gap-2">
        <Button onClick={submit} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
      </Card.Footer>
    </Card>
  );
}
