import { Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import ClassForm from "../../componets/classes/ClassForm";

export default function New() {
  const navigate = useNavigate();
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Create Class" />
      <Container fluid className="pb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Create Class</h4>
          <Link to="/classes" className="btn btn-outline-secondary">All Classes</Link>
        </div>
        <ClassForm mode="create" onSuccess={() => navigate("/classes")} />
      </Container>
    </div>
  );
}
