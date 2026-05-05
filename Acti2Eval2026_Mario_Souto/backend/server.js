const express = require("express");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const PORT = 3001;
const DATA_PATH = path.join(__dirname, "data", "seguros.json");

app.use(cors());
app.use(express.json());

const REGEX_ID = /^ID\d{5}$/;
const REGEX_MATRICULA = /^[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/;
const TRANSMISION_VALUES = ["Automática", "Manual"];
const COMB_VALUES = ["Combustión", "Eléctrico"];

const validatePoliza = (poliza, isUpdate = false, currentPoliza = null) => {
  const errors = [];
  const requiredFields = [
    "id_poliza",
    "vigencia",
    "matricula",
    "edad_coche",
    "edad_tomador",
    "cilindrada",
    "cilindros",
    "transmision",
    "comb_electrico",
    "peso",
    "siniestro",
  ];

  for (const field of requiredFields) {
    if (poliza[field] === undefined || poliza[field] === null || poliza[field] === "") {
      errors.push(`El campo '${field}' es obligatorio.`);
    }
  }

  if (!REGEX_ID.test(String(poliza.id_poliza || ""))) {
    errors.push("id_poliza debe tener formato IDXXXXX.");
  }

  if (!REGEX_MATRICULA.test(String(poliza.matricula || ""))) {
    errors.push("matricula debe seguir el formato español 4 digitos + 3 letras permitidas.");
  }

  const vigencia = Number(poliza.vigencia);
  if (!Number.isInteger(vigencia) || vigencia < 1 || vigencia > 21) {
    errors.push("vigencia debe estar entre 1 y 21 meses.");
  }

  const edadCoche = Number(poliza.edad_coche);
  if (!Number.isInteger(edadCoche) || edadCoche < 0 || edadCoche > 10) {
    errors.push("edad_coche debe estar entre 0 y 10.");
  }

  const edadTomador = Number(poliza.edad_tomador);
  if (!Number.isInteger(edadTomador) || edadTomador < 18 || edadTomador > 90) {
    errors.push("edad_tomador debe estar entre 18 y 90.");
  }

  if (!TRANSMISION_VALUES.includes(poliza.transmision)) {
    errors.push("transmision debe ser Automática o Manual.");
  }

  if (!COMB_VALUES.includes(poliza.comb_electrico)) {
    errors.push("comb_electrico debe ser Combustión o Eléctrico.");
  }

  const siniestro = Number(poliza.siniestro);
  if (!(siniestro === 0 || siniestro === 1)) {
    errors.push("siniestro solo puede ser 0 o 1.");
  }

  if (isUpdate && currentPoliza) {
    if (poliza.id_poliza !== currentPoliza.id_poliza) {
      errors.push("No se permite modificar id_poliza.");
    }
    if (poliza.matricula !== currentPoliza.matricula) {
      errors.push("No se permite modificar matricula.");
    }
  }

  return errors;
};

const readPolizas = async () => {
  const content = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(content);
};

const writePolizas = async (polizas) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(polizas, null, 2), "utf8");
};

app.get("/polizas", async (_req, res) => {
  try {
    const polizas = await readPolizas();
    res.json(polizas);
  } catch {
    res.status(500).json({ error: "No se han podido leer las polizas." });
  }
});

app.get("/polizas/:id_poliza", async (req, res) => {
  try {
    const polizas = await readPolizas();
    const poliza = polizas.find((p) => p.id_poliza === req.params.id_poliza);
    if (!poliza) {
      return res.status(404).json({ error: "Poliza no encontrada." });
    }
    return res.json(poliza);
  } catch {
    return res.status(500).json({ error: "No se ha podido leer la poliza." });
  }
});

