import { Navigate } from "react-router-dom";

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiration = payload.exp * 1000; // exp viene en segundos
    return Date.now() > expiration;
  } catch (error) {
    return true; // si algo falla, lo tratamos como expirado
  }
}

function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaProtegida;

