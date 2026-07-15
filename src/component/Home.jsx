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
    <div className="container page-section">
      <div className="row justify-content-center">
        <div className="col-xl-7 col-lg-8">
          <div className="page-card p-4 p-md-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="icon-pill">
                <i className="bi bi-person-plus" />
              </span>
              <div>
                <p className="hero-badge mb-2">
                  <i className="bi bi-collection" />
                  Nuevo contacto
                </p>
                <h4 className="page-title fw-bold mb-1">Crear contacto</h4>
                <p className="page-subtitle mb-0">Añade información con una tarjeta más suave y pastel.</p>
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nombre</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-person" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Teléfono</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-telephone" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text bg-white border-0">
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-pastel-primary mt-4"
                disabled={loading}
              >
                <i className="bi bi-check2-circle me-2" />
                {loading ? "Guardando..." : "Crear Contacto"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearContacto;
