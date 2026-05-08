const API_URL = 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const mensaje = data.errores ? data.errores.join('\n') : data.error || 'Error en la petición.';
    throw new Error(mensaje);
  }
  return data;
}

export const api = {
  getPolizas: () => request('/polizas'),
  getPoliza: id => request(`/polizas/${id}`),
  addPoliza: poliza => request('/polizas', { method: 'POST', body: JSON.stringify(poliza) }),
  updatePoliza: poliza => request('/polizas', { method: 'PUT', body: JSON.stringify(poliza) }),
  deletePoliza: id => request(`/polizas/${id}`, { method: 'DELETE' }),
  getEstadisticas: params => request(`/estadisticas?${new URLSearchParams(params).toString()}`)
};