app.post("/polizas", async (req, res) => {
  try {
    const polizas = await readPolizas();
    const nuevaPoliza = req.body;
    const errors = validatePoliza(nuevaPoliza);

    if (polizas.some((p) => p.id_poliza === nuevaPoliza.id_poliza)) {
      errors.push("Ya existe una poliza con ese id_poliza.");
    }
    if (polizas.some((p) => p.matricula === nuevaPoliza.matricula)) {
      errors.push("Ya existe una poliza con esa matricula.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    polizas.push({
      ...nuevaPoliza,
      vigencia: Number(nuevaPoliza.vigencia),
      edad_coche: Number(nuevaPoliza.edad_coche),
      edad_tomador: Number(nuevaPoliza.edad_tomador),
      cilindrada: Number(nuevaPoliza.cilindrada),
      cilindros: Number(nuevaPoliza.cilindros),
      peso: Number(nuevaPoliza.peso),
      siniestro: Number(nuevaPoliza.siniestro),
    });
    await writePolizas(polizas);
    return res.status(201).json({ message: "Poliza creada correctamente." });
  } catch {
    return res.status(500).json({ error: "No se ha podido crear la poliza." });
  }
});

app.put("/polizas", async (req, res) => {
  try {
    const polizas = await readPolizas();
    const updated = req.body;
    const index = polizas.findIndex((p) => p.id_poliza === updated.id_poliza);

    if (index === -1) {
      return res.status(404).json({ error: "Poliza no encontrada." });
    }

    const errors = validatePoliza(updated, true, polizas[index]);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    polizas[index] = {
      ...updated,
      vigencia: Number(updated.vigencia),
      edad_coche: Number(updated.edad_coche),
      edad_tomador: Number(updated.edad_tomador),
      cilindrada: Number(updated.cilindrada),
      cilindros: Number(updated.cilindros),
      peso: Number(updated.peso),
      siniestro: Number(updated.siniestro),
    };

    await writePolizas(polizas);
    return res.json({ message: "Poliza actualizada correctamente." });
  } catch {
    return res.status(500).json({ error: "No se ha podido actualizar la poliza." });
  }
});

app.delete("/polizas/:id_poliza", async (req, res) => {
  try {
    const polizas = await readPolizas();
    const filtered = polizas.filter((p) => p.id_poliza !== req.params.id_poliza);
    if (filtered.length === polizas.length) {
      return res.status(404).json({ error: "Poliza no encontrada." });
    }
    await writePolizas(filtered);
    return res.json({ message: "Poliza eliminada correctamente." });
  } catch {
    return res.status(500).json({ error: "No se ha podido eliminar la poliza." });
  }
});

app.get("/estadisticas", async (req, res) => {
  try {
    const polizas = await readPolizas();
    const { transmision, comb_electrico, siniestro } = req.query;

    const subset = polizas.filter((p) => {
      const byTransmision = transmision ? p.transmision === transmision : true;
      const byComb = comb_electrico ? p.comb_electrico === comb_electrico : true;
      const bySiniestro = siniestro !== undefined ? Number(p.siniestro) === Number(siniestro) : true;
      return byTransmision && byComb && bySiniestro;
    });

    const total = subset.length;
    const conSiniestro = subset.filter((p) => Number(p.siniestro) === 1).length;
    const sinSiniestro = total - conSiniestro;

    const mediaEdadCoche =
      total === 0 ? 0 : subset.reduce((acc, p) => acc + Number(p.edad_coche), 0) / total;
    const mediaEdadTomador =
      total === 0 ? 0 : subset.reduce((acc, p) => acc + Number(p.edad_tomador), 0) / total;

    res.json({
      total_polizas: total,
      porcentaje_con_siniestro: total === 0 ? 0 : (conSiniestro / total) * 100,
      porcentaje_sin_siniestro: total === 0 ? 0 : (sinSiniestro / total) * 100,
      media_edad_coche: mediaEdadCoche,
      media_edad_tomador: mediaEdadTomador,
    });
  } catch {
    res.status(500).json({ error: "No se han podido calcular las estadisticas." });
  }
});

app.listen(PORT, () => {
  console.log(`API de polizas en http://localhost:${PORT}`);
});
