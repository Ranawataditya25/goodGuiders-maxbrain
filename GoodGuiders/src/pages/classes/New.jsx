import { useNavigate, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageBreadcrumb from "../../componets/PageBreadcrumb";
import ClassForm from "../../componets/classes/ClassForm";

export default function New() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/classes");
  };

  return (
    <div className="themebody-wrap">
      <PageBreadcrumb pagename="Create Class" />
      <Container fluid className="pb-4">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/classes" className="btn btn-outline-secondary">
            All Classes
          </Link>
        </div>
        <ClassForm mode="create" onSuccess={handleSuccess} />
      </Container>
    </div>
  );
}
