import { useEffect, useState, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import PurchaseModal from "./PurchaseModal";

export default function MentorMaterialsInline({ mentorEmail, mentorName }) {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
  const role = loggedInUser.role;
  const userEmail = loggedInUser.email;

  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalNote, setModalNote] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchMaterials = useCallback(async () => {
    if (!mentorEmail) return;
    setLoading(true);
    const res = await fetch(
      `http://127.0.0.1:5000/api/materials/mentor/${mentorEmail}`
    );
    const data = await res.json();
    setMaterials(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [mentorEmail]);

  useEffect(() => {
    fetchMaterials();
    setVisibleCount(4);
  }, [fetchMaterials, mentorEmail]);

  const handleOpen = async (m) => {
    if (role === "admin" || role === "mentor") {
      window.open(`http://127.0.0.1:5000${m.fileUrl}`, "_blank");
      return;
    }

    if (m.isPaid) {
      setModalNote({ id: m._id, title: m.title, price: m.price });
      setModalShow(true);
      return;
    }

    await fetch(`http://127.0.0.1:5000/api/materials/${m._id}/view`, {
      method: "POST",
      headers: { "x-user-email": userEmail },
    });

    window.open(`http://127.0.0.1:5000${m.fileUrl}`, "_blank");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this material?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/materials/${id}`, {
        method: "DELETE",
        headers: {
          "x-user-email": userEmail, // needed by your auth middleware
        },
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Delete failed");
        return;
      }

      // remove from UI instantly
      setMaterials((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert("Server error", err);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Mentor Materials</h5>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : materials.length === 0 ? (
          <div className="text-muted text-center py-4">
            No resources uploaded
          </div>
        ) : (
          <>
            {/* GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {materials.slice(0, visibleCount).map((m) => (
                <div
                  key={m._id}
                  style={{
                    background: "#f6f7ff",
                    borderRadius: 18,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
                    position: "relative",
                  }}
                >
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(m._id)}
                      title="Delete"
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        border: "none",
                        background: "#fee2e2",
                        color: "#b91c1c",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ×
                    </button>
                  )}
                  {/* TOP */}
                  <div>
                    <h6 style={{ fontWeight: 700, marginBottom: 6 }}>
                      {m.title}
                    </h6>

                    <div
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        minHeight: 36,
                        lineHeight: "1.4",
                      }}
                    >
                      {m.description || " "}
                    </div>
                  </div>

                  {/* BOTTOM BAR */}
                  <div
                    style={{
                      background: "white",
                      borderRadius: 999,
                      padding: "10px 14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 16,
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>
                      {m.isPaid ? `₹${m.price}` : "Free"}
                    </span>

                    <button
                      onClick={() => handleOpen(m)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: 14,
                      }}
                    >
                      Open
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SHOW MORE BUTTON */}
            {materials.length > visibleCount && (
              <div className="text-center mt-3">
                <button
                  onClick={() => setVisibleCount((v) => v + 4)}
                  style={{
                    border: "none",
                    background: "#eef2ff",
                    padding: "10px 20px",
                    borderRadius: 999,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Show more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <PurchaseModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        note={modalNote}
      />
    </>
  );
}
