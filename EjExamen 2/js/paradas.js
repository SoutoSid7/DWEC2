class Parada {
    constructor(numParada, numLinea, localidad, intervalSal){
        this.numParada = numParada
        this.numLinea = numLinea
        this.localidad = localidad
        this.intervalSal = intervalSal
    }
}

let paradas = [] // deberia const
let lineas = [] // "LocalStorage"

document.addEventListener("DOMContentLoaded", () => {

    cargarLineas()
    cargarParadas()

    document.getElementById("btnAltaParada").addEventListener("click", alta)
    document.getElementById("btnBajaParada").addEventListener("click", baja)
    document.getElementById("btnModificarParada").addEventListener("click", modificar)

    actualizarTabla()
})

function guardarParadas() {
    localStorage.setItem("paradas", JSON.stringify(paradas));
}

function cargarParadas() {
    const datos = localStorage.getItem("paradas");
    if (datos) {
        paradas = JSON.parse(datos);
    }
}

function cargarLineas() {
    const datos = localStorage.getItem("lineas");
    if (datos) {
        lineas = JSON.parse(datos);
    }
}

function alta() {
    const numParada = document.getElementById("numParada").value
    const numLinea = document.getElementById("numLinea").value
    const localidad = document.getElementById("localidad").value
    const intervalSal = document.getElementById("intervalSal").value

    if(!numParada || !numLinea || !localidad || !intervalSal){
        alert("Debe introducir todos los datos")
        return
    }

    if(paradas.some(p => p.numParada === numParada)){
        alert("Parada ya existente")
        return
    }

    if(numParada < 1){
        alert("La parada debe ser mayor a 1")
        return
    }

    if (!Number.isInteger(Number(numParada))) {
        alert("El número de parada no puede tener decimales");
        return;
    }

    // Validación formato intervalo HH:MM
    const regexHHMM = /^[0-9]{2}:[0-9]{2}$/;
    if (!regexHHMM.test(intervaloLinea)) {
        alert("El intervalo debe tener el formato HH:MM");
        return;
    }

    if (!lineas.some(l => l.numLinea === numLinea)) {
        alert("La línea indicada no existe");
        return;
    }

    const parada = new Parada(numParada, numLinea, localidad, intervalSal)
    paradas.push(parada)

    actualizarTabla()
    guardarParadas();
    limpiar()
}

function baja() {
    const numParada = document.getElementById("numParada").value;

    if (!numParada) {
        alert("Debe introducir el número de línea a eliminar");
        return;
    }

    // Buscar si existe
    const indice = paradas.findIndex(p => p.numParada === numParada);

    if (indice === -1) {
        alert("La línea no existe");
        return;
    }

    // Eliminar la línea del array
    paradas.splice(indice, 1);

    alert("Línea eliminada correctamente");

    actualizarTabla();
    guardarParadas();
    limpiar();
}

function modificar() {
    const numParada = document.getElementById("numParada").value
    const numLinea = document.getElementById("numLinea").value
    const localidad = document.getElementById("localidad").value
    const intervalSal = document.getElementById("intervalSal").value

    if(!numParada || !numLinea || !localidad || !intervalSal){
        alert("Debe introducir todos los datos")
        return
    }

    if(paradas.some(p => p.numParada === numParada)){
        alert("Parada ya existente")
        return
    }

    if(numParada < 1){
        alert("La parada debe ser mayor a 1")
        return
    }

    if (!Number.isInteger(Number(numParada))) {
        alert("El número de parada no puede tener decimales");
        return;
    }

    // Validación formato intervalo HH:MM
    const regexHHMM = /^[0-9]{2}:[0-9]{2}$/;
    if (!regexHHMM.test(intervaloLinea)) {
        alert("El intervalo debe tener el formato HH:MM");
        return;
    }

    const parada = paradas.find(p => p.numParada === numParada)

    parada.numParada = numParada
    parada.numLinea = numLinea
    parada.localidad = localidad
    parada.intervalSal = intervalSal

    actualizarTabla()
    limpiar()
}

function actualizarTabla() {
    const tbody = document.querySelector("#tablaParadas tbody")
    tbody.innerHTML = ""
    paradas.forEach(p => {
        const fila = document.createElement("tr")
        fila.innerHTML += `
            <td>${p.numParada}</td>
            <td>${p.numLinea}</td>
            <td>${p.localidad}</td>
            <td>${p.intervalSal}</td>
        `

        fila.addEventListener("click", () => {
            document.getElementById("numParada").value = p.numParada
            document.getElementById("numLinea").value = p.numLinea
            document.getElementById("localidad").value = p.localidad
            document.getElementById("intervalSal").value = p.intervalSal
        })
        tbody.appendChild(fila)
    })
}

function limpiar() {
    document.getElementById("numParada").value = ""
    document.getElementById("numLinea").value = ""
    document.getElementById("localidad").value = ""
    document.getElementById("intervalSal").value = ""
}