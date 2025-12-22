import { useCallback, useEffect, useState } from "react";
import { Card, Button, Form, ListGroup, Badge } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useLocation } from "react-router-dom";

export default function MentorMaterials() {
  /* ---------------- USER CONTEXT ---------------- */
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role; // mentor | student | admin
  const userEmail = loggedInUser.email;

  const { email: routeMentorEmail } = useParams();
  const location = useLocation();

  const mentorNameFromState = location.state?.mentorName;

  // Decide whose materials to load
  const mentorEmailToLoad =
    role === "mentor" ? loggedInUser.email : routeMentorEmail;

  const mentorDisplayName =
    role === "mentor"
      ? loggedInUser.name || "Your"
      : mentorNameFromState || "Mentor";

  /* ---------------- STATES ---------------- */
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);

  /* ---------------- UI GUARD ---------------- */
  const showNoMentorSelected =
    (role === "student" || role === "admin") && !routeMentorEmail;

  /* ---------------- FETCH MATERIALS ---------------- */
  const fetchMaterials = useCallback(async () => {
    if (!mentorEmailToLoad) {
      setLoadingMaterials(false);
      return;
    }

    try {
      setLoadingMaterials(true);

      const res = await fetch(
        `http://127.0.0.1:5000/api/materials/mentor/${mentorEmailToLoad}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch materials");
      }

      const data = await res.json();
      setMaterials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load materials", err);
      setMaterials([]);
    } finally {
      setLoadingMaterials(false);
    }
  }, [mentorEmailToLoad]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  /* ---------------- UPLOAD (MENTOR ONLY) ---------------- */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      alert("Title and file are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true);

      await fetch("http://127.0.0.1:5000/api/materials/upload", {
        method: "POST",
        headers: {
          "x-user-email": userEmail,
        },
        body: formData,
      });

      setFile(null);
      setTitle("");
      setDescription("");
      fetchMaterials();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE (MENTOR ONLY) ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) return;

    try {
      await fetch(`http://127.0.0.1:5000/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-email": userEmail,
        },
      });

      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ---------------- OPEN MATERIAL ---------------- */
  const handleOpen = async (material) => {
    if (role === "student") {
      await fetch(
        `http://127.0.0.1:5000/api/materials/${material._id}/view`,
        {
          method: "POST",
          headers: {
            "x-user-email": userEmail,
          },
        }
      );
    }

    window.open(`http://127.0.0.1:5000${material.fileUrl}`, "_blank");
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="container mt-100">
      {/* ---------- NO MENTOR SELECTED ---------- */}
      {showNoMentorSelected ? (
        <div className="text-center">
          <h5>No mentor selected</h5>
          <p className="text-muted">
            Please open study materials from a mentor profile.
          </p>
        </div>
      ) : (
        <>
          {/* ---------- HEADER ---------- */}
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-0">📚 Study Materials</h4>
              <small className="text-muted">
                Mentor: {mentorDisplayName}
              </small>
            </Card.Body>
          </Card>

          {/* ---------- UPLOAD (MENTOR ONLY) ---------- */}
          {role === "mentor" && (
            <Card className="mb-4">
              <Card.Header>
                <h5>Upload Study Material</h5>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleUpload}>
                  <Form.Group className="mb-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>File (PDF / PPT / DOC)</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf,.ppt,.pptx,.doc,.docx"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>

                  <Button type="submit" disabled={loading || !file || !title}>
                    {loading ? "Uploading..." : "Upload"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {/* ---------- MATERIALS LIST ---------- */}
          <Card>
            <Card.Header>
              <h5>Available Materials</h5>
            </Card.Header>

            <ListGroup variant="flush">
              {loadingMaterials ? (
                <ListGroup.Item className="text-center py-4">
                  <Spinner animation="border" />
                  <div className="mt-2 text-muted">
                    Loading study materials...
                  </div>
                </ListGroup.Item>
              ) : materials.length === 0 ? (
                <ListGroup.Item className="text-center text-muted">
                  No study materials uploaded yet.
                </ListGroup.Item>
              ) : (
                materials.map((m) => (
                  <ListGroup.Item
                    key={m._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{m.title}</strong>
                      {m.description && (
                        <div className="text-muted small">
                          {m.description}
                        </div>
                      )}

                      {role === "mentor" && (
                        <div className="mt-1">
                          <Badge bg="secondary">Views: {m.views}</Badge>
                        </div>
                      )}
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => handleOpen(m)}
                      >
                        Open
                      </Button>

                      {role === "mentor" &&
                        m.mentorEmail === userEmail && (
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(m._id)}
                          >
                            Delete
                          </Button>
                        )}
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </>
      )}
    </div>
  );
}