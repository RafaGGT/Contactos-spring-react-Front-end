import { useState } from "react";
import { crearContacto } from "../service/contacto"; // ajusta la ruta

function CrearContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await crearContacto(formData);

      // Opcional: limpiar formulario
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
      });

    
    } catch {
      setError("No se pudo crear el contacto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card section-card">
        <div className="card-header-hero">
          <h5 className="page-title mb-1">Nuevo contacto</h5>
          <p className="page-lead mb-0">Registra personas, teléfonos y correo en un solo lugar.</p>
        </div>
        <div className="card-body p-4 p-md-5 pt-3">

          {error && (
            <div className="alert alert-danger rounded-4" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control soft-input"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control soft-input"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control soft-input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary soft-btn"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Crear Contacto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearContacto;
