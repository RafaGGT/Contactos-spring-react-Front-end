import { useEffect, useState, Fragment } from "react";
import {
  obtenerContactos,
  modificarContacto,
  eliminarContacto,
} from "../service/contacto";

import { añadirRed, modificarRed, eliminarRed } from "../service/red";

import {
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../service/usuario";

function ListaContactos() {

  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [usuario, setUsuario] = useState(null);
  const [errorUsuario, setErrorUsuario] = useState("");

  const [editandoUsuario, setEditandoUsuario] = useState(false);
  const [passwordEliminar, setPasswordEliminar] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [contactoEditado, setContactoEditado] = useState({});

  const [expandidoId, setExpandidoId] = useState(null);

  const [nuevaRed, setNuevaRed] = useState({
    tipo: "INSTAGRAM",
    enlace: ""
  });

  const [editandoRedId, setEditandoRedId] = useState(null);

  const [redEditada, setRedEditada] = useState({
    id: null,
    idContacto: null,
    enlace: ""
  });

  useEffect(() => {
    cargarContactos();
    cargarUsuario();
  }, []);

  async function cargarUsuario() {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!username) {
      setErrorUsuario("No hay username guardado");
      return;
    }

    try {

      const data = await obtenerUsuario(username, token);
      setUsuario(data);

    } catch {

      setErrorUsuario("Error al cargar usuario");

    }

  }

  async function cargarContactos() {

    try {

      const data = await obtenerContactos();
      setContactos(data);

    } catch {

      setError("No se pudieron cargar los contactos");

    } finally {

      setLoading(false);

    }

  }

  function handleUsuarioChange(e) {

    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
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
          correo: usuario.correo
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

      await eliminarUsuario(
        username,
        { password: passwordEliminar },
        token
      );

      alert("Cuenta eliminada");

      localStorage.removeItem("token");
      localStorage.removeItem("username");

      window.location.href = "/login";

    } catch {

      alert("Password incorrecta o error");

    }

  }

  function iniciarEdicion(contacto) {

    setEditandoId(contacto.id);
    setContactoEditado(contacto);

  }

  function handleChange(e) {

    setContactoEditado({
      ...contactoEditado,
      [e.target.name]: e.target.value
    });

  }

  async function guardarCambios() {

    try {

      await modificarContacto(contactoEditado);

      alert("Contacto modificado correctamente");

      setEditandoId(null);
      cargarContactos();

    } catch {

      alert("Error al modificar");

    }

  }

  async function handleEliminar(id) {

    if (!window.confirm("¿Seguro que deseas eliminar este contacto?")) return;

    try {

      await eliminarContacto(id);

      alert("Contacto eliminado correctamente");

      cargarContactos();

    } catch {

      alert("Error al eliminar");

    }

  }

  function toggleExpandido(id) {

    setExpandidoId(expandidoId === id ? null : id);

  }

  function handleRedChange(e) {

    setNuevaRed({
      ...nuevaRed,
      [e.target.name]: e.target.value
    });

  }

  async function guardarRed(idContacto) {

    if (!nuevaRed.enlace.trim()) {

      alert("Debes ingresar una URL");
      return;

    }

    try {

      await añadirRed({
        idContacto: idContacto,
        tipo: nuevaRed.tipo,
        enlace: nuevaRed.enlace
      });

      alert("Red añadida correctamente");

      setNuevaRed({ tipo: "INSTAGRAM", enlace: "" });

      cargarContactos();

    } catch {

      alert("Error al añadir red");

    }

  }

  function iniciarEdicionRed(red, idContacto) {

    setEditandoRedId(red.id);

    setRedEditada({
      id: red.id,
      idContacto: idContacto,
      enlace: red.enlace
    });

  }

  function handleRedEditChange(e) {

    setRedEditada({
      ...redEditada,
      enlace: e.target.value
    });

  }

  async function guardarRedEditada() {

    try {

      await modificarRed(redEditada);

      alert("Red modificada correctamente");

      setEditandoRedId(null);

      cargarContactos();

    } catch {

      alert("Error al modificar red");

    }

  }

  async function handleEliminarRed(idRed, idContacto) {

    if (!window.confirm("¿Eliminar esta red?")) return;

    try {

      await eliminarRed({
        id: idRed,
        idContacto: idContacto
      });

      alert("Red eliminada correctamente");

      cargarContactos();

    } catch {

      alert("Error al eliminar red");

    }

  }

  function obtenerIcono(tipo) {

    switch (tipo) {
      case "FACEBOOK": return "📘";
      case "INSTAGRAM": return "📷";
      case "TWITTER": return "🐦";
      case "LINKEDIN": return "💼";
      case "GITHUB": return "💻";
      case "YOUTUBE": return "▶";
      default: return "🌐";
    }

  }

  return (

    <div className="page-container">

      {usuario && (

        <div className="card section-card mb-4 p-4 p-md-5">

          <h5 className="page-title mb-1">Usuario</h5>
          <p className="page-lead mb-3">Actualiza tu perfil o elimina tu cuenta desde aquí.</p>

          <p className="contact-meta"><strong>Username:</strong> {usuario.username}</p>

          {errorUsuario && (
            <div className="alert alert-warning rounded-4 mt-3">
              {errorUsuario}
            </div>
          )}

          {editandoUsuario ? (

            <>
              <div className="mb-2">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={usuario.nombre}
                  onChange={handleUsuarioChange}
                  className="form-control soft-input"
                />
              </div>

              <div className="mb-2">
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={usuario.correo}
                  onChange={handleUsuarioChange}
                  className="form-control soft-input"
                />
              </div>

              <button
                className="btn btn-success btn-sm me-2 soft-btn"
                onClick={actualizarDatosUsuario}
              >
                Guardar
              </button>

              <button
                className="btn btn-secondary btn-sm soft-btn"
                onClick={() => setEditandoUsuario(false)}
              >
                Cancelar
              </button>

            </>

          ) : (

            <>
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Correo:</strong> {usuario.correo}</p>

              <button
                className="btn btn-primary btn-sm soft-btn"
                onClick={() => setEditandoUsuario(true)}
              >
                Modificar datos
              </button>
            </>

          )}

          <hr />

          <h6>Eliminar cuenta</h6>

          <input
            type="password"
            placeholder="Confirma tu password"
            value={passwordEliminar}
            onChange={(e) => setPasswordEliminar(e.target.value)}
            className="form-control mb-2 soft-input"
          />

          <button
            className="btn btn-danger btn-sm"
            onClick={eliminarCuenta}
          >
            Eliminar cuenta
          </button>

        </div>

      )}

      <h4 className="page-title mb-2">Mis contactos</h4>
      <p className="page-lead">Administra contactos, sus redes sociales y sus datos de forma rápida.</p>

      {loading && <p className="contact-meta">Cargando contactos...</p>}
      {error && <div className="alert alert-danger rounded-4">{error}</div>}
      {!loading && !error && contactos.length === 0 && (
        <div className="empty-state">No tienes contactos todavía.</div>
      )}

      {contactos.map((contacto) => (
        <div className="card contact-card" key={contacto.id}>
          {editandoId === contacto.id ? (
            <>
              <input
                type="text"
                className="form-control mb-2 soft-input"
                name="nombre"
                value={contactoEditado.nombre || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="form-control mb-2 soft-input"
                name="telefono"
                value={contactoEditado.telefono || ""}
                onChange={handleChange}
              />
              <input
                type="email"
                className="form-control mb-2 soft-input"
                name="email"
                value={contactoEditado.email || ""}
                onChange={handleChange}
              />
              <button
                className="btn btn-success btn-sm me-2 soft-btn"
                onClick={guardarCambios}
              >
                Guardar
              </button>
              <button
                className="btn btn-secondary btn-sm soft-btn"
                onClick={() => setEditandoId(null)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p className="mb-1"><strong>Nombre:</strong> {contacto.nombre}</p>
              <p className="mb-1"><strong>Teléfono:</strong> {contacto.telefono}</p>
              <p className="mb-1"><strong>Email:</strong> {contacto.email}</p>

              <div className="contact-actions">
                <button
                  className="btn btn-primary btn-sm soft-btn"
                  onClick={() => iniciarEdicion(contacto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm soft-btn"
                  onClick={() => handleEliminar(contacto.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm soft-btn"
                  onClick={() => toggleExpandido(contacto.id)}
                >
                  {expandidoId === contacto.id ? "Ocultar redes" : "Ver redes"}
                </button>
              </div>

              {expandidoId === contacto.id && (
                <div className="mt-3">
                  <h6>Redes sociales</h6>

                  {(contacto.redes || []).map((red) => (
                    <div key={red.id} className="d-flex align-items-center mb-2 flex-wrap gap-2">
                      <span className="me-2">{obtenerIcono(red.tipo)}</span>

                      {editandoRedId === red.id ? (
                        <>
                          <input
                            type="text"
                            className="form-control form-control-sm me-2 soft-input"
                            value={redEditada.enlace}
                            onChange={handleRedEditChange}
                          />
                          <button
                            className="btn btn-success btn-sm me-1 soft-btn"
                            onClick={guardarRedEditada}
                          >
                            Guardar
                          </button>
                          <button
                            className="btn btn-secondary btn-sm soft-btn"
                            onClick={() => setEditandoRedId(null)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <a href={red.enlace} target="_blank" rel="noreferrer" className="me-2">
                            {red.enlace}
                          </a>
                          <button
                            className="btn btn-outline-primary btn-sm me-1 soft-btn"
                            onClick={() => iniciarEdicionRed(red, contacto.id)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm soft-btn"
                            onClick={() => handleEliminarRed(red.id, contacto.id)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  ))}

                  <div className="d-flex align-items-center mt-2">
                    <select
                      className="form-select form-select-sm me-2 soft-input"
                      style={{ width: "auto" }}
                      name="tipo"
                      value={nuevaRed.tipo}
                      onChange={handleRedChange}
                    >
                      <option value="INSTAGRAM">Instagram</option>
                      <option value="FACEBOOK">Facebook</option>
                      <option value="TWITTER">Twitter</option>
                      <option value="LINKEDIN">LinkedIn</option>
                      <option value="GITHUB">GitHub</option>
                      <option value="YOUTUBE">YouTube</option>
                    </select>
                    <input
                      type="text"
                      placeholder="URL"
                      className="form-control form-control-sm me-2 soft-input"
                      name="enlace"
                      value={nuevaRed.enlace}
                      onChange={handleRedChange}
                    />
                    <button
                      className="btn btn-primary btn-sm soft-btn"
                      onClick={() => guardarRed(contacto.id)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}

    </div>

  );

}

export default ListaContactos;
