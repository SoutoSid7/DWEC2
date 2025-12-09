class Operacion {
    constructor(idOper, nombreS, apellidoS, producto, oper, cantidad) {
        this.idOper = idOper
        this.nombreS = nombreS
        this.apellidoS = apellidoS
        this.producto = producto
        this.oper = oper
        this.cantidad = cantidad
    }

    get toma() {
        return this.cantidad 
    }

}

class OperacionSospechosa {
    constructor(idOper) {
        this.idOper = idOper
    }
}

const operaciones = []
const opercaionesSospechosas = []

document.addEventListener("DOMContentLoaded", () => {
    //cargarLineas() // LocalStorage

    document.getElementById("btnAlta").addEventListener("click", alta)
    document.getElementById("btnModificar").addEventListener("click", modificar)

    //actualizarTabla() // "LocalStorage"
})

function alta() {
    const idOper = document.getElementById("idOper").value
    const nombreS = document.getElementById("nombreS").value
    const apellidoS = document.getElementById("apellidoS").value
    const producto = document.getElementById("producto").value
    const oper = document.getElementById("oper").value
    const cantidad = document.getElementById("cantidad").value

    if(!idOper || !nombreS || !apellidoS || !producto || !oper || !cantidad){
        alert("Debe introducir todos los datos")
        return
    }

    const indice = operaciones.findIndex(o => o.idOper === idOper)
    if(indice === 1 ){
        alert("El identificador ya existe")
        return
    }

    const operacion = new Operacion(idOper, nombreS, apellidoS, producto, oper, cantidad)
    operaciones.push(operacion)

    sospechosa()
    actualizarTabla()
    limpiar()
}

function modificar() {
    const idOper = document.getElementById("idOper").value
    const nombreS = document.getElementById("nombreS").value
    const apellidoS = document.getElementById("apellidoS").value
    const producto = document.getElementById("producto").value
    const oper = document.getElementById("oper").value
    const cantidad = document.getElementById("cantidad").value

    if(!idOper || !nombreS || !apellidoS || !producto || !oper || !cantidad){
        alert("Debe introducir todos los datos")
        return
    }

    const operacion = operaciones.find(o => o.idOper === idOper)

    operacion.idOper = idOper
    operacion.nombreS = nombreS
    operacion.apellidoS = apellidoS
    operacion.producto = producto
    operacion.oper = oper
    operacion.cantidad = cantidad

    actualizarTabla()
    sospechosa()
    limpiar()
}



function sospechosa() {
    const idOper = document.getElementById("idOper").value
    const cantidad = document.getElementById("cantidad").value

    if(cantidad > 100){
        const operacionSospechosa = new OperacionSospechosa(idOper)
        opercaionesSospechosas.push(operacionSospechosa)
        alert("Se añadio a operacioens sospechosas")
        return
    }

    limpiar()
}

function actualizarTabla() {
    const tbody = document.querySelector("#tablaCooper tbody")
    tbody.innerHTML = ""
    operaciones.forEach(o => {
        const fila = document.createElement("tr")
        fila.innerHTML += `
            <td>${o.idOper}</td>
            <td>${o.nombreS}</td>
            <td>${o.apellidoS}</td>
            <td>${o.producto}</td>
            <td>${o.oper}</td>
            <td>${o.cantidad}</td>

        `

        fila.addEventListener("click", () => {
            document.getElementById("idOper").value = o.idOper
            document.getElementById("nombreS").value = o.nombreS
            document.getElementById("apellidoS").value = o.apellidoS
            document.getElementById("producto").value = o.producto
            document.getElementById("oper").value = o.oper
            document.getElementById("cantidad").value = o.cantidad
        })
        tbody.appendChild(fila)
    })

}

function limpiar() {
    document.getElementById("idOper").value = ""
    document.getElementById("nombreS").value = ""
    document.getElementById("apellidoS").value = ""
    document.getElementById("producto").value = ""
    document.getElementById("oper").value = ""
    document.getElementById("cantidad").value = ""
}