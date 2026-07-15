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
  <div className="auth-shell">
    <div className="row w-100 justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-10">
        <div className="card auth-card m-2 m-md-5">
          <div className="card-body p-4 p-md-5">

            <h3 className="text-center mb-2 fw-bold page-title">
              Registro
            </h3>

            <p className="text-center page-lead">
              Crea tu cuenta para empezar a organizar tus contactos.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-lg soft-input"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Usuario</label>
                <input
                  type="text"
                  className="form-control form-control-lg soft-input"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg soft-input"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg soft-input"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 soft-btn"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>

              {error && (
                <div className="alert alert-danger mt-3 text-center rounded-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="alert alert-success mt-3 text-center rounded-4">
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