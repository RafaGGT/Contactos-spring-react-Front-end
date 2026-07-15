import { useState } from "react";
import { loginUsuario } from "../service/login";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
        setLoading(true);
        const response = await loginUsuario(form);

        // Guardar JWT (buena práctica básica)
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", form.username);

        // Redirigir después del login
        navigate("/home");
        } catch {
        setError("No se pudo iniciar sesión");
        } finally {
        setLoading(false);
        }
    }

    return (
                <div className="app-shell d-flex align-items-center">
                    <div className="container page-section">
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-6 col-md-8">
                                <div className="page-card p-4 p-md-5">
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <span className="icon-pill">
                                            <i className="bi bi-box-arrow-in-right" />
                                        </span>
                                        <div>
                                            <p className="hero-badge mb-2">
                                                <i className="bi bi-sparkles" />
                                                Acceso seguro
                                            </p>
                                            <h3 className="page-title fw-bold mb-1">Iniciar sesión</h3>
                                            <p className="page-subtitle mb-0">Entra para gestionar tus contactos con un diseño suave y claro.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Usuario</label>
                                            <div className="input-group input-group-lg">
                                                <span className="input-group-text bg-white border-0">
                                                    <i className="bi bi-person" />
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

                                        <div className="mb-4">
                                            <label className="form-label">Contraseña</label>
                                            <div className="input-group input-group-lg">
                                                <span className="input-group-text bg-white border-0">
                                                    <i className="bi bi-lock" />
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

                                        <button
                                            type="submit"
                                            className="btn btn-pastel-primary btn-lg w-100"
                                            disabled={loading}
                                        >
                                            <i className="bi bi-unlock-fill me-2" />
                                            {loading ? "Ingresando..." : "Ingresar"}
                                        </button>

                                        {error && (
                                            <div className="alert alert-danger mt-3 text-center">
                                                {error}
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