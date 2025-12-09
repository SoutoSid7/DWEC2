class Operacion {
    constructor(idOper, nombreS, apellidoS, producto, oper, cantidad) {
        this.idOper = idOper
        this.nombreS = nombreS
        this.apellidoS = apellidoS
        this.producto = producto
        this.oper = oper
        this.cantidad = cantidad
    }
}

class OperacionSospechosa {
    constructor(idOper, masKg) {
        this.idOper = idOper
        this.masKg = masKg
    }
}

const operaciones = []
const opercaionesSospechosa = []

document.addEventListener("DOMContentLoaded", () => {
    //cargarLineas() // LocalStorage

    document.getElementById("btnAlta").addEventListener("click", alta)
    
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

    if(cantidad < 1){
        alert("La cantidad de kilos debe ser mayor a 1Kg")
        return
    }

    const operacion = new Operacion(idOper, nombreS, apellidoS, producto, oper, cantidad)
    operaciones.push(operacion)

    
    if(cantidad > 100){
        
    }

    actualizarTabla()
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