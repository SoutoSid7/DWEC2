import { useEffect, useState } from 'react';
import { ValidationProvider } from './context/ValidationContext.jsx';
import { api } from './services/api.js';
import PolizaForm from './components/PolizaForm.jsx';
import PolizaTable from './components/PolizaTable.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import './style.css';

export default function App() {
  const [polizas, setPolizas] = useState([]);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadPolizas = async () => {
    try { setPolizas(await api.getPolizas()); setError(''); }
    catch (err) { setError(err.message); }
  };

  useEffect(() => { loadPolizas(); }, []);

  const savePoliza = async poliza => {
    try {
      setError('');
      if (selected) await api.updatePoliza(poliza); else await api.addPoliza(poliza);
      setSelected(null);
      setMessage(selected ? 'Póliza actualizada correctamente.' : 'Póliza creada correctamente.');
      await loadPolizas();
    } catch (err) { setError(err.message); }
  };

  const deletePoliza = async id => {
    if (!window.confirm(`¿Eliminar la póliza ${id}?`)) return;
    try { await api.deletePoliza(id); setMessage('Póliza eliminada correctamente.'); await loadPolizas(); }
    catch (err) { setError(err.message); }
  };

  return <ValidationProvider><main className="container">
    <header className="hero"><h1>Gestión de póliza de seguros</h1></header>
    {message && <p className="message">{message}</p>}
    {error && <pre className="errors">{error}</pre>}
    <PolizaForm selectedPoliza={selected} onSubmit={savePoliza} onCancel={() => setSelected(null)} />
    <StatsPanel />
    <PolizaTable polizas={polizas} onEdit={setSelected} onDelete={deletePoliza} />
  </main></ValidationProvider>;
}
