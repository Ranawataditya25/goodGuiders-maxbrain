import { Link } from "react-router-dom";

const TestEnd = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>
        ✅ Thank you for completing the test!
      </h1>
      <p style={{ fontSize: "28px", marginBottom: "30px", color: "#555" }}>
        The result will be declared soon.
      </p>
      <Link to="/all-doctors">
        <button
          style={{
            padding: "12px 25px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Go to Mentor Page
        </button>
      </Link>
    </div>
  );
};

export default TestEnd;
