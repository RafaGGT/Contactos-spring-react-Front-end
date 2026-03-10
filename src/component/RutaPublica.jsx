import { Navigate } from "react-router-dom";

function RutaPublica({ children }) {
  const token = localStorage.getItem("token");

  // Si ya está logueado, no puede entrar a login o registro
  return token ? <Navigate to="/home" replace /> : children;
}

export default RutaPublica;
