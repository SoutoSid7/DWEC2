import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function StatsPanel() {
  const [filters, setFilters] = useState({
    transmision: '',
    comb_electrico: '',
    siniestro: ''
  });

  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const loadStats = async () => {
    try {
      setError('');
      setStats(await api.getEstadisticas(filters));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const change = ({ target }) => {
    setFilters(prev => ({
      ...prev,
      [target.name]: target.value
    }));
  };

  return (
    <section className="estadisticas">

      <h2>Estadísticas</h2>

      <div className="filters">
        <label>
          Transmisión
          <select name="transmision" value={filters.transmision} onChange={change}>
            <option value="">Todas</option>
            <option>Automática</option>
            <option>Manual</option>
          </select>
        </label>

        <label>
          Tipo
          <select name="comb_electrico" value={filters.comb_electrico} onChange={change}>
            <option value="">Todos</option>
            <option>Combustión</option>
            <option>Eléctrico</option>
          </select>
        </label>

        <label>
          Siniestro
          <select name="siniestro" value={filters.siniestro} onChange={change}>
            <option value="">Todos</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        </label>

        <button onClick={loadStats}>
          Calcular
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {stats && (
        <div>
          <p>
            <strong>Total pólizas:</strong> {stats.total}
          </p>
          <p>
            <strong>Con siniestro:</strong> {stats.porcentajeConSiniestro}%
          </p>
          <p>
            <strong>Sin siniestro:</strong> {stats.porcentajeSinSiniestro}%
          </p>
          <p>
            <strong>Media edad coche:</strong> {stats.mediaEdadCoche}
          </p>
          <p>
            <strong>Media edad tomador:</strong> {stats.mediaEdadTomador}
          </p>
        </div>
      )}
    </section>
  );
}