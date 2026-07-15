import { useState } from "react";
import { registrarUsuario } from "../service/registro";

export default function Register() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        correo: "",
        nombre: "",
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await registrarUsuario(form);
      setSuccess("Usuario registrado correctamente");
      setForm({
        username: "",
        password: "",
        correo: "",
        nombre: "",
      });
    } catch (err) {
      // Spring suele devolver errores de validación aquí
      setError(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  }
return (
  <div className="app-shell d-flex align-items-center">
    <div className="container page-section">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-7 col-md-9">
          <div className="page-card p-4 p-md-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="icon-pill">
                <i className="bi bi-person-plus" />
              </span>
              <div>
                <p className="hero-badge mb-2">
                  <i className="bi bi-stars" />
                  Bienvenida suave
                </p>
                <h3 className="page-title fw-bold mb-1">Registro</h3>
                <p className="page-subtitle mb-0">Crea tu cuenta con una interfaz más amable y limpia.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-person-vcard" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Usuario</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-at" />
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Correo electrónico</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      name="correo"
                      value={form.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-shield-lock" />
                    </span>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-pastel-primary btn-lg w-100 mt-4"
                disabled={loading}
              >
                <i className="bi bi-heart-fill me-2" />
                {loading ? "Registrando..." : "Registrarse"}
              </button>

              {error && (
                <div className="alert alert-danger mt-3 text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success mt-3 text-center">
                  {success}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}