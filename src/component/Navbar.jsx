import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Agenda
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {!token ? (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="primary"
                  onClick={() => navigate("/registro")}
                >
                  Registro
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/home")}
                >
                  Home
                </Button>

                <Button
                  variant="danger"
                  onClick={cerrarSesion}
                >
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