import { useEffect, useState } from "react";
import { obtenerContactos } from "../service/contacto";
import {
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../service/usuario";

function ListaContactos() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [passwordEliminar, setPasswordEliminar] = useState("");

  useEffect(() => {
    cargarContactos();
    cargarUsuario();
  }, []);

  async function cargarUsuario() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!username) {
      setError("No hay username guardado");
      setCargando(false);
      return;
    }

    try {
      const data = await obtenerUsuario(username, token);
      setUsuario(data);
    } catch {
      setError("Error al cargar usuario");
    }
  }

  async function cargarContactos() {
    try {
      const data = await obtenerContactos();
      setContactos(data);
    } catch {
      setError("No se pudieron cargar los contactos");
    } finally {
      setCargando(false);
    }
  }

  function handleUsuarioChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function actualizarDatosUsuario() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    try {
      const actualizado = await actualizarUsuario(
        username,
        {
          nombre: usuario.nombre,
          correo: usuario.correo,
        },
        token
      );

      setUsuario(actualizado);
      setEditandoUsuario(false);
      alert("Usuario actualizado correctamente");
    } catch {
      alert("Error al actualizar usuario");
    }
  }

  async function eliminarCuenta() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!window.confirm("¿Seguro que deseas eliminar tu cuenta?")) return;

    try {
      await eliminarUsuario(username, { password: passwordEliminar }, token);

      alert("Cuenta eliminada");

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      window.location.href = "/login";
    } catch {
      alert("Password incorrecta o error");
    }
  }

  return (
    <div className="container page-section pt-0">
      {error && <div className="alert alert-warning mb-4">{error}</div>}

      {usuario && (
        <div className="user-card mb-4 p-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="icon-pill">
              <i className="bi bi-person-heart" />
            </span>
            <div>
              <h5 className="page-title fw-bold mb-1">Usuario</h5>
              <p className="page-subtitle mb-0">Gestiona tus datos de cuenta con un panel más limpio.</p>
            </div>
          </div>

          <p><span className="muted-label">Username</span><br />{usuario.username}</p>

          {editandoUsuario ? (
            <>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleUsuarioChange}
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={usuario.correo}
                  onChange={handleUsuarioChange}
                  className="form-control"
                />
              </div>

              <button
                className="btn btn-pastel-primary btn-sm me-2"
                onClick={actualizarDatosUsuario}
              >
                <i className="bi bi-save2 me-2" />
                Guardar
              </button>

              <button
                className="btn btn-pastel-soft btn-sm"
                onClick={() => setEditandoUsuario(false)}
              >
                <i className="bi bi-x-lg me-2" />
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p><span className="muted-label">Nombre</span><br />{usuario.nombre}</p>
              <p><span className="muted-label">Correo</span><br />{usuario.correo}</p>

              <button
                className="btn btn-pastel-primary btn-sm"
                onClick={() => setEditandoUsuario(true)}
              >
                <i className="bi bi-pencil-square me-2" />
                Modificar datos
              </button>
            </>
          )}

          <hr className="my-4" />

          <h6 className="fw-bold">Eliminar cuenta</h6>

          <input
            type="password"
            placeholder="Confirma tu password"
            value={passwordEliminar}
            onChange={(e) => setPasswordEliminar(e.target.value)}
            className="form-control mb-3"
          />

          <button
            className="btn btn-pastel-danger btn-sm"
            onClick={eliminarCuenta}
          >
            <i className="bi bi-trash3 me-2" />
            Eliminar cuenta
          </button>
        </div>
      )}

      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h4 className="page-title fw-bold mb-1">Mis Contactos</h4>
          <p className="page-subtitle mb-0">Un espacio más suave para revisar y editar tu agenda.</p>
        </div>
        <span className="hero-badge">
          <i className="bi bi-chat-heart" />
          {contactos.length} contactos
        </span>
      </div>

      {cargando && <div className="alert alert-info">Cargando información...</div>}
    </div>
  );
}

export default ListaContactos;