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
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="auth-shell">
        <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="card auth-card">
            <div className="card-body p-4 p-md-5">

                <h3 className="text-center fw-bold mb-2 page-title">
                Iniciar sesión
                </h3>

                <p className="text-center page-lead">
                Accede a tu agenda para gestionar contactos y redes.
                </p>

                <form onSubmit={handleSubmit}>

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
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>

                {error && (
                    <div className="alert alert-danger mt-3 text-center rounded-4">
                    {error}
                    </div>
                )}

                </form>

            </div>
            </div>
        </div>
        </div>
    );
    }