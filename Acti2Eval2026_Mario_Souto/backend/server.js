import express from 'express';
import cors from 'cors';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data', 'seguros.json');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const REGEX_ID = /^ID\d{5}$/;
const REGEX_MATRICULA = /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;
const TRANSMISIONES = ['Automática', 'Manual'];
const COMBUSTIBLES = ['Combustión', 'Eléctrico'];

async function leerPolizas() {
  const contenido = await readFile(DATA_FILE, 'utf-8');
  return JSON.parse(contenido);
}

async function guardarPolizas(polizas) {
  await writeFile(DATA_FILE, JSON.stringify(polizas, null, 2), 'utf-8');
}

function normalizarPoliza(body) {
  return {
    id_poliza: String(body.id_poliza || '').trim().toUpperCase(),
    vigencia: Number(body.vigencia),
    matricula: String(body.matricula || '').trim().toUpperCase(),
    edad_coche: Number(body.edad_coche),
    edad_tomador: Number(body.edad_tomador),
    cilindrada: Number(body.cilindrada),
    cilindros: Number(body.cilindros),
    transmision: body.transmision,
    comb_electrico: body.comb_electrico,
    peso: Number(body.peso),
    siniestro: Number(body.siniestro)
  };
}

function validarPoliza(poliza, { parcial = false } = {}) {
  const errores = [];
  const campos = ['id_poliza', 'vigencia', 'matricula', 'edad_coche', 'edad_tomador', 'cilindrada', 'cilindros', 'transmision', 'comb_electrico', 'peso', 'siniestro'];
  for (const campo of campos) {
    if (!parcial && (poliza[campo] === undefined || poliza[campo] === null || poliza[campo] === '')) {
      errores.push(`El campo ${campo} es obligatorio.`);
    }
  }
  if (!REGEX_ID.test(poliza.id_poliza)) errores.push('El id_poliza debe seguir el formato IDXXXXX, por ejemplo ID00001.');
  if (!Number.isInteger(poliza.vigencia) || poliza.vigencia < 1 || poliza.vigencia > 21) errores.push('La vigencia debe estar entre 1 y 21 meses.');
  if (!REGEX_MATRICULA.test(poliza.matricula)) errores.push('La matrícula debe tener 4 números y 3 letras españolas permitidas, por ejemplo 1234BCD.');
  if (!Number.isInteger(poliza.edad_coche) || poliza.edad_coche < 0 || poliza.edad_coche > 10) errores.push('La edad del coche debe estar entre 0 y 10.');
  if (!Number.isInteger(poliza.edad_tomador) || poliza.edad_tomador < 18 || poliza.edad_tomador > 90) errores.push('La edad del tomador debe estar entre 18 y 90 años.');
  if (!Number.isFinite(poliza.cilindrada) || poliza.cilindrada <= 0) errores.push('La cilindrada debe ser un número positivo.');
  if (!Number.isInteger(poliza.cilindros) || poliza.cilindros <= 0) errores.push('Los cilindros deben ser un entero positivo.');
  if (!TRANSMISIONES.includes(poliza.transmision)) errores.push('La transmisión solo puede ser Automática o Manual.');
  if (!COMBUSTIBLES.includes(poliza.comb_electrico)) errores.push('comb_electrico solo puede ser Combustión o Eléctrico.');
  if (!Number.isFinite(poliza.peso) || poliza.peso <= 0) errores.push('El peso debe ser un número positivo.');
  if (![0, 1].includes(poliza.siniestro)) errores.push('El siniestro solo puede ser 0 o 1.');
  return errores;
}

app.get('/polizas', async (_req, res) => {
  res.json(await leerPolizas());
});

app.get('/polizas/:id_poliza', async (req, res) => {
  const polizas = await leerPolizas();
  const poliza = polizas.find(p => p.id_poliza === req.params.id_poliza.toUpperCase());
  if (!poliza) return res.status(404).json({ error: 'Póliza no encontrada.' });
  res.json(poliza);
});

app.post('/polizas', async (req, res) => {
  const poliza = normalizarPoliza(req.body);
  const errores = validarPoliza(poliza);
  if (errores.length) return res.status(400).json({ errores });
  const polizas = await leerPolizas();
  if (polizas.some(p => p.id_poliza === poliza.id_poliza)) return res.status(409).json({ error: 'Ya existe una póliza con ese id.' });
  if (polizas.some(p => p.matricula === poliza.matricula)) return res.status(409).json({ error: 'Ya existe una póliza con esa matrícula.' });
  polizas.push(poliza);
  await guardarPolizas(polizas);
  res.status(201).json(poliza);
});

app.put('/polizas', async (req, res) => {
  const poliza = normalizarPoliza(req.body);
  const errores = validarPoliza(poliza);
  if (errores.length) return res.status(400).json({ errores });
  const polizas = await leerPolizas();
  const index = polizas.findIndex(p => p.id_poliza === poliza.id_poliza);
  if (index === -1) return res.status(404).json({ error: 'Póliza no encontrada.' });
  if (polizas[index].matricula !== poliza.matricula) return res.status(400).json({ error: 'No se permite modificar la matrícula.' });
  polizas[index] = poliza;
  await guardarPolizas(polizas);
  res.json(poliza);
});

app.delete('/polizas/:id_poliza', async (req, res) => {
  const polizas = await leerPolizas();
  const filtradas = polizas.filter(p => p.id_poliza !== req.params.id_poliza.toUpperCase());
  if (filtradas.length === polizas.length) return res.status(404).json({ error: 'Póliza no encontrada.' });
  await guardarPolizas(filtradas);
  res.json({ mensaje: 'Póliza eliminada correctamente.' });
});

app.get('/estadisticas', async (req, res) => {
  const { transmision, comb_electrico, siniestro } = req.query;
  const polizas = await leerPolizas();
  const filtradas = polizas.filter(p => {
    const okTransmision = !transmision || p.transmision === transmision;
    const okCombustible = !comb_electrico || p.comb_electrico === comb_electrico;
    const okSiniestro = siniestro === undefined || siniestro === '' || p.siniestro === Number(siniestro);
    return okTransmision && okCombustible && okSiniestro;
  });
  const total = filtradas.length;
  const conSiniestro = filtradas.filter(p => p.siniestro === 1).length;
  const sinSiniestro = total - conSiniestro;
  const media = campo => total ? Number((filtradas.reduce((acc, p) => acc + Number(p[campo]), 0) / total).toFixed(2)) : 0;
  res.json({
    total,
    conSiniestro,
    sinSiniestro,
    porcentajeConSiniestro: total ? Number(((conSiniestro / total) * 100).toFixed(2)) : 0,
    porcentajeSinSiniestro: total ? Number(((sinSiniestro / total) * 100).toFixed(2)) : 0,
    mediaEdadCoche: media('edad_coche'),
    mediaEdadTomador: media('edad_tomador')
  });
});

app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }));

app.listen(PORT, () => console.log(`Servidor API iniciado en http://localhost:${PORT}`));
