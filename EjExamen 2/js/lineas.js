class Linea {
    constructor(numLinea, origen, destino, horaSalida, intervaloLinea){
        this.numLinea = numLinea
        this.origen = origen
        this.destino = destino
        this.horaSalida = horaSalida
        this.intervaloLinea = intervaloLinea
    }
}

let lineas = [] // deberia const 

document.addEventListener("DOMContentLoaded", () => {
    cargarLineas() // LocalStorage

    document.getElementById("btnAlta").addEventListener("click", alta)
    document.getElementById("btnBaja").addEventListener("click", baja)
    document.getElementById("btnModificar").addEventListener("click", modificar)

    actualizarTabla() // "LocalStorage"
})

function guardarLineas() {
    localStorage.setItem("lineas", JSON.stringify(lineas));
}

function cargarLineas() {
    const datos = localStorage.getItem("lineas");
    if (datos) {
        lineas = JSON.parse(datos);
    }
}

function alta() {
    const numLinea = document.getElementById("numLinea").value
    const origen = document.getElementById("origen").value
    const destino = document.getElementById("destino").value
    const horaSalida = document.getElementById("horaSalida").value
    const intervaloLinea = document.getElementById("intervaloLinea").value

    if(!numLinea || !origen || !destino || !horaSalida || !intervaloLinea){
        alert("Debe introducir todos los datos")
        return
    }

    if(lineas.some(l => l.numLinea === numLinea)){
        alert("Linea ya existente")
        return
    }

    if(numLinea < 1){
        alert("La linea debe ser mayor a 1")
        return
    }

    if (!Number.isInteger(Number(numLinea))) {
        alert("El número de línea no puede tener decimales");
        return;
    }
    

    if(origen == destino){
        alert("El origen no puede ser igual al destino")
        return
    }

    // Validación formato intervalo HH:MM
    const regexHHMM = /^[0-9]{2}:[0-9]{2}$/;
    if (!regexHHMM.test(intervaloLinea)) {
        alert("El intervalo debe tener el formato HH:MM");
        return;
    }

    const linea = new Linea(numLinea, origen, destino, horaSalida, intervaloLinea)
    lineas.push(linea)

    actualizarTabla()
    guardarLineas()
    limpiar()
}

function baja() {
    const numLinea = document.getElementById("numLinea").value;

    if (!numLinea) {
        alert("Debe introducir el número de línea a eliminar");
        return;
    }

    // Buscar si existe
    const indice = lineas.findIndex(l => l.numLinea === numLinea);

    if (indice === -1) {
        alert("La línea no existe");
        return;
    }

    // Eliminar la línea del array
    lineas.splice(indice, 1);

    alert("Línea eliminada correctamente");

    actualizarTabla();
    guardarLineas()
    limpiar();
}


function modificar() {
    const numLinea = document.getElementById("numLinea").value
    const origen = document.getElementById("origen").value
    const destino = document.getElementById("destino").value
    const horaSalida = document.getElementById("horaSalida").value
    const intervaloLinea = document.getElementById("intervaloLinea").value

    if(!numLinea || !origen || !destino || !horaSalida || !intervaloLinea){
        alert("Debe introducir todos los datos")
        return
    }

    if(numLinea < 1){
        alert("La linea debe ser mayor a 1")
        return
    }
    
    if (!Number.isInteger(Number(numLinea))) {
        alert("El número de línea no puede tener decimales");
        return;
    }
    
    // Validación formato intervalo HH:MM
    const regexHHMM = /^[0-9]{2}:[0-9]{2}$/;
    if (!regexHHMM.test(intervaloLinea)) {
        alert("El intervalo debe tener el formato HH:MM");
        return;
    }

    if(origen == destino){
        alert("El origen no puede ser igual al destino")
        return
    }

    const linea = lineas.find(l => l.numLinea === numLinea)

    linea.origen = origen
    linea.destino = destino
    linea.horaSalida = horaSalida
    linea.intervaloLinea = intervaloLinea

    actualizarTabla()
    guardarLineas()
    limpiar()
}

function actualizarTabla() {
    const tbody = document.querySelector("#tablaLinea tbody")
    tbody.innerHTML = ""
    lineas.forEach(l => {
        const fila = document.createElement("tr")
        fila.innerHTML += `
            <td>${l.numLinea}</td>
            <td>${l.origen}</td>
            <td>${l.destino}</td>
            <td>${l.horaSalida}</td>
            <td>${l.intervaloLinea}</td>
        `

        fila.addEventListener("click", () => {
            document.getElementById("numLinea").value = l.numLinea
            document.getElementById("origen").value = l.origen
            document.getElementById("destino").value = l.destino
            document.getElementById("horaSalida").value = l.horaSalida
            document.getElementById("intervaloLinea").value = l.intervaloLinea
        })
        tbody.appendChild(fila)
    })
}

function limpiar() {
    document.getElementById("numLinea").value = ""
    document.getElementById("origen").value = ""
    document.getElementById("destino").value = ""
    document.getElementById("horaSalida").value = ""
    document.getElementById("intervaloLinea").value = ""
}