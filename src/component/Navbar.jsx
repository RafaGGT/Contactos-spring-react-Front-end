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
    <Navbar className="app-navbar py-3" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          className="brand-badge"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Agenda Contactos
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!token ? (
              <>
                <Button variant="outline-light" className="me-2 soft-btn" onClick={() => navigate("/login")}>
                  Login
                </Button>

                <Button variant="primary" className="soft-btn" onClick={() => navigate("/registro")}>
                  Registro
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="me-2 soft-btn" onClick={() => navigate("/home")}>
                  Home
                </Button>

                <Button variant="danger" className="soft-btn" onClick={cerrarSesion}>
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