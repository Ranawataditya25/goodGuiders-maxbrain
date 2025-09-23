import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function PurchaseModal({ show, onHide, note }) {
  const navigate = useNavigate();

  const handlePurchase = () => {
    // Redirect to temporary purchase page
    navigate("/purchase-temp"); // create an empty route/component for now
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
