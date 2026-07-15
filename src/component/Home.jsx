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
      const location = await crearContacto(formData);

      // Opcional: limpiar formulario
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
      });

    
    } catch (err) {
      setError("No se pudo crear el contacto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title mb-3">Nuevo Contacto</h5>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
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
                className="form-control"
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
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
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
