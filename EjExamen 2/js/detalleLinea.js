document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formDetalleLinea");
    form.addEventListener("submit", consultarDetalle);
});

function consultarDetalle(event) {
    event.preventDefault();

    const numLinea = document.getElementById("numLineaDetalle").value;
    const mensaje = document.getElementById("mensajeDetalle");
    const tbody = document.querySelector("#tablaDetalle tbody");

    mensaje.textContent = "";
    tbody.innerHTML = "";

    if (!numLinea) {
        mensaje.textContent = "Debe introducir un número de línea.";
        return;
    }

    if (numLinea < 1 || !Number.isInteger(Number(numLinea))) {
        mensaje.textContent = "El número de línea debe ser un entero mayor o igual que 1.";
        return;
    }

    // Obtener paradas desde localStorage (se llenará en el punto 4.4)
    const paradasLS = localStorage.getItem("paradas");
    let paradas = [];

    if (paradasLS) {
        paradas = JSON.parse(paradasLS);
    }

    // Filtrar paradas de esa línea
    const paradasLinea = paradas.filter(p => p.numLinea == numLinea);

    if (paradasLinea.length === 0) {
        mensaje.textContent = "No hay paradas registradas para esa línea.";
        return;
    }

    // Función auxiliar para convertir HH:MM a minutos
    function aMinutos(hora) {
        const [h, m] = hora.split(":");
        return parseInt(h) * 60 + parseInt(m);
    }

    // Ordenar por intervalo (suponiendo propiedad intervalSal como en tu Parada)
    paradasLinea.sort((a, b) => aMinutos(a.intervalSal) - aMinutos(b.intervalSal));

    // Rellenar tabla
    paradasLinea.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.numParada}</td>
            <td>${p.localidad}</td>
            <td>${p.intervalSal}</td>
        `;
        tbody.appendChild(fila);
    });

    mensaje.textContent = `Mostrando ${paradasLinea.length} parada(s) para la línea ${numLinea}.`;
}