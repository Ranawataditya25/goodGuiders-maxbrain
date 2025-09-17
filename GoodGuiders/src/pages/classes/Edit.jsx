import { useNavigate, useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import ClassForm from "../../componets/classes/ClassForm";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/classes");
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Edit Class" />
      <Container fluid className="pb-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/classes" className="btn btn-outline-secondary">
            All Classes
          </Link>
        </div>
        <ClassForm mode="edit" classId={id} onSuccess={handleSuccess} />
      </Container>
    </div>
  );
}
