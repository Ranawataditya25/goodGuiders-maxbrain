import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function PurchaseModal({ show, onHide, note }) {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";
  const navigate = useNavigate();

  const handlePurchase = async () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return alert("Login required");
  
    const payload = {
      userId: user._id,
      pdfs: [{ id: note.id || note.title, title: note.title }], // single for now
    };
  
    const res = await fetch(`${API}/purchase/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    navigate("/purchase-temp"); 
    if (data.ok) {
      alert(`✅ ${data.message} — ₹${data.totalPrice}`);
      onHide();
    } else {
      alert(data.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Purchase required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You need to purchase <strong>{note?.title || "this note"}</strong> to view or download it.
        </p>
        <p className="mb-0">Price: <strong>₹{note?.price ?? "-"}</strong></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handlePurchase}>
          Purchase & Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

PurchaseModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  note: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
  }),
};
