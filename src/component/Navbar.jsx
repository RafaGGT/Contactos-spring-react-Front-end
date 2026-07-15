import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="pastel-navbar py-3">
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center gap-2 fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          <span className="icon-pill">
            <i className="bi bi-stars" />
          </span>
          Agenda
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="nav-actions align-items-lg-center">
            {!token ? (
              <>
                <Button
                  variant="outline-light"
                  className="btn-pastel-soft"
                  onClick={() => navigate("/login")}
                >
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Login
                </Button>

                <Button
                  className="btn-pastel-primary"
                  onClick={() => navigate("/registro")}
                >
                  <i className="bi bi-person-plus me-2" />
                  Registro
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="btn-pastel-soft"
                  onClick={() => navigate("/home")}
                >
                  <i className="bi bi-house-heart me-2" />
                  Home
                </Button>

                <Button
                  className="btn-pastel-danger"
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-2" />
                  Cerrar Sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;