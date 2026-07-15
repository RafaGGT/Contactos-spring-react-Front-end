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
  <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light ">
    <div className="row w-100 justify-content-center">
      <div className="col-lg-5 col-md-7 col-sm-10">
        <div className="card shadow-lg border-0 rounded-4 m-5">
          <div className="card-body p-4">

            <h3 className="text-center mb-4 fw-bold">
              Registro
            </h3>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
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
                  className="form-control form-control-lg"
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
                  className="form-control form-control-lg"
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
                  className="form-control form-control-lg"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
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