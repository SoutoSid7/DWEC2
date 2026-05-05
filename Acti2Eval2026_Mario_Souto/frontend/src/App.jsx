import { useContext, useEffect, useMemo, useState } from "react";
import { ValidationContext } from "./context/ValidationContext";
import "./App.css";

const API_BASE = "http://localhost:3001";
const initialForm = {
  id_poliza: "",
  vigencia: "",
  matricula: "",
  edad_coche: "",
  edad_tomador: "",
  cilindrada: "",
  cilindros: "",
  transmision: "Manual",
  comb_electrico: "Combustión",
  peso: "",
  siniestro: "0",
};

function App() {
  const [polizas, setPolizas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editMode, setEditMode] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [statsFilter, setStatsFilter] = useState({
    transmision: "",
    comb_electrico: "",
    siniestro: "",
  });
  const [stats, setStats] = useState(null);

  const { regexIdPoliza, regexMatricula } = useContext(ValidationContext);

  const statsQuery = useMemo(() => {
    const params = new URLSearchParams();
    if (statsFilter.transmision) params.append("transmision", statsFilter.transmision);
    if (statsFilter.comb_electrico) params.append("comb_electrico", statsFilter.comb_electrico);
    if (statsFilter.siniestro !== "") params.append("siniestro", statsFilter.siniestro);
    const query = params.toString();
    return query ? `?${query}` : "";
  }, [statsFilter]);

  const fetchPolizas = async () => {
    setLoading(true);
    setMensaje("");
    try {
      const res = await fetch(`${API_BASE}/polizas`);
      const data = await res.json();
      setPolizas(data);
    } catch {
      setMensaje("Error al cargar polizas.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/estadisticas${statsQuery}`);
      const data = await res.json();
      setStats(data);
    } catch {
      setMensaje("Error al cargar estadisticas.");
    }
  };

  useEffect(() => {
    fetchPolizas();
  }, []);

  useEffect(() => {
    fetchStats();
  }, [statsQuery]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const formErrors = [];
    const requiredFields = Object.keys(initialForm);
    requiredFields.forEach((field) => {
      if (formData[field] === "") {
        formErrors.push(`El campo '${field}' es obligatorio.`);
      }
    });

    if (!regexIdPoliza.test(formData.id_poliza)) {
      formErrors.push("id_poliza debe tener formato IDXXXXX.");
    }
    if (!regexMatricula.test(formData.matricula)) {
      formErrors.push("matricula debe ser 4 digitos y 3 letras permitidas.");
    }

    const checks = [
      [Number(formData.vigencia) >= 1 && Number(formData.vigencia) <= 21, "vigencia fuera de rango (1-21)."],
      [Number(formData.edad_coche) >= 0 && Number(formData.edad_coche) <= 10, "edad_coche fuera de rango (0-10)."],
      [
        Number(formData.edad_tomador) >= 18 && Number(formData.edad_tomador) <= 90,
        "edad_tomador fuera de rango (18-90).",
      ],
      [["Automática", "Manual"].includes(formData.transmision), "transmision no valida."],
      [["Combustión", "Eléctrico"].includes(formData.comb_electrico), "comb_electrico no valido."],
      [["0", "1"].includes(String(formData.siniestro)), "siniestro debe ser 0 o 1."],
    ];
    checks.forEach(([ok, msg]) => {
      if (!ok) formErrors.push(msg);
    });
    return formErrors;
  };

  const loadForEdit = async (id) => {
    setMensaje("");
    setErrors([]);
    try {
      const res = await fetch(`${API_BASE}/polizas/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No encontrada");
      setFormData({
        ...data,
        vigencia: String(data.vigencia),
        edad_coche: String(data.edad_coche),
        edad_tomador: String(data.edad_tomador),
        cilindrada: String(data.cilindrada),
        cilindros: String(data.cilindros),
        peso: String(data.peso),
        siniestro: String(data.siniestro),
      });
      setEditMode(true);
      setMensaje(`Editando la poliza ${id}`);
    } catch {
      setMensaje("No se pudo cargar la poliza para editar.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensaje("");
    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors([]);
    const payload = {
      ...formData,
      vigencia: Number(formData.vigencia),
      edad_coche: Number(formData.edad_coche),
      edad_tomador: Number(formData.edad_tomador),
      cilindrada: Number(formData.cilindrada),
      cilindros: Number(formData.cilindros),
      peso: Number(formData.peso),
      siniestro: Number(formData.siniestro),
    };

    const method = editMode ? "PUT" : "POST";
    const url = `${API_BASE}/polizas`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      setErrors(data.errors || [data.error || "Error en la operacion."]);
      return;
    }

    setFormData(initialForm);
    setEditMode(false);
    setMensaje(data.message);
    fetchPolizas();
    fetchStats();
  };

  const handleDelete = async (id) => {
    setMensaje("");
    const res = await fetch(`${API_BASE}/polizas/${id}`, { method: "DELETE" });
    const data = await res.json();
    setMensaje(data.message || data.error);
    fetchPolizas();
    fetchStats();
  };

  return (
    <main className="container">
      <h1>Actividad 2EVAL 2026 - Gestion de Polizas</h1>
      <p className="hint">Frontend React + Backend Express + datos JSON + peticiones asincronas</p>

      {mensaje && <p className="msg">{mensaje}</p>}
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <section className="card">
        <h2>{editMode ? "Editar poliza" : "Alta de poliza"}</h2>
        <form onSubmit={handleSubmit} className="grid">
          <label>
            id_poliza
            <input name="id_poliza" value={formData.id_poliza} onChange={handleInputChange} disabled={editMode} />
          </label>
          <label>
            vigencia (meses)
            <input type="number" name="vigencia" value={formData.vigencia} onChange={handleInputChange} min="1" max="21" />
          </label>
          <label>
            matricula
            <input name="matricula" value={formData.matricula} onChange={handleInputChange} disabled={editMode} />
          </label>
          <label>
            edad_coche
            <input type="number" name="edad_coche" value={formData.edad_coche} onChange={handleInputChange} min="0" max="10" />
          </label>
          <label>
            edad_tomador
            <input
              type="number"
              name="edad_tomador"
              value={formData.edad_tomador}
              onChange={handleInputChange}
              min="18"
              max="90"
            />
          </label>
          <label>
            cilindrada
            <input type="number" name="cilindrada" value={formData.cilindrada} onChange={handleInputChange} />
          </label>
          <label>
            cilindros
            <input type="number" name="cilindros" value={formData.cilindros} onChange={handleInputChange} />
          </label>
          <label>
            transmision
            <select name="transmision" value={formData.transmision} onChange={handleInputChange}>
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </label>
          <label>
            comb_electrico
            <select name="comb_electrico" value={formData.comb_electrico} onChange={handleInputChange}>
              <option value="Combustión">Combustión</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </label>
          <label>
            peso (kg)
            <input type="number" name="peso" value={formData.peso} onChange={handleInputChange} />
          </label>
          <label>
            siniestro
            <select name="siniestro" value={formData.siniestro} onChange={handleInputChange}>
              <option value="0">No</option>
              <option value="1">Si</option>
            </select>
          </label>
          <div className="actions">
            <button type="submit">{editMode ? "Guardar cambios" : "Crear poliza"}</button>
            <button
              type="button"
              onClick={() => {
                setFormData(initialForm);
                setEditMode(false);
                setErrors([]);
              }}
            >
              Limpiar
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <h2>Borrar poliza por id</h2>
        <div className="inline">
          <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="ID00001" />
          <button type="button" onClick={() => deleteId && handleDelete(deleteId)}>
            Eliminar
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Listado de polizas</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>id_poliza</th>
                <th>vigencia</th>
                <th>matricula</th>
                <th>edad_coche</th>
                <th>edad_tomador</th>
                <th>cilindrada</th>
                <th>cilindros</th>
                <th>transmision</th>
                <th>comb_electrico</th>
                <th>peso</th>
                <th>siniestro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {polizas.map((p) => (
                <tr key={p.id_poliza}>
                  <td>{p.id_poliza}</td>
                  <td>{p.vigencia}</td>
                  <td>{p.matricula}</td>
                  <td>{p.edad_coche}</td>
                  <td>{p.edad_tomador}</td>
                  <td>{p.cilindrada}</td>
                  <td>{p.cilindros}</td>
                  <td>{p.transmision}</td>
                  <td>{p.comb_electrico}</td>
                  <td>{p.peso}</td>
                  <td>{Number(p.siniestro) === 1 ? "Si" : "No"}</td>
                  <td>
                    <button type="button" onClick={() => loadForEdit(p.id_poliza)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => handleDelete(p.id_poliza)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="card">
        <h2>Estadisticas (calculadas en backend)</h2>
        <div className="grid stats-filter">
          <label>
            transmision
            <select
              value={statsFilter.transmision}
              onChange={(e) => setStatsFilter((s) => ({ ...s, transmision: e.target.value }))}
            >
              <option value="">Todas</option>
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </label>
          <label>
            comb_electrico
            <select
              value={statsFilter.comb_electrico}
              onChange={(e) => setStatsFilter((s) => ({ ...s, comb_electrico: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="Combustión">Combustión</option>
              <option value="Eléctrico">Eléctrico</option>
            </select>
          </label>
          <label>
            siniestro
            <select value={statsFilter.siniestro} onChange={(e) => setStatsFilter((s) => ({ ...s, siniestro: e.target.value }))}>
              <option value="">Todos</option>
              <option value="0">No</option>
              <option value="1">Si</option>
            </select>
          </label>
        </div>
        {stats && (
          <ul>
            <li>Total de polizas: {Number(stats.total_polizas ?? 0)}</li>
            <li>Porcentaje con siniestro: {Number(stats.porcentaje_con_siniestro ?? 0).toFixed(2)}%</li>
            <li>Porcentaje sin siniestro: {Number(stats.porcentaje_sin_siniestro ?? 0).toFixed(2)}%</li>
            <li>Media de edad del coche: {Number(stats.media_edad_coche ?? 0).toFixed(2)}</li>
            <li>Media de edad del tomador: {Number(stats.media_edad_tomador ?? 0).toFixed(2)}</li>
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
