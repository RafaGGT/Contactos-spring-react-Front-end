import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Login from "./component/Autenticacion";
import Register from "./component/Register";
import Home from "./component/Home";
import RutaProtegida from "./component/RutaProtegida";
import RutaPublica from "./component/RutaPublica";
import ListaContactos from "./component/ListaContacto";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        <Route
          path="/registro"
          element={
            <RutaPublica>
              <Register />
            </RutaPublica>
          }
        />

        <Route
          path="/home"
          element={
            <RutaProtegida>
              <Home />
              <ListaContactos />
            </RutaProtegida>
          }
        />

        <Route
          path="*"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;