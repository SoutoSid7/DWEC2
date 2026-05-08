import { useEffect, useState } from 'react';
import { useValidation } from '../context/ValidationContext.jsx';
import { api } from '../services/api.js';

const emptyForm = {
  id_poliza: '',
  vigencia: '',
  matricula: '',
  edad_coche: '',
  edad_tomador: '',
  cilindrada: '',
  cilindros: '',
  transmision: 'Manual',
  comb_electrico: 'Combustión',
  peso: '',
  siniestro: 0
};

const generarSiguienteId = (polizas) => {
  if (!polizas.length) return 'ID00001';

  const ultimoNumero = Math.max(
    ...polizas.map(p => Number(p.id_poliza.replace('ID', '')))
  );

  return `ID${String(ultimoNumero + 1).padStart(5, '0')}`;
};

export default function PolizaForm({ selectedPoliza, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState([]);
  const { regexIdPoliza, regexMatricula, transmisiones, combustibles } = useValidation();
  const isEditing = Boolean(selectedPoliza);

  useEffect(() => {
    const cargarId = async () => {
      if (selectedPoliza) {
        setForm(selectedPoliza);
      } else {
        const polizas = await api.getPolizas();

        setForm({
          ...emptyForm,
          id_poliza: generarSiguienteId(polizas)
        });
      }
    };

    cargarId();
  }, [selectedPoliza]);

  const setField = ({ target }) =>
    setForm(prev => ({ ...prev, [target.name]: target.value }));

  const validate = () => {
    const e = [];

    Object.entries(form).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        e.push(`${key} es obligatorio.`);
      }
    });

    if (!regexIdPoliza.test(form.id_poliza)) e.push('id_poliza debe ser ID seguido de 5 dígitos.');
    if (Number(form.vigencia) < 1 || Number(form.vigencia) > 21) e.push('La vigencia debe estar entre 1 y 21 meses.');
    if (!regexMatricula.test(String(form.matricula).toUpperCase())) e.push('La matrícula debe tener 4 números y 3 letras permitidas.');
    if (Number(form.edad_coche) < 0 || Number(form.edad_coche) > 10) e.push('La edad del coche debe estar entre 0 y 10.');
    if (Number(form.edad_tomador) < 18 || Number(form.edad_tomador) > 90) e.push('La edad del tomador debe estar entre 18 y 90.');
    if (!transmisiones.includes(form.transmision)) e.push('Transmisión no válida.');
    if (!combustibles.includes(form.comb_electrico)) e.push('Tipo combustible/eléctrico no válido.');
    if (Number(form.cilindrada) <= 0 || Number(form.cilindros) <= 0 || Number(form.peso) <= 0) e.push('Cilindrada, cilindros y peso deben ser mayores que cero.');

    setErrors(e);
    return e.length === 0;
  };

  const submit = async event => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit({
      ...form,
      id_poliza: form.id_poliza.toUpperCase(),
      matricula: form.matricula.toUpperCase(),
      vigencia: Number(form.vigencia),
      edad_coche: Number(form.edad_coche),
      edad_tomador: Number(form.edad_tomador),
      cilindrada: Number(form.cilindrada),
      cilindros: Number(form.cilindros),
      peso: Number(form.peso),
      siniestro: Number(form.siniestro)
    });

    if (!isEditing) {
      const polizas = await api.getPolizas();

      setForm({
        ...emptyForm,
        id_poliza: generarSiguienteId(polizas)
      });
    }
  };

  return (
    <section className="card">
      <h2>{isEditing ? 'Actualizar póliza' : 'Alta manual de póliza'}</h2>

      {errors.length > 0 && (
        <div className="errors">
          {errors.map(error => <p key={error}>{error}</p>)}
        </div>
      )}

      <form onSubmit={submit} className="form-grid">
        <label>
          ID póliza
          <input name="id_poliza" value={form.id_poliza} readOnly />
        </label>

        <label>Vigencia<input type="number" name="vigencia" value={form.vigencia} onChange={setField} min="1" max="21" /></label>
        <label>Matrícula<input name="matricula" value={form.matricula} onChange={setField} disabled={isEditing} placeholder="1234BCD" /></label>
        <label>Edad coche<input type="number" name="edad_coche" value={form.edad_coche} onChange={setField} min="0" max="10" /></label>
        <label>Edad tomador<input type="number" name="edad_tomador" value={form.edad_tomador} onChange={setField} min="18" max="90" /></label>
        <label>Cilindrada<input type="number" name="cilindrada" value={form.cilindrada} onChange={setField} /></label>
        <label>Cilindros<input type="number" name="cilindros" value={form.cilindros} onChange={setField} /></label>

        <label>
          Transmisión
          <select name="transmision" value={form.transmision} onChange={setField}>
            {transmisiones.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>

        <label>
          Tipo
          <select name="comb_electrico" value={form.comb_electrico} onChange={setField}>
            {combustibles.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>

        <label>Peso<input type="number" name="peso" value={form.peso} onChange={setField} /></label>

        <label>
          Siniestro
          <select name="siniestro" value={form.siniestro} onChange={setField}>
            <option value="0">No</option>
            <option value="1">Sí</option>
          </select>
        </label>

        <div className="actions">
          <button type="submit">{isEditing ? 'Guardar cambios' : 'Crear póliza'}</button>
          {isEditing && <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>}
        </div>
      </form>
    </section>
  );
}