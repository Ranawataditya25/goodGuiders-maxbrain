import { Container } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import ClassForm from "../../componets/classes/ClassForm";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Edit Class" />
      <Container fluid className="pb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0">Edit Class</h4>
          <Link to="/classes" className="btn btn-outline-secondary">All Classes</Link>
        </div>
        <ClassForm mode="edit" classId={id} onSuccess={() => navigate("/classes")} />
      </Container>
    </div>
  );
}
