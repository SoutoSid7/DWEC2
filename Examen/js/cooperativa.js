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
    constructor(idOper) {
        this.idOper = idOper
    }
}

const operaciones = []
const opercaionesSospechosas = []

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnAlta").addEventListener("click", alta)
    document.getElementById("btnModificar").addEventListener("click", modificar)
    document.getElementById("btnTabla").addEventListener("click", mostrarTabla)
    document.getElementById("btnTablaSospe").addEventListener("click", mostrarTablaSospe)
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

    sospechosa()
    mostrarTabla()
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

function mostrarTabla() {
    const zona = document.getElementById("zonaCooper")
    const tbody = document.querySelector("#tablaCooper tbody")

    if(operaciones.length === 0){
        zona.style.display = "none"
        return
    }

    zona.style.display = "block"

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

function mostrarTablaSospe() {
    const zona = document.getElementById("zonaCooperSospechoso")
    const tbody = document.querySelector("#tablaCooperSospechoso tbody")

    if(opercaionesSospechosas.length === 0){
        zona.style.display = "none"
        alert("No hay ninguna operacion sospechosa")
        return
    }

    zona.style.display = "block"

    tbody.innerHTML = ""

    opercaionesSospechosas.forEach(o => {
        const fila = document.createElement("tr")
        fila.innerHTML += `
            <td>${o.idOper}</td>
        `

        fila.addEventListener("click", () => {
            document.getElementById("idOper").value = o.idOper
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